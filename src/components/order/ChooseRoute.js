import React, { useEffect } from "react";
// import {
//   LoadScript,
//   GoogleMap,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
import { Radio } from "antd";
import {
  geocodeAddress,
  calculateUAVDistance,
  createMapForUAV,
  createMapForRobot,
} from "../utils/GoogleMaps";

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

  useEffect(() => {
    const sender_id = form.getFieldValue("sender");
    const receiver_id = form.getFieldValue("receiver");
    const originText = contact.find((c) => c.address_id === sender_id).address;
    const destinationText = contact.find(
      (c) => c.address_id === receiver_id
    ).address;
    if (current === 1) {
      const geocoder = new window.google.maps.Geocoder();

      Promise.all([
        geocodeAddress(geocoder, originText),
        geocodeAddress(geocoder, destinationText),
      ])
        .then(([origin, destination]) => {
          if (transportMode === "UAV") {
            createMapForUAV("map", origin, destination);
            const distanceInMiles = calculateUAVDistance(origin, destination);
            const time = `${Math.round((distanceInMiles / 31.07) * 60)} mins`; // UAV speed = 31.07 mph
            setInfo(
              `Distance: ${distanceInMiles.toFixed(
                1
              )} mi, Estimated Time: ${time}`
            );
          } else {
            createMapForRobot("map", origin, destination, routePreference)
              .then(({ distance, duration }) => {
                setInfo(`Distance: ${distance}, Duration: ${duration}`);
              })
              .catch((error) => {
                console.error(error);
                setInfo(
                  "Failed to calculate route. Please check the addresses."
                );
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
          <div
            id="map"
            style={{
              width: "100%",
              height: "600px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          ></div>
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
