const covid19ImpactEstimator = (data) => {
	let currentlyInfectedI = data.reportedCases * 10;
	let currentlyInfectedSevere = data.reportedCases * 50;
	let factor = Math.floor(data.timeToElapse/3);
	let infectionsByRequestedTimei = currentlyInfectedI * (Math.pow(2,factor));
	let infectionsByRequestedTimeSevere = currentlyInfectedSevere * (Math.pow(2,factor))

		let output = {
			data: data,
			impact: {
				currentlyInfected: currentlyInfectedI,
				infectionsByRequestedTime: infectionsByRequestedTimei,

        },
			severeImpact: {
				currentlyInfected: currentlyInfectedSevere,
				infectionsByRequestedTime: infectionsByRequestedTimeSevere,
        }
		}
	return output;

}


export default covid19ImpactEstimator;
