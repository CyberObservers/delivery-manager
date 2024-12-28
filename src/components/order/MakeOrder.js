import React, { useEffect, useState } from "react";
import { Button, message, Steps, Form } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "../../styles/Order.css";

import ChooseRoute from "./ChooseRoute";
import AddPackage from "./AddPackage";
import ConfirmOrder from "./ConfirmOrder";

import { BASE_URL } from "../../constants";

const steps = [
  {
    title: "Delivery Requirement",
    description: "Provide your delivery requirements.",
    component: AddPackage,
  },
  {
    title: "Delivery Routes",
    description: "Select your delivery route and agent.",
    component: ChooseRoute,
  },
  {
    title: "Confirm",
    description: "Review and confirm your order.",
    component: ConfirmOrder,
  },
];

const MakeOrder = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [packages, setPackages] = useState([
    {
      key: "1",
      weight: "1kg",
      width: "10cm",
      length: "10cm",
      height: "10cm",
    },
  ]);

  const [transportMode, setTransportMode] = useState("Robot");
  const [routePreference, setRoutePreference] = useState("Fastest");
  const [info, setInfo] = useState("");
  const [contact, setContact] = useState([]);
  let Component = steps[current].component;

  const next = () => {
    if (current === 0) {
      // check if form is filled in, if not, show error message
      if (packages.length === 0) {
        message.error("Please add at least one package.");
        return;
      }
      // validate form and check if sender and receiver info is the same
      form
        .validateFields()
        .then((values) => {
          if (values.sender === values.receiver) {
            message.error("Sender and receiver cannot be the same.");
            return;
          }
          setCurrent(current + 1);
        })
        .catch((errorInfo) => {
          console.log("Failed:", errorInfo);
          message.error("Please fill in all fields.");
        });
    } else {
      setCurrent(current + 1);
    }
  };
  const prev = () => setCurrent(current - 1);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BASE_URL}/address/1`); // mock data
      const data = response.data;
      setContact(data);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ padding: "20px" }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {/* Step Navigation */}
        <div>
          <Steps
            direction="vertical"
            current={current}
            items={items}
            className="order-step"
          />
        </div>

        {/* Main Content */}
        <div className="content-style">
          <Component
            current={current}
            transportMode={transportMode}
            setTransportMode={setTransportMode}
            routePreference={routePreference}
            setRoutePreference={setRoutePreference}
            info={info}
            setInfo={setInfo}
            form={form}
            contact={contact}
            setContact={setContact}
            setPackages={setPackages}
            packages={packages}
          />
        </div>
      </Stack>
      <div style={{ marginBottom: 24 }}>
        {current > 0 && (
          <Button style={{ marginRight: 10 }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Processing complete!");
              setTimeout(() => navigate("/delivery/manage"), 3000);
            }}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default MakeOrder;
