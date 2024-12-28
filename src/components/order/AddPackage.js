import React, { useState } from "react";
import {
  Button,
  Radio,
  Form,
  Input,
  Select,
  Table,
  Modal,
  message,
} from "antd";

const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

const AddPackage = (props) => {
  const { contact, form, packages, setPackages } = props;
  const [newPackageForm] = Form.useForm();
  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      title: "Weight(kg)",
      dataIndex: "weight",
    },
    {
      title: "Width(m)",
      dataIndex: "width",
    },
    {
      title: "Length(m)",
      dataIndex: "length",
    },
    {
      title: "Height(m)",
      dataIndex: "height",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <Button
          onClick={() => handleDeletePackage(record.key)}
          type="secondary"
          danger
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDeletePackage = (key) => {
    setPackages(packages.filter((item) => item.key !== key));
  };

  const handleAddPackage = async () => {
    try {
      const values = await newPackageForm.validateFields();
      const newPackage = {
        key: `${packages.length + 1}`,
        weight: values.Weight,
        width: values.Width,
        length: values.Length,
        height: values.Height,
      };

      setPackages([...packages, newPackage]);
      setShowModal(false);
      newPackageForm.resetFields();
      message.success("Package added successfully!");
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      message.error("Please fill in all fields.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    newPackageForm.resetFields();
  };

  return (
    <div
      style={{
        flex: 0.9,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "start",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <h3>Personal Information</h3>
        </div>
        <Form
          {...layout}
          name="add-package"
          form={form}
          style={{ width: "100%" }}
          layout="horizontal"
        >
          <Form.Item label="Sender" name="sender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a person"
              allowClear
              options={contact.map((person) => ({
                label: (
                  <span>
                    {`${person.first_name} ${person.last_name} ${
                      person.phone
                    }\n${person.address.replace(/\n/g, " ")}`}
                  </span>
                ),
                value: person.address_id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Receiver"
            name="receiver"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a person"
              allowClear
              options={contact.map((person) => ({
                label: (
                  <span>
                    {`${person.first_name} ${person.last_name} ${
                      person.phone
                    }\n${person.address.replace(/\n/g, " ")}`}
                  </span>
                ),
                value: person.address_id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Fragile"
            name="fragile"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Note" name="note">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
        <Button type="link" onClick={props.next}>
          No contact? Add one.
        </Button>
      </div>

      <div style={{ width: "50%", height: "600px", marginLeft: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <h3>Packages</h3>
          <Button
            type="primary"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Add Package
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={packages}
          pagination={{
            pageSize: 5,
          }}
          scroll={{
            y: 550 * 5,
          }}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        />
      </div>
      <Modal
        title="Add Package"
        open={showModal}
        onOk={handleAddPackage}
        onCancel={handleCloseModal}
      >
        <Form
          {...layout}
          name="new-package"
          form={newPackageForm}
          style={{
            width: "100%",
          }}
          layout="horizontal"
        >
          <Form.Item label="Weight" name="Weight" rules={[{ required: true }]}>
            <Input autoComplete="false" />
          </Form.Item>
          <Form.Item label="Width" name="Width" rules={[{ required: true }]}>
            <Input autoComplete="false" />
          </Form.Item>
          <Form.Item label="Length" name="Length" rules={[{ required: true }]}>
            <Input autoComplete="false" />
          </Form.Item>
          <Form.Item label="Height" name="Height" rules={[{ required: true }]}>
            <Input autoComplete="false" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPackage;
