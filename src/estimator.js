const covid19ImpactEstimator = (data) => {
  const currentlyInfectedI = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  let factor;
  switch (data.periodType) {
    case 'days':
      factor = Math.floor(data.timeToElapse / 3);
      break;
    case 'weeks':
      factor = Math.floor((data.timeToElapse * 7) / 3);
      break;
    case 'months':
      factor = Math.floor((data.timeToElapse * 30) / 3);
      break;
    default:
      factor = Math.floor(data.timeToElapse / 3);
  }

  const infectionsByRequestedTimei = currentlyInfectedI * (2 ** factor);
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * (2 ** factor);
  const severeCasesByRequestedTimei = Math.floor(0.15 * infectionsByRequestedTimei);
  const severeCasesByRequestedTimeSevere = Math.floor(0.15 * infectionsByRequestedTimeSevere);
  const hospitalBedsByRequestedTimei = (Math.round(data.totalHospitalBeds * 0.35)) - severeCasesByRequestedTimei;
  const hospitalBedsByRequestedTimeSevere = (Math.round(data.totalHospitalBeds)) - severeCasesByRequestedTimeSevere;




  const output = {
    data,
    impact: {
      currentlyInfected: currentlyInfectedI,
      infectionsByRequestedTime: infectionsByRequestedTimei,
      severeCasesByRequestedTime: severeCasesByRequestedTimei,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimei
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRequestedTimeSevere,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevere,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevere
    }
  };
  return output;
};


export default covid19ImpactEstimator;
