import React, { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import { Button, message, Steps, Form } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "../../styles/Order.css";

import ChooseRoute from "./ChooseRoute";
import AddPackage from "./AddPackage";
import ConfirmOrder from "./ConfirmOrder";
import calcPrice from "../utils/calcPrice";

import { orderApi } from "../../api";

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
      weight: 1,
      width: 1,
      length: 1,
      height: 1,
    },
  ]);

  const [transportMode, setTransportMode] = useState("Robot");
  const [routePreference, setRoutePreference] = useState("Fastest");
  const [info, setInfo] = useState({});
  const [contact, setContact] = useState([]);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const onConfirm = async () => {
    setLoading(true);
    form.validateFields();
    // calc total weights
    let totalWeight = 0;
    packages.forEach((p) => {
      totalWeight += parseFloat(p.weight);
    });
    let totalPrice = calcPrice(
      distance,
      totalWeight,
      transportMode,
      form.getFieldValue("fragile")
    );
    totalPrice = totalPrice.toFixed(2);

    try {
      const response = await orderApi.post("/create", {
        station_id: 1,
        source_address_id: form.getFieldValue("sender"),
        dest_address_id: form.getFieldValue("receiver"),
        delivery_method: transportMode,
        // calc max width among all packages
        package_size: {
          width: Math.max(...packages.map((p) => p.width)),
          length: Math.max(...packages.map((p) => p.length)),
          height: Math.max(...packages.map((p) => p.height)),
        },
        package_weight: totalWeight,
        total_price: totalPrice,
        category: form.getFieldValue("fragile") ? "Fragile" : "Normal",
        route: {
          duration: `${info.duration} mins`,
          distance: `${(distance / 1000) * 0.621371} miles`,
        },
        notes: form.getFieldValue("note"),
      });
      if (response.status !== HttpStatusCode.Created) {
        message.error("Failed to place order.");
      } else {
        message.success("Processing complete!");
        setTimeout(() => navigate("/delivery/manage"), 1000);
        form.resetFields();
      }
    } catch (error) {
      console.log("Failed:", error);
      message.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/address");
      const data = response.data;
      setContact(data);
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
            distance={distance}
            setDistance={setDistance}
          />
        </div>
      </Stack>
      <div style={{ marginBottom: 24 }}>
        {current > 0 && (
          <Button style={{ marginRight: 10 }} onClick={prev} loading={loading}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} loading={loading}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onConfirm} loading={loading}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default MakeOrder;
