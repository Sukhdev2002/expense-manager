import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { postData } from '../../../services/http-service';

function OtpVerification({ setOtpVericationStatus }) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const sendOtp = async (emailId) => {
        try {
            const otpResponse = await postData('/api/users/send-otp', JSON.stringify({ email: emailId }));
            if (otpResponse.status === 200) {
                setEmail(emailId);
                notification.info({
                    message: 'OTP Sent Successfully',
                    description: `OTP has been sent to ${emailId}`,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error sending OTP',
                description: error.response?.data?.message || error.message,
            });
        }
    };

    const verifyOtp = async (otp) => {
        try {
            const otpResponse = await postData('/api/users/verify-otp', JSON.stringify({ email, otp }));
            const otpVerificationStatus = _.get(otpResponse, 'data', false);
            if (otpVerificationStatus.success) {
                notification.info({

                    message: "Otp verified Successfully",
                });
                setOtpVericationStatus(true);
            } else {
                notification.info({
                    message: otpVerificationStatus.message, // Handling the error message from the response
                });
                setOtpVericationStatus(false);
            }
        } catch (error) {
            notification.error({
                message: 'Error verifying OTP',
                description: error.response?.data?.message || error.message, // Handle the error message from the response
            });
            setOtpVericationStatus(false);
        }
    };

    const style = {
        padding: '8px 0',
    };
    return (
        <>
            <Row gutter={8} style={style}>
                <Col span={16}>
                    <Form.Item
                        name="email"
                        noStyle
                        rules={[{ required: true, message: "Please Enter Email!" }]}
                    >
                        <Input
                            className="form-input"
                            placeholder="Please Enter Email!"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update state on input change
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendOtp(email)}>Get OTP</Button>
                </Col>
            </Row>
            <Row gutter={8} style={style}>
                <Col span={16}>
                    <Form.Item
                        name="otp"
                        noStyle
                        rules={[{ required: true, message: "Please Enter OTP!" }]}
                    >
                        <Input
                            className="form-input"
                            placeholder="Please Enter OTP!"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} // Update state on input change
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Button onClick={() => verifyOtp(otp)}>Verify OTP</Button>
                </Col>
            </Row>
        </>
    );
}

export default OtpVerification;
