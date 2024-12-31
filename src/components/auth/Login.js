import React from "react";
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const { Option } = Select;

const Login = (props) => {
  const { handleLoggedIn } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values:", values);
    handleLoggedIn("test-token");
    if (values.userType === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  const handleSignUpClick = () => {
    navigate("/Register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <span className="active">Login</span>
            <span className="divider">|</span>
            <span
              className="inactive"
              onClick={handleSignUpClick}
              style={{ cursor: "pointer" }}
            >
              Sign Up
            </span>
          </div>

          <Form form={form} name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="username: admin or user"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="password: ant design"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="userType"
              rules={[{ required: true, message: "Please select user type!" }]}
            >
              <Select placeholder="Select user type" size="large">
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>

            <div className="login-links">
              <Button type="link" className="forgot-link">
                forgot password
              </Button>
              <Button
                type="link"
                className="signup-link"
                onClick={handleSignUpClick}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </Button>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="login-button"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
