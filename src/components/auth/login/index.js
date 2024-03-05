// components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../slices/authSlice';
import { Button, Form, Input, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import isNil from 'lodash/isNil';
import { loginUser } from '../../../services/http-service';
import { getToken } from '../../../services/data-service';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [alertInfo, setAlertInfo] = useState({message: '', type: 'success'});
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => { 
        const token = getToken();
        if (!isNil(token)) {
            navigate('/home');
        }
    }, []);

    const handleSubmit = (values) => {
        setShowAlert(false);
        loginUser('/api/users/login', JSON.stringify({ username: values.username, password: values.password }))
            .then((res) => {
                const { token } = res.data;
                if (token) {
                    dispatch(setToken({ token }))
                    setIsLoggedIn(true);
                    navigate('/home');
                } else {
                    setAlertInfo({ message: 'User Access Token Found', type: 'error' });
                    setShowAlert(true);
                }
            })
            .catch((err) => {
                setAlertInfo({ message: `Error while login: ${err}`, type: 'error' });
                setShowAlert(true);
            })
    };

    return (
        <Form
            name="normal_login"
            onFinish={(values) => handleSubmit(values)}
            className="login-form"
            style={{ padding: '24px' }}
            size='large'
            >
            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>

            {showAlert ?? <Alert message={alertInfo.message} type={ alertInfo.type} />}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: '12px'}}>
                Log in
                </Button>
                <Button className="login-form-button" onClick={() => navigate('/register')}>
                Register</Button>
            </Form.Item>
        </Form>
    );
}

export default Login;
