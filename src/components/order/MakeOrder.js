import React, { useState, useEffect } from "react";
import { Button, message, Steps, Radio } from "antd";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "../../styles/Order.css";
import { useNavigate } from "react-router-dom";
import {
  geocodeAddress,
  calculateUAVDistance,
  createMapForUAV,
  createMapForRobot,
} from "../utils/GoogleMaps";

const steps = [
  { title: "Delivery Requirement", content: "Personal & Package info", description: "Provide your delivery requirements." },
  { title: "Delivery Routes", content: "Routes & agents", description: "Select your delivery route and agent." },
  { title: "Confirm", content: "Review and confirm your order.", description: "Review and confirm your order." },
];

const MakeOrder = () => {
  const [current, setCurrent] = useState(0);
  const [transportMode, setTransportMode] = useState("Robot");
  const [routePreference, setRoutePreference] = useState("Fastest");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  useEffect(() => {
    if (current === 1) {
      // Hardcoded starting and destination addresses for testing purposes.
      // In production, these addresses should be replaced with user input or fetched dynamically.
      const originText = "590 Alexan Dr, Durham, NC 27703";
      const destinationText = "Duke University, Durham, NC 27708";

      const geocoder = new window.google.maps.Geocoder();

      Promise.all([geocodeAddress(geocoder, originText), geocodeAddress(geocoder, destinationText)])
        .then(([origin, destination]) => {
          if (transportMode === "UAV") {
            createMapForUAV("map", origin, destination);
            const distanceInMiles = calculateUAVDistance(origin, destination);
            const time = `${Math.round((distanceInMiles / 31.07) * 60)} mins`; // UAV speed = 31.07 mph
            setInfo(`Distance: ${distanceInMiles.toFixed(1)} mi, Estimated Time: ${time}`);
          } else {
            createMapForRobot("map", origin, destination, routePreference)
              .then(({ distance, duration }) => {
                setInfo(`Distance: ${distance}, Duration: ${duration}`);
              })
              .catch((error) => {
                console.error(error);
                setInfo("Failed to calculate route. Please check the addresses.");
              });
          }
        })
        .catch((error) => {
          console.error(error);
          setInfo("Failed to geocode addresses.");
        });
    }
  }, [current, transportMode, routePreference]);

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ padding: "20px" }} divider={<Divider orientation="vertical" flexItem />}>
        <div style={{ flex: 0.3 }}>
          <Steps direction="vertical" current={current} items={steps.map((item) => ({ key: item.title, title: item.title, description: item.description }))} className="order-step" />
        </div>
        <div style={{ flex: 0.7, padding: "20px" }}>
          {current === 1 ? (
            <div style={{ display: "flex" }}>
              <div style={{ flex: 0.3, marginRight: "20px" }}>
                <h3>Transportation Mode</h3>
                <Radio.Group value={transportMode} onChange={(e) => setTransportMode(e.target.value)} style={{ marginBottom: 20 }}>
                  <Radio.Button value="Robot">Robot</Radio.Button>
                  <Radio.Button value="UAV">UAV</Radio.Button>
                </Radio.Group>
                {transportMode === "Robot" && (
                  <div>
                    <h3>Route Preference</h3>
                    <Radio.Group value={routePreference} onChange={(e) => setRoutePreference(e.target.value)}>
                      <Radio.Button value="Fastest">Fastest route</Radio.Button>
                      <Radio.Button value="Cheapest">Cheapest route</Radio.Button>
                    </Radio.Group>
                  </div>
                )}
              </div>
              <div style={{ flex: 0.7 }}>
                <div id="map" style={{ width: "100%", height: "400px", border: "1px solid #ccc", borderRadius: "8px" }}></div>
                <div style={{ marginTop: "10px", fontSize: "16px" }}>{info}</div>
              </div>
            </div>
          ) : (
            <div>{steps[current].content}</div>
          )}
        </div>
      </Stack>
      <div style={{ marginBottom: 24 }}>
        {current > 0 && <Button onClick={prev}>Previous</Button>}
        {current < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}
        {current === steps.length - 1 && <Button type="primary" onClick={() => { message.success("Processing complete!"); setTimeout(() => navigate("/delivery/manage"), 3000); }}>Done</Button>}
      </div>
    </>
  );
};

export default MakeOrder;