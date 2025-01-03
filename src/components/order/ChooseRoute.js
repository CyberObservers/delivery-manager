import React, { useEffect } from "react";
// import {
//   LoadScript,
//   GoogleMap,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
import { Radio } from "antd";
import SharedMap from "../utils/SharedMap";

const ChooseRoute = (props) => {
  const {
    current,
    form,
    transportMode,
    setTransportMode,
    routePreference,
    setRoutePreference,
    info,
    setInfo,
    contact,
  } = props;

  // const [directions, setDirections] = useState(null);
  // const [origin, setOrigin] = useState(null);
  // const [destination, setDestination] = useState(null);
  

  return (
    <div style={{ flex: 0.7 }}>
      <div style={{ display: "flex" }}>
        {/* Selection Bar */}
        <div
          style={{
            flex: 0.3,
            marginRight: "20px",
            width: "100%",
          }}
        >
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
                <Radio.Button value="Fastest">Fastest</Radio.Button>
                <Radio.Button value="Cheapest">Cheapest</Radio.Button>
              </Radio.Group>
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ flex: 0.7 }}>
        <SharedMap
    sender={contact.find((c) => c.address_id === form.getFieldValue("sender"))}
    receiver={contact.find((c) => c.address_id === form.getFieldValue("receiver"))}
    transportMode={transportMode}
    routePreference={routePreference}
    setInfo={setInfo}
  />
          <div style={{ marginTop: "10px", fontSize: "16px" }}>{info}</div>
        </div>
        {/* <div style={{ flex: 0.7, height: "400px" }}>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "600px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
              center={origin}
              zoom={10}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div> */}
      </div>
    </div>
  );
};

export default ChooseRoute;
