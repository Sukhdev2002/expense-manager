
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../../../slices/authSlice';
// import isNil from 'lodash/isNil';
// import { postData } from '../../../services/http-service';
// import { getToken } from '../../../services/data-service';
// import MyForm from '../../form/Form';

// import { Button, Modal, Row, Col, Typography, Layout } from 'antd';
// // import Login from './Login';

// const { Title } = Typography;
// const { Header, Content, Footer } = Layout;

// function Login({ setIsLoggedIn }) {
//     const [signUpModalVisible, setSignUpModalVisible] = useState(false);
//     const [formConfig, setFormConfig] = useState([]);
//     const [handleFunction, setHandleFunction] = useState();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const loginFormConfig = [
//         {
//             type: 'text',
//             label: 'Username',
//             name: 'username',
//             required: true,
//             message: 'Please input a Username!',
//             placeholder: 'Please Enter Username'
//         },
//         {
//             type: 'password',
//             label: 'Password',
//             name: 'password',
//             required: true,
//             message: 'Please input your Password!',
//             placeholder: 'Please input your Password!'
//         }
//     ];
//     const signUpFormConfig = [
//         { type: 'text', label: 'Name', name: 'name', required: true, message: 'Please input text!', placeholder: 'Please Enter Name' },
//         { type: 'text', label: 'Email', name: 'email', required: true, message: 'Please input text!', placeholder: 'Please Enter email' },
//         { type: 'text', label: 'Phone', name: 'phone', required: true, message: 'Please input text!', placeholder: 'Please Enter Phone No.' },
//         {
//             type: 'select',
//             label: 'Gender',
//             name: 'gender',
//             required: true,
//             message: 'Please select Gender',
//             options: [{ name: "Male", id: "male" }, { name: "Female", id: "female" }],
//             placeholder: 'Select Gender'
//         },
//         { type: 'text', label: 'Password', name: 'password', required: true, message: 'Please input text!', placeholder: 'Please Enter Password' },
//     ];
//     useEffect(() => {
//         const token = getToken();
//         if (!isNil(token)) {
//             navigate('/home');
//         }
//     }, []);

//     const handleLogin = (values) => {

//         postData('/api/users/login', JSON.stringify({ name: values.username, password: values.password }))
//             .then((res) => {
//                 const { token } = res.data;
//                 if (token) {
//                     dispatch(setToken({ token }))
//                     setIsLoggedIn(true);
//                     navigate('/home');
//                 } else {

//                 }
//             })
//             .catch((err) => {

//             })
//     };

//     const handleRegister = async (value) => {
//         try {
//             const response = await postData('/api/users/register', JSON.stringify(value),
//             );
//             if (response.status === 201) {
//                 console.log('Registration successful');

//                 // Use navigate instead of history.push
//             } else {
//                 console.error('Registration failed:', data.message);
//             }
//             setSignUpModalVisible(false)
//         } catch (error) {
//             console.error('Error registering user:', error);
//         }
//     };
//     return (
//         // <Layout style={{ minHeight: '100vh', background: '#34eb9e' }}>
//         //     <Header style={{ background: '#34eb9e', textAlign: 'center', padding: 0 }}>
//         //         <Title level={2} style={{ margin: '16px 0' }}>Welcome to Our Expense Buddy</Title>
//         //     </Header>
//         //     <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         //         <div style={{ textAlign: 'center', padding: '50px', borderRadius: '8px' }}>
//         //             <Row gutter={16} justify="center">
//         //                 <Col>
//         //                     <Button type="primary" size="large" onClick={() => { setSignUpModalVisible(true); setFormConfig(loginFormConfig); setHandleFunction(() => handleLogin) }} style={{ margin: '0 20px' }}>
//         //                         Login
//         //                     </Button>
//         //                 </Col>
//         //                 <Col>
//         //                     <Button type="primary" size="large" onClick={() => { setSignUpModalVisible(true); setFormConfig(signUpFormConfig); setHandleFunction(() => handleRegister) }} style={{ margin: '0 20px' }}>
//         //                         Sign-up
//         //                     </Button>
//         //                 </Col>
//         //             </Row>
//         //             <Modal
//         //                 title={`Register`}
//         //                 visible={signUpModalVisible}
//         //                 onCancel={() => setSignUpModalVisible(false)}
//         //                 footer={null}
//         //             >
//         //                 <MyForm fields={formConfig} onSubmit={handleFunction} />
//         //             </Modal>
//         //         </div>
//         //     </Content>
//         //     <Footer style={{ textAlign: 'center' }}>©2024 Your Website Name</Footer>
//         // </Layout>
//         <Layout style={{ minHeight: '100vh', background: 'linear-gradient(0deg, #059b82, #16c98c 33.8542%, #16ca8c 52.6042%, #059b82)' }}>

//             {/* <Header style={{
//                 textAlign: 'center', padding: 0, background: 'linear-gradient(0deg, #059b82, #16c98c 33.8542%, #16ca8c 52.6042%, #059b82)', boxShadow: 0
//             }}> */}
//             <Title level={2} style={{ margin: '16px 0', textAlign: 'center', padding: 0, color: '#fff' }
//             } >
//                 Welcome to Expense Buddy
//             </Title>
//             {/* </Header > */}
//             <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <div style={{ textAlign: 'center', padding: '50px', borderRadius: '8px', }}>
//                     <Row gutter={16} justify="center">
//                         <Col>
//                             <Button
//                                 type="primary"
//                                 size="large"
//                                 onClick={() => { setSignUpModalVisible(true); setFormConfig(loginFormConfig); setHandleFunction(() => handleLogin); }}
//                                 style={{ margin: '0 20px' }}
//                             >
//                                 Login
//                             </Button>
//                         </Col>
//                         <Col>
//                             <Button
//                                 type="primary"
//                                 size="large"
//                                 onClick={() => { setSignUpModalVisible(true); setFormConfig(signUpFormConfig); setHandleFunction(() => handleRegister); }}
//                                 style={{ margin: '0 20px' }}
//                             >
//                                 Sign-up
//                             </Button>
//                         </Col>
//                     </Row>
//                     <Modal
//                         title={`Register`}
//                         visible={signUpModalVisible}
//                         onCancel={() => setSignUpModalVisible(false)}
//                         footer={null}
//                         style={{ borderRadius: '8px' }}
//                     >
//                         <MyForm fields={formConfig} onSubmit={handleFunction} />
//                     </Modal>
//                 </div>
//             </Content>

//         </Layout >
//     );
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../slices/authSlice';
import isNil from 'lodash/isNil';
import { postData } from '../../../services/http-service';
import { getToken } from '../../../services/data-service';
import MyForm from '../../form/Form';
import { Button, Modal, Row, Col, Typography, Layout, Input, notification } from 'antd';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

function Login({ setIsLoggedIn }) {
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [formConfig, setFormConfig] = useState([]);
    const [handleFunction, setHandleFunction] = useState();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        }
    ];

    const signUpFormConfig = [
        { type: 'text', label: 'Name', name: 'name', required: true, message: 'Please input text!', placeholder: 'Please Enter Name' },
        { type: 'text', label: 'Email', name: 'email', required: true, message: 'Please input text!', placeholder: 'Please Enter email' },
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
        { type: 'text', label: 'Password', name: 'password', required: true, message: 'Please input text!', placeholder: 'Please Enter Password' },
        {
            label: 'Captcha',
            name: 'captcha',
            type: 'captcha',
            placeholder: 'Enter captcha',
            required: true,
            message: 'Please input the captcha you got!',
            onGetCaptcha: () => {
                // Function to handle getting captcha
                console.log('Get Captcha clicked');
            }
        }
    ];

    useEffect(() => {
        const token = getToken();
        if (!isNil(token)) {
            navigate('/home');
        }
    }, []);

    const handleLogin = (values) => {
        postData('/api/users/login', JSON.stringify({ name: values.username, password: values.password }))
            .then((res) => {
                const { token } = res.data;
                setSignUpModalVisible(false);
                if (token) {
                    dispatch(setToken({ token }))
                    setIsLoggedIn(true);
                    navigate('/home');
                } else {

                }
            })
            .catch((err) => {

            })
    };

    const handleRegister = async (values) => {
        try {
            // Register the user
            const registerResponse = await postData('/api/users/register', JSON.stringify(values));

            if (registerResponse.status === 201) {
                // Successfully registered; now request an OTP
                const { email } = values;
                const otpResponse = await postData('/api/users/send-otp', JSON.stringify({ email }));

                if (otpResponse.status === 200) {
                    // OTP sent successfully, show OTP modal
                    setEmail(email);
                    setSignUpModalVisible(false); // Set the email for OTP verification
                    setOtpModalVisible(true); // Show OTP modal
                    // Close sign-up modal
                } else {
                    // Handle OTP sending failure
                    notification.error({
                        message: 'Failed to send OTP',
                        description: otpResponse.data.message,
                    });
                }
            } else {
                // Handle registration failure
                notification.error({
                    message: 'Registration failed',
                    description: registerResponse.data.message,
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            notification.error({
                message: 'Error during registration',
                description: error.message,
            });
        }
    };


    const verifyOtp = () => {
        postData('/api/users/verify-otp', JSON.stringify({ email, otp }))
            .then((res) => {
                const { token } = res.data;
                if (token) {
                    dispatch(setToken({ token }));
                    setIsLoggedIn(true);
                    navigate('/home');
                } else {
                    notification.error({
                        message: 'Verification failed',
                    });
                }
                setOtpModalVisible(false);
            })
            .catch((err) => {
                console.error('Error verifying OTP:', err);
                notification.error({
                    message: 'Error verifying OTP',
                    description: err.message,
                });
            });
    };

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
                                onClick={() => { setSignUpModalVisible(true); setFormConfig(loginFormConfig); setHandleFunction(() => handleLogin); }}
                                style={{ margin: '0 20px' }}
                            >
                                Login
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => { setSignUpModalVisible(true); setFormConfig(signUpFormConfig); setHandleFunction(() => handleRegister); }}
                                style={{ margin: '0 20px' }}
                            >
                                Sign-up
                            </Button>
                        </Col>
                    </Row>
                    <Modal
                        title={`Login`}
                        visible={signUpModalVisible}
                        onCancel={() => setSignUpModalVisible(false)}
                        footer={null}
                        style={{ borderRadius: '8px' }}
                    >
                        <MyForm fields={formConfig} onSubmit={handleFunction} />
                    </Modal>
                    <Modal
                        title={`Verify OTP`}
                        visible={otpModalVisible}
                        onCancel={() => setOtpModalVisible(false)}
                        footer={[
                            <Button key="submit" type="primary" onClick={verifyOtp}>Verify</Button>
                        ]}
                        style={{ borderRadius: '8px' }}
                    >
                        <Input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                    </Modal>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2024 Your Website Name</Footer>
        </Layout>
    );
}

export default Login;
