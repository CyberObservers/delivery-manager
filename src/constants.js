// Desc: Constants for the application

// actual server
export const BASE_URL = "http://127.0.0.1:5000";

// mock server
// export const BASE_URL =
//   "https://90cb5782-fd89-4680-87ad-2fbe0a99fff0.mock.pstmn.io";

// token key
export const TOKEN_KEY = "delivery-token";

// price per mile
export const price = {
  basicRobotPrice: 0.1,
  basicUAVPrice: 0.2,
  fragileCoefficient: 1.5,
  heavyCoefficient: 1.2,
  distanceUnder10Miles: 1,
  distanceUnder50Miles: 1.5,
  distanceUnder100Miles: 2,
  distanceOtherwise: 2.5,
};

export const UAVSpeed = 60; // miles per hour
