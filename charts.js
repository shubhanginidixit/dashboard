/**
 * Chart rendering for the WHO dementia dashboard.
 */

function initCharts() {
    if (!window.Chart || typeof dashboardData === 'undefined') return;

    const colors = {
        teal: '#087F78',
        blue: '#3182CE',
        coral: '#EF5B67',
        amber: '#E8A52D',
        sky: '#38A9D6',
        green: '#22A06B',
        muted: '#71808A'
    };

    const chartDefaults = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { usePointStyle: true } } }
    };

    function createChart(id, config) {
        const canvas = document.getElementById(id);
        if (canvas) new Chart(canvas, { ...config, options: { ...chartDefaults, ...config.options } });
    }

    function barData(labels, values, color) {
        return { labels, datasets: [{ data: values, backgroundColor: color, borderRadius: 4 }] };
    }

    createChart('chartOverviewPrevalence', {
        type: 'line',
        data: { labels: dashboardData.prevalenceProjections.years, datasets: [{ label: 'People living with dementia (millions)', data: dashboardData.prevalenceProjections.values, borderColor: colors.teal, backgroundColor: 'rgba(8,127,120,0.12)', fill: true, tension: 0.25 }] },
        options: { scales: { y: { beginAtZero: true, title: { display: true, text: 'Millions' } } } }
    });

    createChart('chartOverviewRegional', {
        type: 'bar',
        data: barData(dashboardData.regionalBurden.map(item => item.region), dashboardData.regionalBurden.map(item => item.count), colors.blue),
        options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, title: { display: true, text: 'Millions' } } } }
    });

    createChart('chartEpiProjection', {
        type: 'line',
        data: { labels: dashboardData.prevalenceProjections.years, datasets: [{ label: 'Projected prevalence', data: dashboardData.prevalenceProjections.values, borderColor: colors.blue, backgroundColor: 'rgba(49,130,206,0.12)', fill: true, tension: 0.25 }] },
        options: { scales: { y: { beginAtZero: true, title: { display: true, text: 'Millions' } } } }
    });

    createChart('chartEpiGender', {
        type: 'bar',
        data: barData(dashboardData.genderPrevalence.labels, dashboardData.genderPrevalence.percentages, [colors.coral, colors.blue]),
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Percent' } } } }
    });

    createChart('chartCostTrajectory', {
        type: 'bar',
        data: barData(dashboardData.economicCosts.categories, dashboardData.economicCosts.values, colors.blue),
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'USD trillions' } } } }
    });

    createChart('chartCostComposition', {
        type: 'doughnut',
        data: { labels: dashboardData.costComposition.labels, datasets: [{ data: dashboardData.costComposition.percentages, backgroundColor: [colors.teal, colors.blue, colors.amber] }] }
    });

    createChart('chartIncomeCostDistribution', {
        type: 'bar',
        data: { labels: dashboardData.incomeCostDistribution.map(item => item.group), datasets: [
            { label: 'Informal care', data: dashboardData.incomeCostDistribution.map(item => item.informal), backgroundColor: colors.coral },
            { label: 'Social care', data: dashboardData.incomeCostDistribution.map(item => item.social), backgroundColor: colors.blue },
            { label: 'Medical care', data: dashboardData.incomeCostDistribution.map(item => item.medical), backgroundColor: colors.teal }
        ] },
        options: { scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true, max: 100, title: { display: true, text: 'Percent' } } } }
    });

    const genericCharts = [
        ['chartCareGender', ['Women', 'Men'], [70, 30], 'Care hours (%)', colors.coral],
        ['chartCarerSupport', ['HIC', 'LMIC'], [75, 35], 'Countries with support (%)', colors.teal],
        ['chartDiagnosticRates', ['Median diagnostic coverage'], [48], 'Coverage (%)', colors.blue],
        ['chartProtocolsAccess', ['HIC', 'LMIC'], [80, 33], 'Guideline access (%)', colors.teal],
        ['chartResearchFunding', ['High-income countries', 'LMICs'], [90, 10], 'Research output (%)', colors.blue],
        ['chartInvolvementResearch', ['HICs', 'LMICs'], [62, 25], 'Participatory research (%)', colors.amber]
    ];

    genericCharts.forEach(([id, labels, values, label, color]) => {
        createChart(id, {
            type: 'bar',
            data: { labels, datasets: [{ label, data: values, backgroundColor: color, borderRadius: 4 }] },
            options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Percent' } } } }
        });
    });
}