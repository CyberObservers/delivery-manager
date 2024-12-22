import React, { useState } from "react";
// import { } from "@ant-design/icons";
import {
  UserOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Select,
  Flex,
  List,
  Tag,
  Modal,
  Descriptions,
} from "antd";

// 绘制order右侧tag
const getStatusTag = (status) => {
  switch (status) {
    case "success":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success" size="large">
          success
        </Tag>
      );
    case "processing":
      return (
        <Tag icon={<SyncOutlined spin />} color="processing" size="large">
          processing
        </Tag>
      );
    default:
      return (
        <Tag color="default" size="large">
          Unknown status
        </Tag>
      );
  }
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  // 订单详情对话框
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // 个人信息
  const [formData, setFormData] = useState({
    gender: "Male",
    email: "123*****123@gmail.com",
    firstName: "Ming",
    lastName: "Ying",
    password: "********",
  });

  // 订单列表信息
  const orderData = Array.from({
    length: 23,
  }).map((_, i) => ({
    // href: "https://ant.design",
    title: `item name ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description: "This is the description of this order",
    startDate: "123",
    endDate: "123",
    status: "processing",
  }));

  // 单个订单详细信息
  const orderDetails = [
    {
      key: "1",
      label: "OrderId",
      children: 123123123,
    },
    {
      key: "2",
      label: "Sender",
      children: "Lucy",
    },
    {
      key: "3",
      label: "Receiver",
      children: "Orion",
    },
    {
      key: "4",
      label: "ItemName",
      children: "item name 1",
    },
    {
      key: "5",
      label: "StartDate",
      children: "Dec.15",
    },
    {
      key: "6",
      label: "EndDate ",
      children: "Dec.20",
    },
    {
      key: "7",
      label: "Details",
      children: "this is the detail",
    },
  ];

  // 编辑表单
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 提交表单
  const handleConfirm = () => {
    setIsEditing(false);
    console.log("Updated Data:", formData);
    // 提交新信息
  };

  const [form] = Form.useForm();

  // 监控个人信息修改
  const onValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  // 订单详情开关
  // 点击每个order显示该order的详细信息
  const showOrderModal = () => {
    console.log("Item clicked");
    setIsOrderModalOpen(true);
  };
  const handleOk = () => {
    setIsOrderModalOpen(false);
  };
  const handleCancel = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Left side: personal infomation */}
      <div style={{ width: "40%", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <h2>YingMing</h2>
          <p style={{ color: "#007bff" }}>This is my personal signature!</p>
        </div>

        {/* show personal info */}
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          disabled={!isEditing}
          initialValues={formData} // 设置表单的初始值
          onValuesChange={onValuesChange} // 监听表单值的变化
        >
          <Form.Item name="gender" label="Gender">
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="firstName" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input />
          </Form.Item>
        </Form>
        <Flex wrap gap="large" justify="center">
          {/* 编辑按钮 */}
          <Button
            type="primary"
            onClick={handleEdit}
            disabled={isEditing}
            // style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          {/* 确认按钮 */}
          <Button
            type="primary"
            onClick={handleConfirm}
            disabled={!isEditing}
            style={{
              backgroundColor: isEditing ? "#28a745" : "#d9d9d9",
              color: isEditing ? "white" : "#999999",
            }}
          >
            Confirm
          </Button>
        </Flex>
      </div>

      {/* Right side: history order list */}
      <div style={{ width: "50%" }}>
        <List
          itemLayout="vertical"
          size="large"
          header={<h1>History Orders</h1>}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
            align: "center", // 设置分页组件居中
          }}
          dataSource={orderData}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={getStatusTag(item.status)}
              // 点击后跳出对话框
              onClick={showOrderModal}
            >
              <List.Item.Meta
                style={{ textAlign: "left" }}
                // avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={item.description}
                status={item.status}
              />
              <div style={{ textAlign: "left" }}>
                Start Date: {item.startDate}
              </div>
              <div style={{ textAlign: "left" }}>End Date : {item.endDate}</div>
            </List.Item>
          )}
        />
        {/* 对话框展示详细订单信息 */}
        <Modal
          title="Order details"
          open={isOrderModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Descriptions column={1} bordered items={orderDetails} />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
