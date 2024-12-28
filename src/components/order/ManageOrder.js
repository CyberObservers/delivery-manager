import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Select, Typography, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  // Fetch orders (mock data for now)
  useEffect(() => {
    // Mocking an API call with a delay
    const fetchOrders = async () => {
      setLoading(true);
      const mockOrders = Array.from({ length: 50 }, (_, index) => ({
        key: index,
        orderId: `Order-${index + 1}`,
        sender: `Sender-${index + 1}`,
        receiver: `Receiver-${index + 1}`,
        status: index % 2 === 0 ? "sending" : "pending",
      }));
      setOrders(mockOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "geekblue";
        if (status === "pending") color = "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Operation",
      key: "operation",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Update Order</Button>
          <Button type="link" danger>
            Cancel Order
          </Button>
        </Space>
      ),
    },
  ];

  // Get paginated data
  const paginatedOrders = orders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "100px" }}>
      <h1>Manage Orders</h1>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <Title level={5}>Ongoing Order</Title>
        <Space size="middle">
          <Select
            defaultValue="Application Name"
            style={{ width: 150 }}
            options={[
              { value: "app1", label: "Application 1" },
              { value: "app2", label: "Application 2" },
            ]}
          />
          <Button type="default">View Log</Button>
          <Button type="primary" onClick={() => navigate("/delivery/order")}>+ Add New</Button>
        </Space>
      </div>

      {/* Table */}
      <Table
        dataSource={paginatedOrders}
        columns={columns}
        pagination={false}
        loading={loading}
        rowKey={(record) => record.key}
      />

      {/* Pagination */}
      <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Custom link */}
        <div
        onClick={() => navigate("/profile")}
        style={{ fontSize: "16px", cursor: "pointer", color: "#1890ff"}}
      >
        Looking for history order? Go to Profile.
      </div>
        {/* Pagination component */}
        <Pagination
          current={currentPage}
          total={orders.length}
          pageSize={pageSize}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          showQuickJumper
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ManageOrder;
