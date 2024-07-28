
import React, { useState, useEffect, useMemo } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { Modal, Button, Row, Col, Table, Space, Select, Card, Spin } from 'antd';
import MyForm from '../form/Form';
import { postData, fetchData, deleteData } from '../../services/http-service';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './index.css'; // Import the CSS file for styles
import _ from 'lodash';
import moment from 'moment';
import config from '../../configForModules.json';
import { handleDeleteRecord, handleUpdateRecord, handleAddRecord } from '../utils/Utils';
import DonutChart from '../charts/chart';
const { Option } = Select;

const FinanceAnalyzer = ({ module }) => {
    const moduleConfig = _.get(config, module, {});
    const moduleName = _.get(moduleConfig, 'name', "");
    const moduleType = _.get(moduleConfig, 'type', "");
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseModalVisible, setExpenseModalVisible] = useState(false);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month').format('YYYY-MM'));

    const [selectedCategoryForChart, setSelectedCategoryForChart] = useState('');
    const [categoryDataForTable, setCategoryDataForTable] = useState([]);
    const [categoryData, setCategoryData] = useState({});

    useEffect(() => {
        if (selectedMonth) {
            fetchExpenses(selectedMonth);
            fetchChartData(selectedMonth);
        }
    }, [selectedMonth]);

    useEffect(() => {
        if (selectedCategory) {
            const categoryId = _.get(JSON.parse(selectedCategory), 'id', "");
            setFilteredSubcategories(_.get(categoryData[categoryId], 'subCategoryObj', []));
        }
    }, [selectedCategory, categoryData]);

    useEffect(() => {
        fetchCategories();
    }, [])
    const fetchCategories = async () => {
        try {
            const [categoryResponse, subCategoryResponse] = await Promise.all([
                fetchData(`/api/category`, { moduleCode: moduleType }),
                fetchData(`/api/subcategory`, { moduleCode: moduleType })
            ]);

            const categoryData = await categoryResponse.data;
            const subCategoryData = await subCategoryResponse.data;

            const categoryWithSubcategory = categoryData.reduce((acc, category) => {
                const subCategories = subCategoryData.filter(subCat => subCat.category === category._id);
                acc[category._id] = {
                    categoryId: category._id,
                    categoryName: category.category,
                    subCategoryObj: subCategories,
                };
                return acc;
            }, {});

            setCategoryData(categoryWithSubcategory);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchExpenses = async (month) => {
        try {
            setLoading(true);
            const response = await fetchData(`/api/expenses`, { moduleCode: moduleType, month: month });
            const data = await response.data;
            const updatedData = data.map(item => ({
                id: item._id,
                date: moment(item.date).format('DD-MM-YYYY::HH:mm'),
                comment: item.comment,
                amount: item.amount,
                category: item.category,
                subcategory: item.subcategory,
            }));
            setExpenses(updatedData);
        } catch (error) {
            console.error(`Error fetching ${moduleName}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChartData = async (month) => {
        try {
            const response = await fetchData(`/api/expenses`, { moduleCode: moduleType, month: month });
            const data = await response.data;
            const result = {};
            data.forEach(item => {
                const categoryName = _.get(item, ['category', 'name'], 'N/A');
                const subcategoryName = _.get(item, ['subcategory', 'name'], 'N/A');

                if (!result[categoryName]) {
                    result[categoryName] = {};
                }

                if (!result[categoryName][subcategoryName]) {
                    result[categoryName][subcategoryName] = 0;
                }

                result[categoryName][subcategoryName] += item.amount;
            });

            let formattedData = Object.entries(result).flatMap(([categoryName, subcategories]) =>
                Object.entries(subcategories).map(([subcategoryName, amount]) => ({
                    category: categoryName,
                    name: subcategoryName,
                    value: amount
                }))
            );
            setChartData(formattedData);

        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    const handleAddExpense = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token || '');
            const userId = decodedToken?.userId;
            const response = await postData(`/api/expenses`, JSON.stringify({
                moduleCode: moduleType,
                userId: userId,
                category: values.category,
                subcategory: values.subcategory,
                amount: values.money,
                comment: values.comment,
            }));
            if (response.status === 201) {
                console.log(`${moduleName} added successfully`);
                await fetchExpenses(selectedMonth);
                await fetchChartData(selectedMonth);
                setExpenseModalVisible(false);
            } else {
                console.error(`Failed to add ${moduleName}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error adding ${moduleName}:`, error);
        }
    };

    const handleDeleteExpense = async (expenseId) => {

        await handleDeleteRecord(moduleName, "expenses", expenseId);
        await fetchExpenses(selectedMonth);
        await fetchChartData(selectedMonth);

    };

    const processExpensesByCategory = useMemo(() => {
        const categoryMap = _.reduce(categoryData, (acc, category, categoryId) => {
            acc[categoryId] = {
                key: categoryId,
                category: category.categoryName,
                amount: 0,
                subcategories: [],
            };
            return acc;
        }, {});

        _.forEach(expenses, (expense) => {
            const categoryId = expense.category.id;
            if (categoryMap[categoryId]) {
                categoryMap[categoryId].amount += expense.amount;
                categoryMap[categoryId].subcategories.push({
                    subcategory: expense.subcategory.name,
                    amount: expense.amount,
                    comment: expense.comment,
                    date: expense.date,
                    id: expense.id,
                });
            }
        });

        return _.values(categoryMap);
    }, [expenses, categoryData]);

    useEffect(() => {
        setCategoryDataForTable(processExpensesByCategory);
    }, [processExpensesByCategory]);

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => setSelectedCategoryForChart(record.category)}>Show Chart</Button>
                </Space>
            ),
        },
    ];

    const formConfig = [
        {
            type: 'select',
            label: 'Category',
            name: 'category',
            required: true,
            message: 'Please select a category!',
            options: _.map(Object.values(categoryData), ({ categoryName, categoryId }) => ({
                name: categoryName,
                id: categoryId,
            })),
            placeholder: 'Select Category',
            onChange: (value) => setSelectedCategory(value)
        },
        {
            type: 'select',
            label: 'Subcategory',
            name: 'subcategory',
            required: true,
            message: 'Please select a subcategory!',
            options: filteredSubcategories.map(subcategory => ({ name: subcategory.subcategory, id: subcategory._id })),
            placeholder: 'Select Subcategory',
        },
        {
            type: 'number',
            label: 'Money',
            name: 'money',
            required: true,
            message: 'Please input a number!',
            min: 0,
            max: 10000000000,
            placeholder: 'Please Enter Money'
        },
        {
            type: 'text',
            label: 'Comment',
            name: 'comment',
            required: false,
            message: 'Please input text!',
            placeholder: 'Please Enter Comment'
        },
    ];

    const lastFiveMonths = [];
    for (let i = 0; i < 5; i++) {
        lastFiveMonths.push(moment().subtract(i, 'months').startOf('month').format('YYYY-MM'));
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#00BFFF', '#FF00FF', '#FFFF00', '#808000', '#800000'];

    const expandedRowRender = (record) => {
        const columns = [
            { title: 'Subcategory', dataIndex: 'subcategory', key: 'subcategory' },
            { title: 'Amount', dataIndex: 'amount', key: 'amount' },
            { title: 'Comment', dataIndex: 'comment', key: 'comment' },
            { title: 'Date', dataIndex: 'date', key: 'date' },
            {
                title: 'Actions',
                key: 'actions',
                render: (subrecord) => (
                    <Space size="middle">
                        <Button onClick={() => handleDeleteExpense(subrecord.id)} type="danger">Delete</Button>
                    </Space>
                ),
            },
        ];
        return <Table columns={columns} dataSource={record.subcategories} pagination={false} rowKey="id" />;
    };

    return (
        <div className="expense-container">
            <Modal
                title={`Add ${moduleName}`}
                visible={expenseModalVisible}
                onCancel={() => setExpenseModalVisible(false)}
                footer={null}
            >
                <MyForm fields={formConfig} onSubmit={handleAddExpense} />
            </Modal>

            <div className="chart-and-table-container">
                <Row gutter={[16, 16]}>
                    <Col span={14}>
                        <Card title={moduleName}>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Button style={{ width: '100%' }} onClick={() => setExpenseModalVisible(true)}>Add {moduleName}</Button>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        defaultValue={selectedMonth}
                                        style={{ width: '100%' }}
                                        onChange={(value) => setSelectedMonth(value)}
                                    >
                                        {lastFiveMonths.map(month => (
                                            <Option key={month} value={month}>{month}</Option>
                                        ))}
                                    </Select>
                                </Col>
                            </Row>
                            {loading ? <Spin /> : (
                                <Table
                                    columns={columns}
                                    expandable={{ expandedRowRender }}
                                    dataSource={categoryDataForTable}
                                    pagination={false}
                                />
                            )}
                        </Card>
                    </Col>

                    <Col span={10}>
                        {selectedCategoryForChart && (
                            <Card title={`${moduleName} Chart for ${selectedCategoryForChart}`}>
                                <ResponsiveContainer width="100%" height={400}>

                                    <DonutChart data={chartData.filter(item => item.category === selectedCategoryForChart)} />
                                </ResponsiveContainer>
                            </Card>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default FinanceAnalyzer;
