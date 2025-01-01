import React, { useState } from "react";
import { HttpStatusCode } from "axios";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { authApi } from "../../api";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gettingCode, setGettingCode] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values:", values);
    setLoading(true);
    try {
      const response = await authApi.post(".user", {
        username: values.username,
        password: values.password,
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        verify_token: values.verificationCode,
      });

      if (response.status === HttpStatusCode.Created) {
        message.success("User registered successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        message.error("Failed to register user!");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGetCode = async () => {
    setGettingCode(true);
    const email = form.getFieldValue("email");
    if (!email) {
      message.error("Please input your email!");
      return;
    }
    try {
      const response = await authApi.post("/verify-token", {
        email: email,
      });
      if (response.status === HttpStatusCode.Ok) {
        message.success("Verification code sent successfully!");
      } else {
        message.error("Failed to send verification code!");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGettingCode(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Hello</h1>
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <span
              className="inactive"
              onClick={handleLoginClick}
              style={{ cursor: "pointer" }}
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
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
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
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Last Name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
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
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
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
              name="confirm"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
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

            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                name="verificationCode"
                rules={[
                  {
                    required: true,
                    message: "Please input verification code!",
                  },
                ]}
              >
                <Input placeholder="Verification code" size="large" />
              </Form.Item>
              <Button
                onClick={handleGetCode}
                loading={gettingCode}
                size="large"
              >
                Get Code
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
