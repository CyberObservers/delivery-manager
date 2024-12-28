import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/delivery");
  };
  return (
    <div className="home-container">
      <div className="content">
        <h1>Future of Delivery Starts Today</h1>
        <button className="order-button" onClick={handleClick}>
          Order Now!
        </button>
      </div>
    </div>
  );
}

export default Home;
