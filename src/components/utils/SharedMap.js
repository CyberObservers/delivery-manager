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
  info,
  setInfo,
  setDistance,
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

      Promise.all([
        geocodeAddress(geocoder, origin),
        geocodeAddress(geocoder, destination),
      ])
        .then(([origin, destination]) => {
          if (transportMode === "UAV") {
            createMapForUAV("map", origin, destination);
            const distanceInMeters = calculateUAVDistance(origin, destination);
            setDistance?.(distanceInMeters);
            const distanceInMiles = (distanceInMeters / 1000) * 0.621371;
            const time = `${Math.round((distanceInMiles / 31.07) * 60)} mins`; // UAV speed = 31.07 mph
            setInfo?.({
              ...info,
              distance: Number(distanceInMiles),
              duration: Math.round((distanceInMiles / 60) * 60),
            });
          } else {
            createMapForRobot("map", origin, destination, routePreference)
              .then(({ distance, duration }) => {
                setDistance?.(distance.value);
                // `Distance: ${distance.text}, Duration: ${duration}`
                setInfo?.({
                  distance: (distance.value / 1000) * 0.621371, // meter
                  duration: duration.value / 60, // seconds
                });
              })
              .catch((error) => {
                console.error(error);
                setInfo?.({
                  ...info,
                  distance: -1,
                  duration: -1,
                  message: "Failed to calculate route.",
                });
              });
          }
        })
        .catch((error) => {
          console.error(error);
          setInfo?.("Failed to geocode addresses.");
        });
    }
  }, [sender, receiver, transportMode, routePreference, setInfo, setDistance]);

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
