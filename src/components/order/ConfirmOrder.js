import React from "react";
import { Table, Row, Col } from "antd";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import { blue } from "@mui/material/colors";

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
];

const ChosenContact = (props) => {
  const { title, person } = props;
  const iconStyle = {
    color: blue[500],
  };

  return (
    <Box
      mb={2}
      textAlign="left"
      sx={{
        border: 1,
        borderColor: "grey.300",
        padding: 2,
        width: "50%",
        margin: "10px",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">
        <PersonIcon sx={iconStyle} /> <strong>Name:</strong> {person.first_name}{" "}
        {person.last_name}
      </Typography>
      <Typography variant="body1">
        <HomeIcon sx={iconStyle} /> <strong>Address:</strong>{" "}
        {person.address.replace(/\n/g, ", ")}
      </Typography>
      <Typography variant="body1">
        <PhoneIcon sx={iconStyle} /> <strong>Phone:</strong> {person.phone}
      </Typography>
    </Box>
  );
};

const ConfirmOrder = (props) => {
  const { form, packages, transportMode, routePreference, info, contact } =
    props;
  const senderId = form.getFieldValue("sender");
  const receiverId = form.getFieldValue("receiver");

  const sender = contact.find((c) => c.address_id === senderId);
  const receiver = contact.find((c) => c.address_id === receiverId);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Confirm Order</h1>
      <Row>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <ChosenContact title="Sender" person={sender} />
            <ChosenContact title="Receiver" person={receiver} />
          </div>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <h3>Transportation Mode</h3>
              <p>{transportMode}</p>
            </Col>
            <Col span={12}>
              <h3>Route Preference</h3>
              <p>{routePreference}</p>
            </Col>
          </Row>

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
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </Col>
        <Col span={12}>
          <div style={{ flex: 0.7 }}>
            <div
              id="map"
              style={{
                width: "100%",
                height: "600px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            ></div>
            <div style={{ marginTop: "10px", fontSize: "16px" }}>{info}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmOrder;
