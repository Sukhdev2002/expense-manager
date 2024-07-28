import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Select, Row, Col } from 'antd';
import './Form.css'; // Import the CSS file for styles
import OtpVerification from '../auth/otpVerify'
const { Option } = Select;

const renderField = (field) => {
  switch (field.type) {
    case 'text':
      return <Input className="form-input" placeholder={field.placeholder} />;
    case 'password':
      return <Input className="form-input" placeholder={field.placeholder} type="password" />;
    case 'date':
      return <DatePicker className="form-input" placeholder={field.placeholder} />;
    case 'number':
      return <InputNumber className="form-input" min={field.min} max={field.max} placeholder={field.placeholder} />;
    case 'button':
      return <Button onClick={field.onClick}> {field.name} </Button>
    case 'link':
      return <a className="link" onClick={field.onClick} type="link"> {field.name} </a>
    case 'select':
      return (
        <Select className="form-input" placeholder={field.placeholder} onChange={field.onChange}>
          {field.options.map(option => (
            <Option key={option.id} value={JSON.stringify(option)}>
              {option.name}
            </Option>
          ))}
        </Select>
      );
    case 'otp_verification':
      return (
        <OtpVerification setOtpVericationStatus={field.otpVerificationStatus} />
      );
    default:
      return null;
  }
};

const MyForm = ({ fields, onSubmit, initialValues = {}, ButtonName = "Submit" }) => {

  const [form] = Form.useForm();
  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);
  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues} // Set initial values for the form
      >
        {fields.map((field, index) => (
          <Form.Item
            key={index}
            label={field.label}
            name={field.name}
            rules={[{ required: field.required, message: field.message }]}
            className="form-item"
          >
            {renderField(field)}
          </Form.Item>
        ))}
        <Form.Item>
          <Button className="form-button" type="primary" htmlType="submit">
            {ButtonName}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;
