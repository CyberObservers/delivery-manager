import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../../styles/Home.css";

const typoStyle = {
  color: "white",
  fontSize: { xs: "1cm", md: "1cm", lg: "2cm" },
  fontWeight: "bold",
  fontFamily: "Roboto monospace",
};

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/delivery");
  };
  return (
    <div className="home-container">
      <div className="content">
        <Typography sx={typoStyle}>Future of Delivery Starts Today</Typography>
        <button className="order-button" onClick={handleClick}>
          Order Now!
        </button>
      </div>
    </div>
  );
}

export default Home;
