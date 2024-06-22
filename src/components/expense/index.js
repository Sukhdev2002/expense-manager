import React, { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { Modal, Button, Row, Col, Table, Space } from 'antd';
import MyForm from '../form/Form';
import { postData, fetchData, deleteData, updateData } from '../../services/http-service';
import './index.css'; // Import the CSS file for styles
import _ from 'lodash';

const Expense = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

 
  const fetchCategories = async () => {
    try {
      const response = await fetchData(`/api/category`);
      const data = await response.data;
      const extractedCategories = data.map((category) => ({
        id: category._id,
        name: category.category,
      }));
      setCategories(extractedCategories);
      const extractedSubcategories = data.reduce((acc, category) => {
        const subs = category.subcategories.map((subcategory) => ({
          id: category._id + '-' + subcategory,
          name: subcategory,
          categoryId: category._id,
        }));
        return [...acc, ...subs];
      }, []);
      setSubcategories(extractedSubcategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetchData(`/api/expenses`);
      const data = await response.data;

      const updatedData = data.map((item) => ({
        id: item._id,
        comment: item.comment,
        amount: item.amount,
        category: _.get(item,['category','name'], "N/A"),
        subcategory: _.get(item,['subcategory','name'], "N/A")
      }));
      setExpenses(updatedData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddCategory = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token || '');
      const userId = decodedToken?.userId;
      const response = await postData(`/api/category`, JSON.stringify({
        userId: userId,
        category: values.category,
        subcategories: values.subcategories.split(','),
      }));
      if (response.ok) {
        console.log('Category added successfully');
        fetchCategories();
        setCategoryModalVisible(false);
      } else {
        console.error('Failed to add category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddExpense = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token || '');
      const userId = decodedToken?.userId;
      const response = await postData(`/api/expenses`, JSON.stringify({
        userId: userId,
        category: values.category,
        subcategory: values.subcategory,
        amount: values.money,
        comment: values.comment,
      }));
      if (response.ok) {
        console.log('Expense added successfully');
        fetchExpenses();
        setExpenseModalVisible(false);
      } else {
        console.error('Failed to add expense:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };


  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await deleteData(`/api/expenses/${expenseId}`);
      if (response.status === 200) {
        console.log('Expense deleted successfully');
        fetchExpenses();
      } else {
        console.error('Failed to delete expense:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
 }, []);


  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
        
        <Button onClick={() => handleDeleteExpense(record.id)} type="danger">Delete</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    
    if (selectedCategory) {
      let categoryObj = JSON.parse(selectedCategory);
      setFilteredSubcategories(subcategories.filter(sub => sub.categoryId === categoryObj.id));
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, subcategories]);

  const formConfig = [
    {
      type: 'select',
      label: 'Category',
      name: 'category',
      required: true,
      message: 'Please select a category!',
      options: categories.map(category => ({ name: category.name, id: category.id })),
      placeholder: 'Select Category',
      onChange: (value) => setSelectedCategory(value)
    },
    {
      type: 'select',
      label: 'Subcategory',
      name: 'subcategory',
      required: true,
      message: 'Please select a subcategory!',
      options: filteredSubcategories.map(subcategory => ({ name: subcategory.name, id: subcategory.id })),
      placeholder: 'Select Subcategory',
      onChange: (value) => setSelectedSubcategory(value)
    },
    { type: 'number', label: 'Money', name: 'money', required: true, message: 'Please input a number!', min: 0, max: 10000000000, placeholder: 'Please Enter Money' },
    { type: 'text', label: 'Comment', name: 'comment', required: false, message: 'Please input text!', placeholder: 'Please Enter Comment' },
  ];

  const categoryFormConfig = [
    { type: 'text', label: 'Category', name: 'category', required: true, message: 'Please enter Category!' },
    { type: 'text', label: 'Subcategories', name: 'subcategories', required: true, message: 'Please enter Subcategories!' }
  ];

  return (
    <div className="expense-container">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Button onClick={() => setExpenseModalVisible(true)}>Add Expense</Button>
        </Col>
        <Col span={12}>
          <Button onClick={() => setCategoryModalVisible(true)}>Add Category</Button>
        </Col>
      </Row>

      <Modal
        title="Add Expense"
        visible={expenseModalVisible}
        onCancel={() => setExpenseModalVisible(false)}
        footer={null}
      >
        <MyForm fields={formConfig} onSubmit={handleAddExpense} />
      </Modal>

      <Modal
        title="Add Category"
        visible={categoryModalVisible}
        onCancel={() => setCategoryModalVisible(false)}
        footer={null}
      >
        <MyForm fields={categoryFormConfig} onSubmit={handleAddCategory} />
      </Modal>

      <div className="table-container">
        <h2 className="expense-header">Expense List</h2>
        <Table dataSource={expenses} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default Expense;
