import React, { useState } from "react";
import { HttpStatusCode } from "axios";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { authApi } from "../../api";

const Retrieve = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [gettingCode, setGettingCode] = useState(false);

  const handleGetCode = async () => {
    setGettingCode(true);
    const email = form.getFieldValue("username");
    if (!email) {
      message.error("Please input your email!");
      return;
    }
    try {
      const response = await authApi.post("/forgot-password", {
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
        <h1>Retrieve Password</h1>
        <Card className="login-card" bordered={false}>
          <Form
            form={form}
            name="retrieve-password"
            // onFinish={handleLogin}
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
            <Form.Item
              name="verificationCode"
              rules={[
                {
                  required: true,
                  message: "Please input verification code!",
                },
              ]}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <Input placeholder="Verification code" size="large" />

                <Button
                  onClick={handleGetCode}
                  loading={gettingCode}
                  size="large"
                >
                  Get Code
                </Button>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                className="forgot-link"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Retrieve;
