import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "../../styles/Order.css";

const steps = [
  {
    title: "First",
    content: "First-content",
    description: "First-description",
  },
  {
    title: "Second",
    content: "Second-content",
    description: "Second-description",
  },
  {
    title: "Last",
    content: "Last-content",
    description: "Last-description",
  },
];

const MakeOrder = () => {
  const [current, setCurrent] = useState(0);
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
        sx={{ padding: 10 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <span>
          <Steps
            direction="vertical"
            current={current}
            items={items}
            className="order-step"
            style={{ marginBottom: "auto", width: "100%" }}
          />
        </span>
        <div className="contentStyle">
          {steps[current].content}, placing components here.
        </div>
      </Stack>
      <div
        style={{
          marginTop: 24,
          paddingBottom: 24,
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
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};
export default MakeOrder;
