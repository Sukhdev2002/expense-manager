// components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Row, Col, Table, Space, Spin, Select, Card } from 'antd';
import MyForm from '../../form/Form';
import { postData } from '../../../services/http-service';
function Register() {
    const navigate = useNavigate();
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const handleSubmit = async (value) => {
        // e.preventDefault();
        try {
            const response = await postData('/api/users/register', JSON.stringify(value),
            );
            if (response.status === 201) {
                console.log('Registration successful');
                navigate('/login'); // Use navigate instead of history.push
            } else {
                console.error('Registration failed:', data.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const formConfig = [
        { type: 'text', label: 'Name', name: 'name', required: false, message: 'Please input text!', placeholder: 'Please Enter Name' },
        { type: 'text', label: 'Email', name: 'email', required: false, message: 'Please input text!', placeholder: 'Please Enter email' },
        { type: 'text', label: 'Phone', name: 'phone', required: false, message: 'Please input text!', placeholder: 'Please Enter Phone No.' },
        {
            type: 'select',
            label: 'Gender',
            name: 'gender',
            required: true,
            message: 'Please select Gender',
            options: [{ name: "Male", id: "male" }, { name: "Female", id: "female" }],
            placeholder: 'Select Gender'
        },
        { type: 'text', label: 'Password', name: 'password', required: false, message: 'Please input text!', placeholder: 'Please Enter Password' },
    ];
    return (
        <div className="Register">
            <Button style={{ width: '100%' }} onClick={() => setRegisterModalVisible(true)}>Register</Button>

            <Modal
                title={`Register`}
                visible={registerModalVisible}
                onCancel={() => setRegisterModalVisible(false)}
                footer={null}
            >
                <MyForm fields={formConfig} onSubmit={handleSubmit} />
            </Modal>
        </div>
    );
}

export default Register;
