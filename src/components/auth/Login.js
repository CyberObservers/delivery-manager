import React, { useState } from "react";
import { HttpStatusCode } from "axios";
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { authApi } from "../../api";

const { Option } = Select;

const Login = (props) => {
  const { handleLoggedIn } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await authApi.post("/login", {
        email: values.username,
        password: values.password,
        role_name: values.userType,
      });

      if (response.status === HttpStatusCode.Ok) {
        // get response json
        const data = response.data;
        handleLoggedIn(data.token);
        if (values.userType === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="user email"
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
                placeholder="password"
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
              <Button
                type="link"
                className="forgot-link"
                onClick={() => navigate("/retrieve")}
              >
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
                loading={loading}
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
