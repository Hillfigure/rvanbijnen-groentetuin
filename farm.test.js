const { getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield, 
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
} = require("./farm");

describe("getYieldForPlant", () => {
    test("Get yield for plant without environment factors", () => {
        const cornNoEnvironmentFactors = {
            name: "magic beans",
            yield: 30,
        };
        expect(getYieldForPlant(cornNoEnvironmentFactors)).toBe(30);
    });
    
    test("Get yield for plant with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60
                },
                soil: {
                    clay: 30,
                    silty: -10
                }
            }
        };
        
        const environmentFactors = {
        sun: "low",
        wind: "medium",
        soil: "silty"
        };    
        expect(getYieldForPlant(corn, environmentFactors)).toBe(9.45);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60
                },
                soil: {
                    clay: 30
                }
            }
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium",
            soil: "clay"
        };   
        expect(getYieldForCrop(input, environmentFactors)).toBe(136.5);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60
                },
                soil: {
                    clay: 30
                }
            }
        };

        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                    low: -30,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -5,
                    high: -20
                },
                soil: {
                    clay: 40
                }
            }
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium",
            soil: "clay"
          };  

        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBe(75.69);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            soil: "clay"
        };  
        expect(getTotalYield({ crops }, environmentFactors)).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Calculate costs for 1 crop", () => {
        const corn = {
            name: "corn",
            costs: 1,
            numCrops: 20
        }
        expect(getCostsForCrop(corn)).toBe(20);
    });
});

describe("getRevenueForCrop", () => {
    test("Calculate revenue for 1 crop", () => {
        const corn = {
            name: "corn",
            yield: 30,
            revenue: 2,
            numCrops: 15,
            factors: {
                sun: {
                    low: -50,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60
                },
                soil: {
                    clay: 30
                }
            }
          };
         
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            soil: "clay"
        };    
        expect(getRevenueForCrop(corn, environmentFactors)).toBe(409.5);
    });
});

describe("getProfitForCrop", () => {
    test("Calculate profit for 1 crop", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costs: 1,
            revenue: 2,
            numCrops: 15,
            factors: {
                sun: {
                    low: -50,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60
                },
                soil: {
                    clay: 30
                }
            }
        };
         
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            soil: "clay"
        }; 
        expect(getProfitForCrop(corn, environmentFactors)).toBe(394.5);
    });

    test("Calculate profit for multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            revenue: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -30,
                    high: -60
                },
                soil: {
                    clay: 100
                }
            }
        };

        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            revenue: 5,
            factors: {
                sun: {
                    low: -30,
                    medium: 100,
                    high: 50,
                },
                wind: {
                    low: 100,
                    medium: -5,
                    high: -20
                },
                soil: {
                    clay: 100,
                    silty: -10,
                    sandy: "none"
                },
                happyThoughts: {
                    many: 100,
                    some: 15,
                    few: 5
                }
            }
        };
         
          
        const crops = [
            { crop: corn, numCrops: 20 },
            { crop: pumpkin, numCrops: 15 },
        ];

        const environmentFactors = {
            sun: "medium",
            wind: "low",
            soil: "clay",
            happyThoughts: "many"
        }; 
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(5710);
    });
});