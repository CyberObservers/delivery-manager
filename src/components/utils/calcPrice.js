import { price } from "../../constants";

const calcPrice = (distance, weight, transportMode, fragile) => {
  let distanceInMiles = (distance / 1000) * 0.621371;
  const agentCoefficient =
    transportMode === "Robot" ? price.basicRobotPrice : price.basicUAVPrice;
  const distanceCoefficient =
    distanceInMiles < 10
      ? price.distanceUnder10Miles
      : distanceInMiles < 50
      ? price.distanceUnder50Miles
      : distanceInMiles < 100
      ? price.distanceUnder100Miles
      : price.distanceOtherwise;

  return (
    agentCoefficient *
    distanceCoefficient *
    distanceInMiles *
    (fragile ? price.fragileCoefficient : 1) *
    weight
  );
};

export default calcPrice;
