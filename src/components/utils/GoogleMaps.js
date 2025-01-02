export const geocodeAddress = (geocoder, address) => {
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

export const calculateUAVDistance = (origin, destination) => {
  const distanceInMeters =
    window.google.maps.geometry.spherical.computeDistanceBetween(
      origin,
      destination
    );
  return distanceInMeters; // Convert meters to miles
};

export const createMapForUAV = (mapElementId, origin, destination) => {
  const map = new window.google.maps.Map(
    document.getElementById(mapElementId),
    {
      center: origin,
      zoom: 12,
    }
  );

  // Add markers
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

  // Draw a straight line
  const line = new window.google.maps.Polyline({
    path: [origin, destination],
    geodesic: true,
    strokeColor: "#4285F4",
    strokeOpacity: 0.7,
    strokeWeight: 5,
  });

  line.setMap(map);

  // Fit the map bounds
  const bounds = new window.google.maps.LatLngBounds();
  bounds.extend(origin);
  bounds.extend(destination);
  map.fitBounds(bounds);

  return map;
};

export const createMapForRobot = (
  mapElementId,
  origin,
  destination,
  routePreference
) => {
  const map = new window.google.maps.Map(
    document.getElementById(mapElementId),
    {
      center: origin,
      zoom: 12,
    }
  );

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

  return new Promise((resolve, reject) => {
    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);

        const route = result.routes[0].legs[0];
        resolve({
          distance: route.distance,
          duration: route.duration,
        });
        // console.log(route.distance);
        console.log(route.duration);
      } else {
        reject(`Directions request failed: ${status}`);
      }
    });
  });
};
