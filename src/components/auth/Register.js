import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleGetCode = () => {
    console.log('Sending verification code...');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Hello</h1>
        <Card
          className="login-card"
          bordered={false}
        >
          <div className="login-header">
            <span 
              className="inactive"
              onClick={handleLoginClick}
              style={{ cursor: 'pointer' }}
            >
              Login
            </span>
            <span className="divider">|</span>
            <span className="active">Sign Up</span>
          </div>
          
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
          >
            {/* Added First Name field */}
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="First Name"
                size="large"
              />
            </Form.Item>

            {/* Added Last Name field */}
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Last Name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="confirm password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="verificationCode"
              rules={[{ required: true, message: 'Please input verification code!' }]}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                <Input
                  placeholder="Verification code"
                  size="large"
                />
                <Button 
                  onClick={handleGetCode}
                  size="large"
                >
                  Get Code
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="login-button"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;