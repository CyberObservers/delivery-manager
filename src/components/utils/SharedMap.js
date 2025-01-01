import React, { useEffect } from "react";
import {
  geocodeAddress,
  createMapForUAV,
  calculateUAVDistance,
  createMapForRobot,
} from "../utils/GoogleMaps";

const SharedMap = ({
  sender,
  receiver,
  transportMode,
  routePreference,
  setInfo,
}) => {
  useEffect(() => {
    if (sender && receiver) {
      const geocoder = new window.google.maps.Geocoder();
      const origin = `${sender.address_line_1}${
        sender.address_line_2 !== undefined ? " " + sender.address_line_2 : ""
      }`;
      const destination = `${receiver.address_line_1}${
        receiver.address_line_2 !== undefined
          ? " " + receiver.address_line_2
          : ""
      }`;

      console.log("origin:", origin);
      console.log("destination:", destination);

      Promise.all([
        geocodeAddress(geocoder, origin),
        geocodeAddress(geocoder, destination),
      ])
        .then(([origin, destination]) => {
          if (transportMode === "UAV") {
            createMapForUAV("map", origin, destination);
            const distanceInMiles = calculateUAVDistance(origin, destination);
            const time = `${Math.round((distanceInMiles / 31.07) * 60)} mins`; // UAV speed = 31.07 mph
            setInfo?.(
              `Distance: ${distanceInMiles.toFixed(
                1
              )} mi, Estimated Time: ${time}`
            );
          } else {
            createMapForRobot("map", origin, destination, routePreference)
              .then(({ distance, duration }) => {
                setInfo?.(`Distance: ${distance}, Duration: ${duration}`);
              })
              .catch((error) => {
                console.error(error);
                setInfo?.(
                  "Failed to calculate route. Please check the addresses."
                );
              });
          }
        })
        .catch((error) => {
          console.error(error);
          setInfo?.("Failed to geocode addresses.");
        });
    }
  }, [sender, receiver, transportMode, routePreference, setInfo]);

  return (
    <div
      id="map"
      style={{
        width: "95%",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginLeft: "10px",
      }}
    ></div>
  );
};

export default SharedMap;