
import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Table, Space, Card } from 'antd';
import MyForm from '../form/Form';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { fetchData } from '../../services/http-service';
import { handleDeleteRecord, handleUpdateRecord, handleAddRecord } from '../utils/Utils';
import config from '../../configForModules.json';
function Category({ module }) {
    const [selectedCategoryType, setSelectedCategoryType] = useState("expense");
    const moduleConfig = _.get(config, selectedCategoryType, {});
    const moduleName = _.get(moduleConfig, 'name', "");
    const moduleType = _.get(moduleConfig, 'type', "");
    const [selectedCategory, setSelectedCategory] = useState();
    const [categoryDataForTable, setCategoryDataForTable] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSubCategoryEditMode, setIsSubCategoryEditMode] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState();
    const [isCategoryForm, setIsCategoryForm] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formConfig, setFormConfig] = useState([]);
    const [formIntialValues, setFormIntialValues] = useState({});
    const [formTitle, setFormTitle] = useState("");
    const expandedRowRender = (record) => {
        const columns = [
            { title: 'Subcategory', dataIndex: 'subcategory', key: 'subcategory' },
            {
                title: 'Actions',
                key: 'actions',
                render: (row) => (
                    <Space size="middle">
                        <Button onClick={() => openSubCategoryModal(row)}>Edit Subcategory</Button>
                        <Button onClick={() => handleDeleteCategory("subcategory", row._id)}>Delete</Button>
                    </Space>
                ),
                align: 'right',
            },
        ];
        return <Table columns={columns} dataSource={record.subCategoryObj} pagination={false} rowKey="id" />;
    };

    const fetchCategories = async () => {
        try {
            const categoryResponse = await fetchData(`/api/category`, { moduleCode: moduleType });
            const categoryData = await categoryResponse.data;
            const subCategoryResponse = await fetchData(`/api/subcategory`, { moduleCode: moduleType });
            const subCategoryData = await subCategoryResponse.data;
            let categoryWithSubcategory = categoryData.map((category) => {
                let subcate = subCategoryData.filter(data => data.category === category._id)
                return {
                    categoryId: category._id,
                    categoryName: category.category,
                    subCategoryObj: subcate,
                }
            });
            setCategoryDataForTable(categoryWithSubcategory);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const categoryFormConfig = [
        { type: 'text', label: 'Category', name: 'category', required: true, message: 'Please enter Category!' }
    ];

    const subcategoryFormConfig = [
        { type: 'text', label: 'Subcategory', name: 'subcategories', required: true, message: 'Please enter Subcategory!' }
    ];

    useEffect(() => {
        fetchCategories();
    }, []);
    useEffect(() => {
        fetchCategories();
    }, [selectedCategoryType]);

    const openCategoryModal = (row = null) => {
        if (row) {
            setFormIntialValues({ category: row.categoryName });
            setSelectedCategory(row.categoryId);
            setIsEditMode(true);
            setFormTitle("Edit Category")
        } else {
            setFormIntialValues({});
            setIsEditMode(false);
            setFormTitle("Add Category")
        }
        setIsCategoryForm(true);
        setIsModalVisible(true);
        setFormConfig(categoryFormConfig);
    };
    const openSubCategoryModal = (row = null) => {
        if (row) {
            setFormIntialValues({ subcategories: row.subcategory });
            setSelectedCategory(row.category);
            setSelectedSubCategory(row._id);
            setIsSubCategoryEditMode(true);
            setFormTitle("Edit Subcategory")
        } else {
            setFormIntialValues({});
            setIsSubCategoryEditMode(false);
            setFormTitle("Add Subcategory")
        }
        setIsCategoryForm(false);
        setIsModalVisible(true);
        setFormConfig(subcategoryFormConfig);

    };

    const handleCategoryFormSubmit = async (values) => {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token || '');
        const userId = decodedToken?.userId;
        let newRecord = {
            moduleCode: moduleType,
            userId: userId,
            category: values.category,
        }
        if (isEditMode) {
            await updateRecord("Category", "category", newRecord, selectedCategory);

        } else {

            await addRecord("category", newRecord);
        }
        setIsModalVisible(false);
    };
    const handleSubCategoryFormSubmit = async (values) => {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token || '');
        const userId = decodedToken?.userId;
        let newRecord = {
            moduleCode: moduleType,
            userId: userId,
            category: selectedCategory,
            subcategory: values.subcategories,
        }
        if (isSubCategoryEditMode) {

            await updateRecord("SubCategory", "subcategory", newRecord, selectedSubCategory);
        } else {

            await addRecord("subcategory", newRecord);

        }
        setIsModalVisible(false);
    };
    const addRecord = async (endPoint, newRecord) => {
        try {

            const isAdded = await handleAddRecord(endPoint, newRecord);
            if (isAdded) {
                fetchCategories();

            } else {

            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const updateRecord = async (recordName, endPoint, updatedRecord, recordId) => {
        try {

            const isUpdeated = await handleUpdateRecord(recordName, endPoint, updatedRecord, recordId)
            if (isUpdeated) {
                fetchCategories();
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (endpoint, categoryId) => {
        await handleDeleteRecord(endpoint, endpoint, categoryId);
        await fetchCategories();
    }
    const columns = [
        {
            title: 'Categories',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (row) => (
                <Space size="middle">
                    <Button onClick={() => { openSubCategoryModal(); setSelectedCategory(row.categoryId); }}>Add Subcategory</Button>
                    <Button onClick={() => openCategoryModal(row)}>Edit Category</Button>
                    <Button onClick={() => handleDeleteCategory("category", row.categoryId)}>Delete</Button>
                </Space>
            ),
            align: 'right'
        }
    ];
    return (
        <div>
            <Modal
                title={formTitle}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <MyForm fields={formConfig} onSubmit={isCategoryForm ? handleCategoryFormSubmit : handleSubCategoryFormSubmit} initialValues={formIntialValues} />
            </Modal>

            <Card title="Category Management">
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Button style={{ width: '100%' }} onClick={() => setSelectedCategoryType("expense")}>Expense Category</Button>
                    </Col>
                    <Col span={6}>
                        <Button style={{ width: '100%' }} onClick={() => setSelectedCategoryType("investment")}>Investment Category</Button>
                    </Col>
                    <Col span={6}>
                        <Button style={{ width: '100%' }} onClick={() => setSelectedCategoryType("saving")}>Saving Category</Button>
                    </Col>
                    <Col span={6}>
                        <Button style={{ width: '100%' }} onClick={() => openCategoryModal()}>Add Category</Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    expandable={{ expandedRowRender }}
                    dataSource={categoryDataForTable}
                    pagination={false}
                    rowKey="categoryId"
                />
            </Card>
        </div>
    );
}

export default Category;
``