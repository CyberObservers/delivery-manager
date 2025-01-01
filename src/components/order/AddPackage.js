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
import { HttpStatusCode } from "axios";
import api from "../../api";
import { runes } from "runes2";

const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

const modalLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 24,
  },
};

const countSrategy = {
  show: false,
  max: 30,
  strategy: (txt) => runes(txt).length,
  exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(""),
};

const AddPackage = (props) => {
  const { contact, setContact, form, packages, setPackages } = props;
  const [newPackageForm] = Form.useForm();
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newContact] = Form.useForm();
  const [showNewContact, setShowNewContact] = useState(false);
  const [addContactLoading, setAddContactLoading] = useState(false);

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

  const handleAddContact = async () => {
    try {
      setAddContactLoading(true);
      const values = await newContact.validateFields();
      const newContactObj = {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.telephone,
        address_line_1: `${values.address_line1}`,
        address_line_2: `${values.address_line2}`,
        zip_code: values.zip_code,
      };

      const response = await api.post("/address", newContactObj);
      if (response.status !== HttpStatusCode.Ok) {
        message.error("Failed to add contact.");
      } else {
        setContact([...contact, newContactObj]);
        setShowNewContact(false);
        newContact.resetFields();
        message.success("Contact added successfully!");
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      message.error("Please fill in all fields.");
    } finally {
      setAddContactLoading(false);
    }
  };

  const handleCancelNewContact = () => {
    setShowNewContact(false);
    newContact.resetFields();
  };

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
      setShowAddPackage(false);
      newPackageForm.resetFields();
      message.success("Package added successfully!");
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      message.error(errorInfo);
    }
  };

  const handleCloseModal = () => {
    setShowAddPackage(false);
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
                  <span>{`${person.first_name} ${person.last_name} `}</span>
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
                  <span>{`${person.first_name} ${person.last_name}`}</span>
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
        <Button type="link" onClick={() => setShowNewContact(!showNewContact)}>
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
              setShowAddPackage(!showAddPackage);
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
        open={showAddPackage}
        onOk={handleAddPackage}
        onCancel={handleCloseModal}
      >
        <Form
          {...modalLayout}
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
      <Modal
        title="Add Contact"
        open={showNewContact}
        onOk={handleAddContact}
        onCancel={handleCancelNewContact}
        confirmLoading={addContactLoading}
      >
        <Form
          {...modalLayout}
          name="new-contact"
          form={newContact}
          style={{
            width: "100%",
          }}
          layout="horizontal"
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true }]}
          >
            <Input autoComplete="false" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true }]}
          >
            <Input autoComplete="false" />
          </Form.Item>
          <Form.Item
            label="Telephone"
            name="telephone"
            rules={[{ required: true }]}
          >
            <Input count={{ ...countSrategy, max: 18 }} autoComplete="false" />
          </Form.Item>
          <Form.Item
            label="Address Line1"
            name="address_line1"
            rules={[{ required: true }]}
          >
            <Input count={countSrategy} autoComplete="false" />
          </Form.Item>
          <Form.Item label="Address Line2" name="address_line2">
            <Input count={countSrategy} autoComplete="false" />
          </Form.Item>
          <Form.Item label="Zip Code" name="zip_code">
            <Input count={{ ...countSrategy, max: 6 }} autoComplete="false" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPackage;
