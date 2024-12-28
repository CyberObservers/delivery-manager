import React, { useState, useEffect } from "react";
import { Button, message, Steps, Radio } from "antd";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "../../styles/Order.css";
import {useNavigate} from "react-router-dom"

const steps = [
  {
    title: "Delivery Requirement",
    content: "Personal & Package info",
    description: "Provide your delivery requirements.",
  },
  {
    title: "Delivery Routes",
    content: "Routes & agents",
    description: "Select your delivery route and agent.",
  },
  {
    title: "Confirm",
    content: "Review and confirm your order.",
    description: "Review and confirm your order.",
  },
];

const MakeOrder = () => {
  const [current, setCurrent] = useState(0);
  const [transportMode, setTransportMode] = useState("Robot");
  const [routePreference, setRoutePreference] = useState("Fastest");
  const [info, setInfo] = useState(""); // To store route info (distance and duration)
  const navigate = useNavigate()

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  const calculateUAVTime = (distanceInMiles) => {
    const speed = 31.07; // UAV speed in miles per hour
    const totalMinutes = (distanceInMiles / speed) * 60; // Time in minutes
    return `${Math.round(totalMinutes)} mins`; // Return as "X mins"
  };
  useEffect(() => {
    if (current === 1) {

      const originText = "600 Alexan Dr, Durham, NC 27703";
      const destinationText = "Duke University, Durham, NC 27708";
      
  
      const geocoder = new window.google.maps.Geocoder();
  
      // Function to perform geocoding
      const geocodeAddress = (address) => {
        return new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === "OK") {
              resolve(results[0].geometry.location);
            } else {
              reject(`Geocode failed: ${status}`);
            }
          });
        });
      };
  
      // Process origin and destination
      Promise.all([geocodeAddress(originText), geocodeAddress(destinationText)])
        .then(([origin, destination]) => {
          // Initialize map
          const map = new window.google.maps.Map(document.getElementById("map"), {
            center: origin,
            zoom: 12,
          });

          if (transportMode === "UAV") {
            // Add markers for UAV
            new window.google.maps.Marker({
              position: origin,
              map: map,
              label: { text: "A", color: "white" },
            });
  
            new window.google.maps.Marker({
              position: destination,
              map: map,
              label: { text: "B", color: "white" },
            });
  
            // Draw straight line for UAV
            const line = new window.google.maps.Polyline({
              path: [origin, destination],
              geodesic: true,
              strokeColor: "#4285F4",
              strokeOpacity: 0.7,
              strokeWeight: 5,
            });
  
            line.setMap(map);
  
            // Fit map bounds
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(origin);
            bounds.extend(destination);
            map.fitBounds(bounds);
  
            // Calculate UAV distance and time
            const distanceInMiles =
              (window.google.maps.geometry.spherical.computeDistanceBetween(
                origin,
                destination
              ) /
                1000) *
              0.621371; // Convert km to miles
  
            const time = calculateUAVTime(distanceInMiles);
            setInfo(`Distance: ${distanceInMiles.toFixed(1)} mi, Estimated Time: ${time}`);
          } else {
            // Use DirectionsService for Robot
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
  
            const request = {
              origin,
              destination,
              travelMode: "DRIVING",
            };
  
            if (routePreference === "Cheapest") {
              request.optimizeWaypoints = true;
            }
  
            directionsService.route(request, (result, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result);
  
                const route = result.routes[0].legs[0];
                const distance = route.distance.text;
                const duration = route.duration.text;
  
                setInfo(`Distance: ${distance}, Duration: ${duration}`);
              } else {
                console.error("Directions request failed:", status);
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setInfo("Failed to calculate route. Please check the addresses.");
        });
    }
  }, [current, transportMode, routePreference]);

  return (
    <>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ padding: "20px" }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {/* Step Navigation */}
        <div style={{ flex: 0.3 }}>
          <Steps
            direction="vertical"
            current={current}
            items={items}
            className="order-step"
          />
        </div>

        {/* Main Content */}
        <div style={{ flex: 0.7, padding: "20px" }}>
          {current === 1 ? (
            <div style={{ display: "flex" }}>
              {/* Selection Bar */}
              <div style={{ flex: 0.3, marginRight: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <h3>Transportation Mode</h3>
                  <Radio.Group
                    value={transportMode}
                    onChange={(e) => {
                      setTransportMode(e.target.value);
                      if (e.target.value === "UAV") {
                        setRoutePreference("Fastest"); // Reset to Fastest for UAV
                      }
                    }}
                    style={{ marginBottom: 20 }}
                  >
                    <Radio.Button value="Robot">Robot</Radio.Button>
                    <Radio.Button value="UAV">UAV</Radio.Button>
                  </Radio.Group>
                </div>

                {transportMode === "Robot" && (
                  <div style={{ marginBottom: "20px" }}>
                    <h3>Route Preference</h3>
                    <Radio.Group
                      value={routePreference}
                      onChange={(e) => setRoutePreference(e.target.value)}
                    >
                      <Radio.Button value="Fastest">Fastest route</Radio.Button>
                      <Radio.Button value="Cheapest">Cheapest route</Radio.Button>
                    </Radio.Group>
                  </div>
                )}
              </div>

              {/* Map */}
              <div style={{ flex: 0.7 }}>
                <div
                  id="map"
                  style={{
                    width: "100%",
                    height: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                ></div>
                <div style={{ marginTop: "10px", fontSize: "16px" }}>{info}</div>
              </div>
            </div>
          ) : (
            <div>{steps[current].content}</div>
          )}
        </div>
      </Stack>
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