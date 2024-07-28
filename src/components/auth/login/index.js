

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../slices/authSlice';
import isNil from 'lodash/isNil';
import { postData } from '../../../services/http-service';
import { getToken } from '../../../services/data-service';
import MyForm from '../../form/Form';
import { Button, Modal, Row, Col, Typography, Layout, notification } from 'antd';

import { passwordReset } from '../../utils/Utils';

const { Title } = Typography;
const { Content, Footer } = Layout;

function Login({ setIsLoggedIn }) {
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);
    const [loginModalVisible, setLoginpModalVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otpVerificationStatus, setOtpVerificationStatus] = useState(false);
    const [resetPasswordModal, setResetPasswordModal] = useState(false);


    const forgotPassword = useCallback(() => {
        setOtpVerificationStatus(false);
        setLoginpModalVisible(false)
        setResetPasswordModal(true);

    }, []);

    const loginFormConfig = [
        {
            type: 'text',
            label: 'Username',
            name: 'username',
            required: true,
            message: 'Please input a Username!',
            placeholder: 'Please Enter Username'
        },
        {
            type: 'password',
            label: 'Password',
            name: 'password',
            required: true,
            message: 'Please input your Password!',
            placeholder: 'Please input your Password!'
        },
        {
            type: 'link',
            name: 'Forgot Password?',
            onClick: forgotPassword
        }
    ];

    const updateOtpVerification = (status) => {
        setOtpVerificationStatus(status)
    };

    const signUpFormConfig = [
        { type: 'text', label: 'Name', name: 'name', required: true, message: 'Please input text!', placeholder: 'Please Enter Name' },
        { type: 'text', label: 'Phone', name: 'phone', required: true, message: 'Please input text!', placeholder: 'Please Enter Phone No.' },
        {
            type: 'select',
            label: 'Gender',
            name: 'gender',
            required: true,
            message: 'Please select Gender',
            options: [{ name: "Male", id: "male" }, { name: "Female", id: "female" }],
            placeholder: 'Select Gender'
        },
        { type: 'password', label: 'Password', name: 'password', required: true, message: 'Please input text!', placeholder: 'Please Enter Password' },
        {
            label: 'Email',
            name: 'email',
            type: 'otp_verification',
            otpVerificationStatus: updateOtpVerification,

        }
    ];
    const resetPasswordFormConfig = [
        {
            label: 'Email',
            name: 'email',
            type: 'otp_verification',
            otpVerificationStatus: updateOtpVerification,
        },
        {
            type: 'password',
            label: 'Password',
            name: 'password',
            required: true,
            message: 'Please input your Password!',
            placeholder: 'Please input your Password!'
        },
    ];
    useEffect(() => {
        const token = getToken();
        if (!isNil(token)) {
            navigate('/home');
        }
    }, [navigate]);

    const handleLogin = async (values) => {
        try {
            const res = await postData('/api/users/login', JSON.stringify({ name: values.username, password: values.password }));
            const { token } = res.data;
            setLoginpModalVisible(false);
            if (token) {
                dispatch(setToken({ token }));
                setIsLoggedIn(true);
                navigate('/home');
            }
        } catch (err) {
            notification.error({
                message: 'Login Failed',
                description: err.message,
            });
        }
    };

    const handleRegister = async (values) => {
        try {
            if (otpVerificationStatus) {
                const registerResponse = await postData('/api/users/register', JSON.stringify(values));
                setSignUpModalVisible(false)
                if (registerResponse.status === 201) {
                    notification.info({
                        message: 'Registration Successful',
                        description: 'Your account has been registered successfully.',
                    });
                } else {
                    notification.error({
                        message: 'Registration Failed',
                        description: registerResponse.data.message,
                    });
                }
            }
            else {
                notification.error({
                    message: 'Registration Failed',
                    description: "Otp Verification is Pending",
                });
            }

        } catch (error) {
            notification.error({
                message: 'Error during registration',
                description: error.message,
            });
        }
    };
    const handleResetPassword = async (values) => {

        try {
            if (otpVerificationStatus) {
                await passwordReset(values);

            } else {
                notification.error({
                    message: 'Registration Failed',
                    description: "Otp Verification is Pending",
                });
            }
            setResetPasswordModal(false);
        } catch (error) {
            notification.error({
                message: 'Error during Password reseting',
                description: error.message,
            });
        }

    }

    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(0deg, #059b82, #16c98c 33.8542%, #16ca8c 52.6042%, #059b82)' }}>
            <Title level={2} style={{ margin: '16px 0', textAlign: 'center', padding: 0, color: '#fff' }}>
                Welcome to Expense Buddy
            </Title>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '50px', borderRadius: '8px' }}>
                    <Row gutter={16} justify="center">
                        <Col>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => { setLoginpModalVisible(true); }}
                                style={{ margin: '0 20px' }}
                            >
                                Login
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => {
                                    setSignUpModalVisible(true);

                                }}
                                style={{ margin: '0 20px' }}
                            >
                                Sign-up
                            </Button>
                        </Col>
                    </Row>
                    <Modal
                        title={`Login`}
                        visible={loginModalVisible}
                        onCancel={() => setLoginpModalVisible(false)}
                        footer={null}
                        style={{ borderRadius: '8px' }}
                    >
                        <MyForm fields={loginFormConfig} onSubmit={handleLogin} />
                    </Modal>
                    <Modal
                        title={`Sign Up`}
                        visible={signUpModalVisible}
                        onCancel={() => setSignUpModalVisible(false)}
                        footer={null}
                        style={{ borderRadius: '8px' }}
                    >
                        <MyForm fields={signUpFormConfig} onSubmit={handleRegister} />
                    </Modal>
                    <Modal
                        title={`Password Reset`}
                        visible={resetPasswordModal}
                        onCancel={() => setResetPasswordModal(false)}
                        footer={null}
                        style={{ borderRadius: '8px' }}
                    >
                        <MyForm fields={resetPasswordFormConfig} onSubmit={handleResetPassword} />
                    </Modal>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2024 Your Website Name</Footer>
        </Layout>
    );
}

export default Login;
