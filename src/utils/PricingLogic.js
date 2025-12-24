export const PRICING_DATA = {
    design: {
        minimal: { price: 40000, time: 1, label: "Minimal (Template)", color: "bg-slate-200" },
        mid: { price: 150000, time: 3, label: "Mid-Range (Custom Motion)", color: "bg-blue-500" },
        high: { price: 400000, time: 7, label: "Luxury (WebGL/3D)", color: "bg-purple-600" }
    },
    database: {
        small: { setup: 20000, monthly: 2000, label: "<500 Users (Firebase)", color: "bg-green-400" },
        medium: { setup: 80000, monthly: 10000, label: "5k Users (AWS RDS)", color: "bg-green-600" },
        large: { setup: 250000, monthly: 50000, label: "10k+ Users (Enterprise)", color: "bg-green-800" }
    },
    testing: {
        basic: { price: 15000, label: "Happy Path", color: "bg-yellow-400" },
        standard: { price: 60000, label: "Integration", color: "bg-yellow-600" },
        extreme: { price: 150000, label: "Chaos/Security", color: "bg-red-600" }
    },
    marketing: {
        launch: { price: 40000, label: "Launch Pad", color: "bg-pink-400" },
        growth: { price: 150000, label: "Growth Strategy", color: "bg-pink-600" },
        dominance: { price: 500000, label: "Market Dominance", color: "bg-pink-800" }
    }
};

export const calculateQuote = (selections) => {
    let oneTimeCost = 0;
    let monthlyCost = 0;
    let timelineWeeks = 0;

    // Design
    if (selections.design && PRICING_DATA.design[selections.design]) {
        const item = PRICING_DATA.design[selections.design];
        oneTimeCost += item.price;
        timelineWeeks += item.time;
    }

    // Database
    if (selections.database && PRICING_DATA.database[selections.database]) {
        const item = PRICING_DATA.database[selections.database];
        oneTimeCost += item.setup;
        monthlyCost += item.monthly;
    }

    // Testing
    if (selections.testing && PRICING_DATA.testing[selections.testing]) {
        const item = PRICING_DATA.testing[selections.testing];
        oneTimeCost += item.price;
    }

    // Marketing
    if (selections.marketing && PRICING_DATA.marketing[selections.marketing]) {
        const item = PRICING_DATA.marketing[selections.marketing];
        oneTimeCost += item.price;
    }

    return { oneTimeCost, monthlyCost, timelineWeeks };
};
