const covid19ImpactEstimator = (data) => {
  const currentlyInfectedI = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  let factor;
  switch (data.periodType) {
    case 'days':
      factor = Math.trunc(data.timeToElapse / 3);
      break;
    case 'weeks':
      factor = Math.trunc((data.timeToElapse * 7) / 3);
      break;
    case 'months':
      factor = Math.trunc((data.timeToElapse * 30) / 3);
      break;
    default:
      factor = Math.floor(data.timeToElapse / 3);
  }

  const infectionsByRequestedTimei = currentlyInfectedI * (2 ** factor);
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * (2 ** factor);
  const severeCasesByRequestedTimei = Math.trunc(0.15 * infectionsByRequestedTimei);
  const severeCasesByRequestedTimeSevere = Math.trunc(0.15 * infectionsByRequestedTimeSevere);
  const hospitalBedsByRequestedTimei = Math.trunc((data.totalHospitalBeds * 0.35)
    - severeCasesByRequestedTimei);
  const hospitalBedsByRequestedTimeSevere = Math.trunc((data.totalHospitalBeds * 0.35)
    - severeCasesByRequestedTimeSevere);
  const icuCasesi = Math.trunc(infectionsByRequestedTimei * 0.05);
  const icuCasesSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.05);
  const ventilatorCasei = Math.trunc(infectionsByRequestedTimei * 0.02);
  const ventilatorCaseSevere = Math.trunc(infectionsByRequestedTimeSevere * 0.02);
  const dollarLosti = Math.trunc((infectionsByRequestedTimei * 0.65 * data.avgDailyIncomeInUSD)
    / data.timeToElapse);
  const dollarLostSevere = Math.trunc((infectionsByRequestedTimeSevere
    * 0.65 * data.avgDailyIncomeInUSD)
    / data.timeToElapse);

  const output = {
    data,
    impact: {
      currentlyInfected: currentlyInfectedI,
      infectionsByRequestedTime: infectionsByRequestedTimei,
      severeCasesByRequestedTime: severeCasesByRequestedTimei,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimei,
      casesForICUByRequestedTime: icuCasesi,
      casesForVentilatorsByRequestedTime: ventilatorCasei,
      dollarsInFlight: dollarLosti
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRequestedTimeSevere,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevere,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevere,
      casesForICUByRequestedTime: icuCasesSevere,
      casesForVentilatorsByRequestedTime: ventilatorCaseSevere,
      dollarsInFlight: dollarLostSevere
    }
  };
  return output;
};


export default covid19ImpactEstimator;
