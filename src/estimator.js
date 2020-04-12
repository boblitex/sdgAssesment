const covid19ImpactEstimator = (data) => {
  const currentlyInfectedI = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  switch (data.timeToElapse) {
    case "days":
      let factor = Math.floor(data.timeToElapse / 3);
      break;
    case "weeks":
      let factor = Math.floor((data.timeToElapse * 7) / 3);
      break;
    case "months":
      let factor = Math.floor((data.timeToElapse * 30) / 3);
      break;
  }

  const infectionsByRequestedTimei = currentlyInfectedI * (2 ** factor);
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * (2 ** factor);

  const output = {
    data,
    impact: {
      currentlyInfected: currentlyInfectedI,
      infectionsByRequestedTime: infectionsByRequestedTimei

    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRequestedTimeSevere
    }
  };
  return output;
};


export default covid19ImpactEstimator;
