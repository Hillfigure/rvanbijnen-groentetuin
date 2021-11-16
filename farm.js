// Assumption: 1 crop: data passed as [] / more crops: data passed as {}
// Since test-data may not be altered, suspect it to be a fixed datascructure.
// Therefore did not prepare all functions to check for both instances, except where needed.

// DO NOT SET CROPFACTOR TO 0, USE "none" - (exception not handled)

const getYieldForPlant = (plant, factors) => {

    if (!plant.factors || !factors) {
        return plant.yield;
    } else {

        const percentages = [];
        const sunConditions = factors.sun;
        const windConditions = factors.wind;
        const soilConditions = factors.soil;
        const happyThoughtConditions = factors.happyThoughts;

        percentages.push(plant.yield);

        // Match and retrieve environment values if present.
        // Executes only if matching value is present.
        for (let value in plant.factors.sun){
            if(value == sunConditions) {
                percentages.push(Math.abs((plant.factors.sun[value] + 100 ) / 100));
            }
        }
        for (let value in plant.factors.wind){
            if(value == windConditions) {
                percentages.push(Math.abs((plant.factors.wind[value] + 100 ) / 100));
            }
        }
        for (let value in plant.factors.soil){
            if(value == soilConditions) {
                percentages.push(Math.abs((plant.factors.soil[value] + 100 ) / 100));
            }
        }
        for (let value in plant.factors.happyThoughts){
            if(value == happyThoughtConditions) {
                percentages.push(Math.abs((plant.factors.happyThoughts[value] + 100 ) / 100));
            }
        }
        return parseFloat(percentages.reduce((total, toMultiply) => total * toMultiply).toFixed(2));
    }
};

const getYieldForCrop = (crops, factors) => {
    if ('crop' in crops) {
        return getYieldForPlant(crops.crop, factors) * crops.numCrops;
    } 
    else if (!('crop' in crops)) {
        return getYieldForPlant(crops, factors) * crops.numCrops;
    }
};

const getTotalYield = (allCrops, factors) => {
    const yieldArray = [];
    for(let value of allCrops.crops){
        yieldArray.push(getYieldForPlant(value.crop, factors) * value.numCrops);
    }
    return yieldArray.reduce((total, toAdd) => total + toAdd);
};

const getCostsForCrop = crop => crop.costs * crop.numCrops;

const getRevenueForCrop = (crops, factors) => {
        return getYieldForCrop(crops, factors) * crops.revenue;
};

const getProfitForCrop = (crops, factors) => {
        return getRevenueForCrop(crops, factors) - getCostsForCrop(crops);
};

// Difference multiCrops{}/singleCrop[] : location of numCrops variable.
// numCrops copied to first dimension.
// Optionally clean up, or create new {}, but see no point here.

const getTotalProfit = (allCrops, factors) => {
    const costsArray = [];
    for(let value of allCrops.crops) {
        value.crop.numCrops = value.numCrops;
        costsArray.push(getProfitForCrop(value.crop, factors));
    } 
    return costsArray.reduce((total, toAdd) => total + toAdd);
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};
