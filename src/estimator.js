const covid19ImpactEstimator = (data) => {
  const currentlyInfectedI = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  const factor = Math.floor(data.timeToElapse / 3);
  const infectionsByRequestedTimei = currentlyInfectedI * (2 ** factor);
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * (2 ** factor);

  const output = {
    data: data,
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
