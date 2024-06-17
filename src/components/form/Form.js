import React from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Select } from 'antd';
import './Form.css'; // Import the CSS file for styles

const renderField = (field) => {
  switch (field.type) {
    case 'text':
      return <Input className="form-input" placeholder={field.placeholder} />;
    case 'date':
      return <DatePicker className="form-input" placeholder={field.placeholder}/>;
    case 'number':
      return <InputNumber className="form-input" min={field.min} max={field.max} placeholder={field.placeholder} />;
      case 'select':
        return (
          <Select className="form-input" placeholder={field.placeholder} onChange={field.onChange}>
            {field.options.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );   
    default:
      return null;
  }
};

const MyForm = ({ fields, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        {fields.map((field, index) => (
          <Form.Item
            key={index}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder || ""}
            rules={[{ required: field.required, message: field.message }]}
            className="form-item"
          >
            {renderField(field)}
          </Form.Item>
        ))}
        <Form.Item>
          <Button className="form-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;
