/**
 * WHO Global Status Report on Dementia (2021) Dataset
 * Official verification against WHO Report (ISBN 978-92-4-003324-5)
 */

const dashboardData = {
    // 1. Regional Prevalence Data (2019)
    regionalBurden: [
        { region: "Western Pacific (WPRO)", count: 20.1 },
        { region: "European (EURO)", count: 14.1 },
        { region: "Americas (AMRO)", count: 10.3 },
        { region: "South-East Asia (SEARO)", count: 6.5 },
        { region: "Eastern Mediterranean (EMRO)", count: 2.3 },
        { region: "African (AFRO)", count: 1.9 }
    ],

    // 2. Global Prevalence Projections
    prevalenceProjections: {
        years: ["2019", "2030", "2050"],
        values: [55.2, 78.0, 139.0]
    },

    // 3. Gender Disparity Prevalence (Age >= 65)
    genderPrevalence: {
        labels: ["Women (≥65)", "Men (≥65)"],
        percentages: [8.1, 5.4]
    },

    // 4. Global Economic Costs (USD Trillions)
    economicCosts: {
        categories: ["2019 Actual", "2030 Baseline", "2030 Cost-Adjusted"],
        values: [1.3, 1.7, 2.8]
    },

    // 5. Cost Composition (2019 Baseline)
    costComposition: {
        labels: ["Informal Care", "Direct Social Care", "Direct Medical Care"],
        percentages: [50, 34, 16]
    },

    // 6. Cost Allocation by Income Group
    incomeCostDistribution: [
        { group: "High-Income (HIC)", informal: 40, social: 40, medical: 20 },
        { group: "Low/Middle-Income (LMIC)", informal: 65, social: 20, medical: 15 }
    ],

    // 7. GDO 62 Reporting Countries Sample Data
    gdoCountries: [
        { name: "Australia", region: "WPRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Austria", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Bangladesh", region: "SEARO", income: "LMIC", status: "Submitted", plan: "Integrated in NCD Strategy" },
        { name: "Brazil", region: "AMRO", income: "UMIC", status: "Submitted", plan: "Draft Strategy" },
        { name: "Canada", region: "AMRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Chile", region: "AMRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "China", region: "WPRO", income: "UMIC", status: "Submitted", plan: "Integrated Policy" },
        { name: "Costa Rica", region: "AMRO", income: "UMIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Denmark", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Ethiopia", region: "AFRO", income: "LIC", status: "Submitted", plan: "No Formal Plan" },
        { name: "Finland", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "France", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Germany", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Ghana", region: "AFRO", income: "LMIC", status: "Submitted", plan: "No Formal Plan" },
        { name: "India", region: "SEARO", income: "LMIC", status: "Submitted", plan: "Integrated in NCD Strategy" },
        { name: "Indonesia", region: "SEARO", income: "LMIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Italy", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Japan", region: "WPRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Jordan", region: "EMRO", income: "UMIC", status: "Submitted", plan: "Draft Strategy" },
        { name: "Kenya", region: "AFRO", income: "LMIC", status: "Submitted", plan: "No Formal Plan" },
        { name: "Mexico", region: "AMRO", income: "UMIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Netherlands", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Norway", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Peru", region: "AMRO", income: "UMIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Qatar", region: "EMRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Republic of Korea", region: "WPRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Saudi Arabia", region: "EMRO", income: "HIC", status: "Submitted", plan: "Draft Strategy" },
        { name: "Singapore", region: "WPRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "South Africa", region: "AFRO", income: "UMIC", status: "Submitted", plan: "Draft Strategy" },
        { name: "Spain", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Switzerland", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "Thailand", region: "SEARO", income: "UMIC", status: "Submitted", plan: "Integrated Policy" },
        { name: "United Kingdom", region: "EURO", income: "HIC", status: "Submitted", plan: "Standalone Plan" },
        { name: "United States", region: "AMRO", income: "HIC", status: "Submitted", plan: "Standalone Plan" }
    ]
};