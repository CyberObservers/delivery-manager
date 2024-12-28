import React from "react";
import "../../styles/Order.css";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const OrderMainPage = (props) => {
  const navigate = useNavigate();
  const typoStyle = {
    color: "white",
    fontSize: { xs: "1cm", md: "2cm", lg: "3cm" },
    fontWeight: "bold",
    fontFamily: "Roboto monospace",
  };
  const buttonStyle = {
    margin: "10px",
  };

  const OrderButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[600]),
    backgroundColor: blue[600],
    "&:hover": {
      backgroundColor: blue[500],
    },
  }));

  const ManageButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[500],
    },
  }));

  return (
    <div className="order-main-page">
      <Typography sx={typoStyle}>Welcome to Delivery</Typography>
      <div style={{ padding: 20 }}>
        <OrderButton
          variant="contained"
          sx={buttonStyle}
          onClick={() => navigate("/delivery/order")}
        >
          Make Order
        </OrderButton>
        <ManageButton
          variant="contained"
          sx={buttonStyle}
          onClick={() => navigate("/delivery/manage")}
        >
          Manage Order
        </ManageButton>
      </div>
    </div>
  );
};

export default OrderMainPage;
