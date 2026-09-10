/**
 * Main Application Logic
 * Navigation, Filtering, Search, Simulator, and CSV Exports
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Initialize Charts
    initCharts();

    // Navigation Switcher
    setupNavigation();

    // Render GDO Table
    renderGDOTable(dashboardData.gdoCountries);

    // Setup GDO Table Filters
    setupGDOFilters();

    // Setup Risk Simulator Slider
    setupRiskSimulator();

    // Setup Global Search
    setupGlobalSearch();
});

// SECTION NAVIGATION
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');

            // Update Active Link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Active Section
            sections.forEach(s => {
                if (s.id === targetSection) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// GDO TABLE RENDERING & FILTERING
function renderGDOTable(data) {
    const tbody = document.getElementById('gdoTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: var(--muted-text);">No matching countries found in report dataset.</td></tr>`;
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td><span class="badge badge-blue">${item.region}</span></td>
            <td>${item.income}</td>
            <td><span class="status-pill status-green">${item.status}</span></td>
            <td>${item.plan}</td>
        `;
        tbody.appendChild(row);
    });
}

function setupGDOFilters() {
    const regionFilter = document.getElementById('filterRegion');
    const incomeFilter = document.getElementById('filterIncome');
    const textFilter = document.getElementById('filterCountryText');
    const btnClear = document.getElementById('btnClearFilters');
    const btnExport = document.getElementById('btnExportCSV');

    function applyFilters() {
        const regVal = regionFilter.value;
        const incVal = incomeFilter.value;
        const textVal = textFilter.value.toLowerCase().trim();

        const filtered = dashboardData.gdoCountries.filter(c => {
            const matchRegion = (regVal === 'ALL' || c.region === regVal);
            const matchIncome = (incVal === 'ALL' || c.income === incVal);
            const matchText = (textVal === '' || c.name.toLowerCase().includes(textVal));
            return matchRegion && matchIncome && matchText;
        });

        renderGDOTable(filtered);
    }

    if (regionFilter) regionFilter.addEventListener('change', applyFilters);
    if (incomeFilter) incomeFilter.addEventListener('change', applyFilters);
    if (textFilter) textFilter.addEventListener('input', applyFilters);

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            regionFilter.value = 'ALL';
            incomeFilter.value = 'ALL';
            textFilter.value = '';
            renderGDOTable(dashboardData.gdoCountries);
        });
    }

    if (btnExport) {
        btnExport.addEventListener('click', exportGDOCSV);
    }
}

// CSV EXPORT
function exportGDOCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Country,WHO Region,Income Group,GDO Status,National Plan\n";
    
    dashboardData.gdoCountries.forEach(c => {
        csvContent += `"${c.name}","${c.region}","${c.income}","${c.status}","${c.plan}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "WHO_GDO_Countries_Report_2021.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// RISK SIMULATOR SLIDER
function setupRiskSimulator() {
    const slider = document.getElementById('riskSlider');
    const valDisplay = document.getElementById('sliderValue');
    const resVal = document.getElementById('simResultValue');
    const resSub = document.getElementById('simResultSub');

    if (!slider) return;

    // Simulation table for delay in onset impact
    const delayImpactMap = {
        1: { reduction: "-9.5%", count: "13.2 Million" },
        2: { reduction: "-18.5%", count: "25.7 Million" },
        3: { reduction: "-26.8%", count: "37.2 Million" },
        4: { reduction: "-34.1%", count: "47.4 Million" },
        5: { reduction: "-41.0%", count: "57.0 Million" }
    };

    slider.addEventListener('input', (e) => {
        const years = e.target.value;
        valDisplay.textContent = `${years} Year${years > 1 ? 's' : ''}`;
        
        const impact = delayImpactMap[years];
        if (impact) {
            resVal.textContent = impact.reduction;
            resSub.textContent = `Approx. ${impact.count} fewer projected cases in 2050`;
        }
    });
}

// GLOBAL SEARCH
function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    const dropdown = document.getElementById('searchResults');

    if (!searchInput || !dropdown) return;

    const searchableItems = [
        { label: "Executive Overview", section: "overview" },
        { label: "Epidemiology & Global Burden", section: "epidemiology" },
        { label: "Societal Costs & Economic Impact", section: "societal-costs" },
        { label: "Informal Care & Gender Disparity", section: "informal-care" },
        { label: "Diagnosis & Health Systems Equity", section: "health-equity" },
        { label: "Risk Reduction & Prevention", section: "risk-reduction" },
        { label: "GDO Countries Table", section: "gdo-countries" },
        { label: "National Responses & 7 Action Areas", section: "national-responses" },
        { label: "Research & Innovation", section: "research-innovation" },
        { label: "India", section: "gdo-countries" },
        { label: "United States", section: "gdo-countries" },
        { label: "Prevalence Estimates (55.2M)", section: "overview" },
        { label: "Economic Cost ($1.3 Trillion)", section: "societal-costs" },
        { label: "Carer Support", section: "informal-care" }
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        dropdown.innerHTML = '';

        if (query.length < 2) {
            dropdown.classList.add('hidden');
            return;
        }

        const matches = searchableItems.filter(item => item.label.toLowerCase().includes(query));

        if (matches.length === 0) {
            dropdown.innerHTML = `<div class="search-result-item" style="color:var(--muted-text)">No results found</div>`;
        } else {
            matches.forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.textContent = item.label;
                div.addEventListener('click', () => {
                    const navLink = document.querySelector(`.nav-link[data-section="${item.section}"]`);
                    if (navLink) navLink.click();
                    dropdown.classList.add('hidden');
                    searchInput.value = '';
                });
                dropdown.appendChild(div);
            });
        }

        dropdown.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}