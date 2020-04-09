
function fetchData(){
    var myData = {};
    myData.population = document.querySelector('#population').value;
    myData.timeToElapse = document.querySelector('#time').value;
    myData.reportedCases = document.querySelector('#reported-cases').value;
    myData.totalHospitalBeds = document.querySelector("#total-hospital-bed").value;
    myData.periodType = document.querySelector("#period-type").value;
    covid19ImpactEstimator(myData);
}

function covid19ImpactEstimator(data) {
    var factor;
    var time = data.timeToElapse;
    var availableBeds = (data.totalHospitalBeds * (35 / 100));
    var impact = {
    };
    var severeImpact = {

    };
    if ((data.periodType) === 'days') {
        factor = Math.floor((time / 3));
    }
    else if ((data.periodType) === 'weeks') {
        factor = Math.floor(((7 * time) / 3));
    } else  {
        factor = Math.floor(((30 * time) / 3));
    }
    console.log(factor);
    impact.currentlyInfected = ((data.reportedCases) * 10);
    severeImpact.currentlyInfected = ((data.reportedCases) * 50);
    impact.infectionByRequestedTime = impact.currentlyInfected * (Math.pow(2, factor));
    severeImpact.infectionByRequestedTime = severeImpact.currentlyInfected * (Math.pow(2, factor));
    impact.severeCasesByRequestedTime = ((15 / 100) * impact.currentlyInfected);
    severeImpact.severeCasesByRequestedTime = ((15 / 100) * severeImpact.currentlyInfected);
    impact.hospitalBedsByRequestedTime = Math.floor((availableBeds - (impact.severeCasesByRequestedTime)));
    severeImpact.hospitalBedsByRequestedTime = Math.floor((availableBeds - (severeImpact.severeCasesByRequestedTime)));

    var output = {
        data,
        impact,
        severeImpact
    }
    console.log(output);
    return output;

}