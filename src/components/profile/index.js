import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, Modal, Row, Col, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import MyForm from '../form/Form'; // Import MyForm component
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { postData, fetchData, deleteData, updateData } from '../../services/http-service';
const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalType('');
  };

  const handleOk = (values) => {
    // Handle the update logic based on modalType
    switch (modalType) {
      case 'name':
        setName(values.name);
        break;
      case 'email':
        setEmail(values.email);
        break;
      case 'phone':
        setPhone(values.phone);
        break;
      case 'password':
        // Assume values.password is the new password
        console.log('New Password:', values.password);
        break;
      default:
        break;
    }
    setIsModalVisible(false);
    setModalType('');
  };

  const handleLogout = () => {
    // Handle the logout logic
    console.log('Logout');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const CurrentLoggedUserDetails = async () => {
    const response = await fetchData(`/api/users/`);
    console.log(response);
    const userData = response.data;
    setName(userData?.name);
    setPhone(userData?.phone);
    setEmail(userData?.email);
    setPassword(userData?.password);
    setGender(userData?.gender.name);
  }
  useEffect(() => {
    CurrentLoggedUserDetails();

  }, []);

  const getFormFields = () => {
    switch (modalType) {
      case 'name':
        return [{ type: 'text', label: 'Name', name: 'name', required: true, message: 'Please enter your name!' }];
      case 'email':
        return [{ type: 'text', label: 'Email', name: 'email', required: true, message: 'Please enter your email!' }];
      case 'phone':
        return [{ type: 'text', label: 'Mobile Number', name: 'phone', required: true, message: 'Please enter your mobile number!' }];
      case 'password':
        return [
          { type: 'text', label: 'New Password', name: 'password', required: true, message: 'Please enter your new password!' },
          { type: 'text', label: 'Confirm Password', name: 'confirmPassword', required: true, message: 'Please confirm your new password!' }
        ];
      default:
        return [];
    }
  };

  return (
    <div>
      <Card title="Profile" style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                <Row justify="space-between" align="middle">
                  <Col>
                    {name}
                  </Col>
                  <Col>
                    <Button type="link" onClick={() => showModal('name')}>Edit</Button>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <Row justify="space-between" align="middle">
                  <Col>
                    {email}
                  </Col>
                  <Col>
                    <Button type="link" onClick={() => showModal('email')}>Edit</Button>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Mobile Number">
                <Row justify="space-between" align="middle">
                  <Col>
                    {phone}
                  </Col>
                  <Col>
                    <Button type="link" onClick={() => showModal('phone')}>Edit</Button>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Password">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Input.Password
                      value={password}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Button type="link" onClick={() => showModal('password')}>Edit Password</Button>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24} style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>

        <Modal
          title={`Edit ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <MyForm fields={getFormFields()} onSubmit={handleOk} />
        </Modal>
      </Card>
    </div>
  );
};

export default Profile;
