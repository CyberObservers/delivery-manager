import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, Steps } from "antd";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "../../styles/Order.css";

const steps = [
  {
    title: "Delivery Requirements",
    content: "First-content",
    description: "Package & Package Details.",
  },
  {
    title: "Delivery Routes",
    content: "Second-content",
    description: "Routes and agents.",
  },
  {
    title: "Confirm Order",
    content: "Last-content",
    description: "Confirm your order.",
  },
];

const MakeOrder = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ padding: 5 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {/* Steps */}
        <span>
          <Steps
            direction="vertical"
            current={current}
            items={items}
            className="order-step"
            style={{ marginBottom: "auto", width: "100%" }}
          />
        </span>

        {/* Components */}
        <div className="contentStyle">
          {steps[current].content}, placing components here.
        </div>
      </Stack>

      {/* Buttons */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Processing complete!");
              // sleep 3 seconds
              setTimeout(() => {
                navigate("/delivery/manage");
              }, 3000);
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
