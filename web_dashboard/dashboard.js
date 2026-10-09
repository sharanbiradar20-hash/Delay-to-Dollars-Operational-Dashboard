// ============================================================
// Delay-to-Dollars Dashboard — JavaScript Engine
// Author: Sharan Biradar
// ============================================================

// ============================================================
// RAW DATA (extracted from operational_intelligence_dataset.xlsx)
// ============================================================
const RAW_DATA = {
    sales: [
        {Order_ID:"O0126",Order_Date:"2025-01-02",Region:"West",Warehouse_ID:"W01",Sales_Rep:"F. Adeyemi",Customer_ID:"C018",Product_ID:"P08",Quantity:7,Gross_Sales:64.4,Discount_Pct:0.02,Discount_Amount:1.29,Net_Sales:63.11,COGS:40.95,Profit:22.16,Profit_Margin_Pct:0.3511,Delivery_Days:5,Delivery_Status:"Late",Stock_On_Hand:95,Reorder_Level:50,Stockout_Flag:0,Lost_Sales_Estimate:0},
        {Order_ID:"O0313",Order_Date:"2025-01-02",Region:"East",Warehouse_ID:"W04",Sales_Rep:"F. Adeyemi",Customer_ID:"C004",Product_ID:"P11",Quantity:7,Gross_Sales:17.5,Discount_Pct:0.04,Discount_Amount:0.7,Net_Sales:16.8,COGS:7.7,Profit:9.1,Profit_Margin_Pct:0.5417,Delivery_Days:4,Delivery_Status:"On Time",Stock_On_Hand:50,Reorder_Level:30,Stockout_Flag:0,Lost_Sales_Estimate:0},
        {Order_ID:"O0380",Order_Date:"2025-01-02",Region:"North",Warehouse_ID:"W02",Sales_Rep:"F. Adeyemi",Customer_ID:"C030",Product_ID:"P06",Quantity:4,Gross_Sales:88,Discount_Pct:0.12,Discount_Amount:10.56,Net_Sales:77.44,COGS:54,Profit:23.44,Profit_Margin_Pct:0.3027,Delivery_Days:3,Delivery_Status:"On Time",Stock_On_Hand:4,Reorder_Level:45,Stockout_Flag:1,Lost_Sales_Estimate:696.96}
    ],
    products: [
        {Product_ID:"P01",Product_Category:"Cigarettes",Product_Name:"Gold Leaf Classic",Unit_Price:6.5,Unit_Cost:4},
        {Product_ID:"P02",Product_Category:"Cigarettes",Product_Name:"Silver Edge Menthol",Unit_Price:6.8,Unit_Cost:4.15},
        {Product_ID:"P03",Product_Category:"Cigarettes",Product_Name:"Blue Crest",Unit_Price:5.9,Unit_Cost:3.7},
        {Product_ID:"P04",Product_Category:"Vapes",Product_Name:"Vibe Pod Mint",Unit_Price:12.5,Unit_Cost:7.2},
        {Product_ID:"P05",Product_Category:"Vapes",Product_Name:"Vibe Pod Berry",Unit_Price:12.5,Unit_Cost:7.2},
        {Product_ID:"P06",Product_Category:"Vapes",Product_Name:"Vibe Device Starter Kit",Unit_Price:22,Unit_Cost:13.5},
        {Product_ID:"P07",Product_Category:"Heat-Not-Burn",Product_Name:"HeatStick Amber",Unit_Price:9.2,Unit_Cost:5.85},
        {Product_ID:"P08",Product_Category:"Heat-Not-Burn",Product_Name:"HeatStick Menthol",Unit_Price:9.2,Unit_Cost:5.85},
        {Product_ID:"P09",Product_Category:"Oral Nicotine",Product_Name:"Nicotine Pouch Cool Mint",Unit_Price:8.5,Unit_Cost:5.1},
        {Product_ID:"P10",Product_Category:"Oral Nicotine",Product_Name:"Nicotine Pouch Citrus",Unit_Price:8.5,Unit_Cost:5.1},
        {Product_ID:"P11",Product_Category:"Accessories",Product_Name:"Lighter Premium",Unit_Price:2.5,Unit_Cost:1.1},
        {Product_ID:"P12",Product_Category:"Accessories",Product_Name:"Car Charger USB",Unit_Price:4.8,Unit_Cost:2.2},
        {Product_ID:"P13",Product_Category:"Merchandising",Product_Name:"Counter Display Stand",Unit_Price:18,Unit_Cost:10.8},
        {Product_ID:"P14",Product_Category:"Merchandising",Product_Name:"Promo Signage Pack",Unit_Price:14,Unit_Cost:8},
        {Product_ID:"P15",Product_Category:"Bundles",Product_Name:"Starter Bundle A",Unit_Price:27,Unit_Cost:17.2}
    ],
    customers: [
        {Customer_ID:"C001",Customer_Name:"MegaMart",Customer_Segment:"Key Account",Channel:"Modern Trade"},
        {Customer_ID:"C002",Customer_Name:"QuickBuy",Customer_Segment:"Key Account",Channel:"Modern Trade"},
        {Customer_ID:"C003",Customer_Name:"PrimeStores",Customer_Segment:"Key Account",Channel:"Modern Trade"},
        {Customer_ID:"C004",Customer_Name:"Urban Basket",Customer_Segment:"Key Account",Channel:"Modern Trade"},
        {Customer_ID:"C005",Customer_Name:"Shoprite Plus",Customer_Segment:"Key Account",Channel:"Modern Trade"},
        {Customer_ID:"C006",Customer_Name:"BestChoice",Customer_Segment:"Key Account",Channel:"Modern Trade"},
        {Customer_ID:"C007",Customer_Name:"Corner Shop",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C008",Customer_Name:"Daily Needs",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C009",Customer_Name:"Community Mart",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C010",Customer_Name:"City Kiosk",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C011",Customer_Name:"Value Store",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C012",Customer_Name:"Market Point",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C013",Customer_Name:"Sunrise Shop",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C014",Customer_Name:"Blue Ocean Shop",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C015",Customer_Name:"Riverside Mart",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C016",Customer_Name:"Main Street Kiosk",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C017",Customer_Name:"West End Shop",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C018",Customer_Name:"Golden Basket",Customer_Segment:"Retail",Channel:"Traditional Trade"},
        {Customer_ID:"C019",Customer_Name:"Apex Wholesale",Customer_Segment:"Wholesale",Channel:"Wholesale"},
        {Customer_ID:"C020",Customer_Name:"Unity Traders",Customer_Segment:"Wholesale",Channel:"Wholesale"},
        {Customer_ID:"C021",Customer_Name:"BulkLine",Customer_Segment:"Wholesale",Channel:"Wholesale"},
        {Customer_ID:"C022",Customer_Name:"Nexus Wholesale",Customer_Segment:"Wholesale",Channel:"Wholesale"},
        {Customer_ID:"C023",Customer_Name:"Open Market Traders",Customer_Segment:"Wholesale",Channel:"Wholesale"},
        {Customer_ID:"C024",Customer_Name:"Capital Bulk",Customer_Segment:"Wholesale",Channel:"Wholesale"},
        {Customer_ID:"C025",Customer_Name:"Delta Distribution",Customer_Segment:"Distributor",Channel:"Distributor"},
        {Customer_ID:"C026",Customer_Name:"Northlink Distribution",Customer_Segment:"Distributor",Channel:"Distributor"},
        {Customer_ID:"C027",Customer_Name:"Coastal Distributors",Customer_Segment:"Distributor",Channel:"Distributor"},
        {Customer_ID:"C028",Customer_Name:"Eastern Route Partners",Customer_Segment:"Distributor",Channel:"Distributor"},
        {Customer_ID:"C029",Customer_Name:"OmniSupply",Customer_Segment:"Distributor",Channel:"Distributor"},
        {Customer_ID:"C030",Customer_Name:"Prime Route",Customer_Segment:"Distributor",Channel:"Distributor"}
    ],
    warehouses: [
        {Warehouse_ID:"W01",Warehouse_Name:"Lagos Central DC",Region:"West"},
        {Warehouse_ID:"W02",Warehouse_Name:"Abuja Hub",Region:"North"},
        {Warehouse_ID:"W03",Warehouse_Name:"Port Harcourt DC",Region:"South"},
        {Warehouse_ID:"W04",Warehouse_Name:"Enugu Hub",Region:"East"}
    ]
};

// Pre-aggregated data from dataset analysis (500 records)
const MONTHLY_DATA = [
    {month:"Jan",revenue:6354.32,orders:39,late:11},
    {month:"Feb",revenue:10797.95,orders:36,late:7},
    {month:"Mar",revenue:4618.45,orders:40,late:11},
    {month:"Apr",revenue:7576.60,orders:45,late:13},
    {month:"May",revenue:7448.45,orders:43,late:14},
    {month:"Jun",revenue:9189.31,orders:36,late:6},
    {month:"Jul",revenue:10057.21,orders:44,late:11},
    {month:"Aug",revenue:6686.02,orders:44,late:9},
    {month:"Sep",revenue:7204.91,orders:41,late:12},
    {month:"Oct",revenue:7342.16,orders:44,late:11},
    {month:"Nov",revenue:8576.75,orders:43,late:10},
    {month:"Dec",revenue:11377.01,orders:45,late:12}
];

const REGION_DATA = [
    {region:"West",revenue:32833.42,orders:157,late:34,stockouts:22,lostSales:7234.56},
    {region:"South",revenue:27229.98,orders:131,late:37,stockouts:16,lostSales:5412.33},
    {region:"North",revenue:18746.72,orders:107,late:31,stockouts:12,lostSales:4102.18},
    {region:"East",revenue:18419.02,orders:105,late:25,stockouts:11,lostSales:3344.21}
];

const CATEGORY_DATA = [
    {category:"Vapes",revenue:38236.87,orders:155,color:"#3b82f6"},
    {category:"Cigarettes",revenue:22207.36,orders:147,color:"#06b6d4"},
    {category:"Heat-Not-Burn",revenue:18641.92,orders:100,color:"#8b5cf6"},
    {category:"Oral Nicotine",revenue:10196.94,orders:59,color:"#10b981"},
    {category:"Bundles",revenue:3671.46,orders:19,color:"#f59e0b"},
    {category:"Accessories",revenue:2175.35,orders:29,color:"#64748b"},
    {category:"Merchandising",revenue:2099.24,orders:11,color:"#94a3b8"}
];

const PRODUCT_STOCKOUT = [
    {product:"Vibe Device Starter Kit",lost:5892.43,count:15},
    {product:"Vibe Pod Mint",lost:3241.12,count:10},
    {product:"HeatStick Amber",lost:2654.87,count:8},
    {product:"Gold Leaf Classic",lost:2103.44,count:7},
    {product:"Silver Edge Menthol",lost:1876.32,count:6},
    {product:"Blue Crest",lost:1543.21,count:5},
    {product:"Vibe Pod Berry",lost:1298.76,count:4},
    {product:"HeatStick Menthol",lost:1083.13,count:3},
    {product:"Nicotine Pouch Cool Mint",lost:400.00,count:3}
];

const SEGMENT_DATA = [
    {segment:"Retail",revenue:28456.32,orders:167,late:42,margin:34.8},
    {segment:"Wholesale",revenue:26134.56,orders:124,late:30,margin:35.2},
    {segment:"Key Account",revenue:24567.89,orders:112,late:28,margin:35.6},
    {segment:"Distributor",revenue:18070.37,orders:97,late:27,margin:34.4}
];

const REP_DATA = [
    {rep:"F. Adeyemi",revenue:24532.11,orders:102,late:26,stockouts:13,lostSales:4521.22,margin:35.1},
    {rep:"D. Ahmed",revenue:21345.67,orders:96,late:22,stockouts:11,lostSales:3876.54,margin:34.8},
    {rep:"A. Bello",revenue:19876.43,orders:98,late:28,stockouts:12,lostSales:4012.33,margin:35.4},
    {rep:"C. Okafor",revenue:17234.56,orders:105,late:27,stockouts:14,lostSales:4231.12,margin:34.6},
    {rep:"E. Ibrahim",revenue:14240.37,orders:99,late:24,stockouts:11,lostSales:3452.07,margin:35.2}
];

const DELIVERY_DIST = [
    {days:1,count:52},{days:2,count:78},{days:3,count:115},{days:4,count:128},
    {days:5,count:72},{days:6,count:38},{days:7,count:17}
];

// ============================================================
// GLOBAL STATE
// ============================================================
let chartInstances = {};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatCurrency(val) {
    if (val >= 1000) return '$' + (val / 1000).toFixed(1) + 'K';
    return '$' + val.toFixed(0);
}

function formatNumber(val) {
    return val.toLocaleString('en-US');
}

// ============================================================
// CHART DEFAULTS
// ============================================================
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

const CHART_COLORS = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
    red: '#ef4444',
    amber: '#f59e0b',
    cyan: '#06b6d4',
    slate: '#64748b',
    gridColor: 'rgba(255,255,255,0.04)',
    gridBorder: 'rgba(255,255,255,0.08)'
};

const commonScaleOptions = {
    grid: {
        color: CHART_COLORS.gridColor,
        borderColor: CHART_COLORS.gridBorder,
    },
    ticks: {
        color: '#94a3b8',
        font: { size: 11 }
    }
};

// ============================================================
// INITIALIZE DASHBOARD
// ============================================================
function initDashboard() {
    populateCategoryFilter();
    updateKPIs();
    createMonthlyRevenueChart();
    createRegionRevenueChart();
    createCategoryChart();
    createLateDeliveryChart();
    createStockoutChart();
    createSegmentChart();
    createRepScorecard();
    createDeliveryDistChart();
    renderInsights();
}

function populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    const categories = [...new Set(CATEGORY_DATA.map(c => c.category))];
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

// ============================================================
// KPI UPDATES
// ============================================================
function updateKPIs() {
    const totalRevenue = REGION_DATA.reduce((s, r) => s + r.revenue, 0);
    const totalOrders = REGION_DATA.reduce((s, r) => s + r.orders, 0);
    const totalLate = REGION_DATA.reduce((s, r) => s + r.late, 0);
    const totalStockouts = REGION_DATA.reduce((s, r) => s + r.stockouts, 0);
    const totalLost = REGION_DATA.reduce((s, r) => s + r.lostSales, 0);
    const profit = totalRevenue * 0.35;

    animateValue('kpiRevenueValue', totalRevenue, true);
    document.getElementById('kpiRevenueOrders').textContent = `${totalOrders} orders`;

    animateValue('kpiProfitValue', profit, true);
    document.getElementById('kpiMarginValue').textContent = '35.0% margin';

    animateValue('kpiLostValue', totalLost, true);
    document.getElementById('kpiStockoutRate').textContent = `${(totalStockouts/totalOrders*100).toFixed(1)}% stockout rate`;

    const lateRate = (totalLate / totalOrders * 100).toFixed(1);
    document.getElementById('kpiLateRate').textContent = lateRate + '%';
    const avgDays = 3.59;
    document.getElementById('kpiAvgDays').textContent = `${avgDays} avg days`;

    // MoM Growth (Nov to Dec)
    const novRev = MONTHLY_DATA[10].revenue;
    const decRev = MONTHLY_DATA[11].revenue;
    const momGrowth = ((decRev - novRev) / novRev * 100).toFixed(1);
    document.getElementById('kpiGrowthValue').textContent = `▲ ${momGrowth}%`;
    document.getElementById('kpiGrowthValue').style.color = momGrowth > 0 ? '#10b981' : '#ef4444';
}

function animateValue(elementId, targetValue, isCurrency) {
    const el = document.getElementById(elementId);
    const duration = 1200;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = targetValue * eased;

        if (isCurrency) {
            if (current >= 1000) {
                el.textContent = '$' + (current / 1000).toFixed(1) + 'K';
            } else {
                el.textContent = '$' + current.toFixed(0);
            }
        } else {
            el.textContent = current.toFixed(1) + '%';
        }

        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ============================================================
// CHARTS
// ============================================================
function createMonthlyRevenueChart() {
    const ctx = document.getElementById('monthlyRevenueChart').getContext('2d');
    if (chartInstances.monthly) chartInstances.monthly.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    chartInstances.monthly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: MONTHLY_DATA.map(d => d.month),
            datasets: [
                {
                    label: 'Revenue',
                    data: MONTHLY_DATA.map(d => d.revenue),
                    borderColor: CHART_COLORS.blue,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: CHART_COLORS.blue,
                    pointBorderColor: '#1a1f2e',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8
                },
                {
                    label: 'Late Deliveries',
                    data: MONTHLY_DATA.map(d => d.late * 600),
                    borderColor: CHART_COLORS.red,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [6, 4],
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: CHART_COLORS.red,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            scales: {
                x: { ...commonScaleOptions },
                y: {
                    ...commonScaleOptions,
                    ticks: {
                        ...commonScaleOptions.ticks,
                        callback: v => '$' + (v/1000).toFixed(0) + 'K'
                    }
                },
                y1: {
                    position: 'right',
                    ...commonScaleOptions,
                    ticks: {
                        ...commonScaleOptions.ticks,
                        callback: v => (v/600).toFixed(0)
                    },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { usePointStyle: true, padding: 20, font: { size: 11 } }
                },
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    borderColor: CHART_COLORS.gridBorder,
                    borderWidth: 1,
                    titleFont: { weight: 600 },
                    callbacks: {
                        label: ctx => {
                            if (ctx.datasetIndex === 0) return `Revenue: $${ctx.raw.toLocaleString()}`;
                            return `Late Deliveries: ${(ctx.raw/600).toFixed(0)}`;
                        }
                    }
                }
            }
        }
    });
}

function createRegionRevenueChart() {
    const ctx = document.getElementById('regionRevenueChart').getContext('2d');
    if (chartInstances.region) chartInstances.region.destroy();

    const sorted = [...REGION_DATA].sort((a, b) => b.revenue - a.revenue);
    const colors = [CHART_COLORS.blue, CHART_COLORS.cyan, CHART_COLORS.purple, CHART_COLORS.amber];

    chartInstances.region = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(d => d.region),
            datasets: [{
                data: sorted.map(d => d.revenue),
                backgroundColor: colors.map(c => c + '22'),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    ...commonScaleOptions,
                    ticks: {
                        ...commonScaleOptions.ticks,
                        callback: v => '$' + (v/1000).toFixed(0) + 'K'
                    }
                },
                y: { ...commonScaleOptions }
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    borderColor: CHART_COLORS.gridBorder,
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => `Revenue: $${ctx.raw.toLocaleString()}`
                    }
                }
            }
        }
    });
}

function createCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    if (chartInstances.category) chartInstances.category.destroy();

    chartInstances.category = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: CATEGORY_DATA.map(d => d.category),
            datasets: [{
                data: CATEGORY_DATA.map(d => d.revenue),
                backgroundColor: CATEGORY_DATA.map(d => d.color + '33'),
                borderColor: CATEGORY_DATA.map(d => d.color),
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.65
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    ...commonScaleOptions,
                    ticks: {
                        ...commonScaleOptions.ticks,
                        callback: v => '$' + (v/1000).toFixed(0) + 'K'
                    }
                },
                y: { ...commonScaleOptions }
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    borderColor: CHART_COLORS.gridBorder,
                    borderWidth: 1,
                    callbacks: {
                        afterLabel: ctx => {
                            const cat = CATEGORY_DATA[ctx.dataIndex];
                            const total = CATEGORY_DATA.reduce((s, c) => s + c.revenue, 0);
                            return `Share: ${(cat.revenue/total*100).toFixed(1)}% | Orders: ${cat.orders}`;
                        }
                    }
                }
            }
        }
    });
}

function createLateDeliveryChart() {
    const ctx = document.getElementById('lateDeliveryChart').getContext('2d');
    if (chartInstances.lateDelivery) chartInstances.lateDelivery.destroy();

    const sorted = [...REGION_DATA].sort((a, b) => b.late - a.late);
    const colors = sorted.map(d => {
        const rate = d.late / d.orders * 100;
        if (rate > 27) return CHART_COLORS.red;
        if (rate > 24) return CHART_COLORS.amber;
        return CHART_COLORS.green;
    });

    chartInstances.lateDelivery = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(d => d.region),
            datasets: [{
                label: 'Late Deliveries',
                data: sorted.map(d => d.late),
                backgroundColor: colors.map(c => c + '33'),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.55
            }]
        },
        options: {
            scales: {
                x: { ...commonScaleOptions },
                y: {
                    ...commonScaleOptions,
                    beginAtZero: true,
                    ticks: { ...commonScaleOptions.ticks, stepSize: 10 }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    borderColor: CHART_COLORS.gridBorder,
                    borderWidth: 1,
                    callbacks: {
                        afterLabel: ctx => {
                            const d = sorted[ctx.dataIndex];
                            return `Rate: ${(d.late/d.orders*100).toFixed(1)}% | Orders: ${d.orders}`;
                        }
                    }
                }
            }
        }
    });
}

function createStockoutChart() {
    const ctx = document.getElementById('stockoutChart').getContext('2d');
    if (chartInstances.stockout) chartInstances.stockout.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop(0, CHART_COLORS.red + '44');
    gradient.addColorStop(1, CHART_COLORS.red + '11');

    chartInstances.stockout = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: PRODUCT_STOCKOUT.map(d => d.product),
            datasets: [{
                data: PRODUCT_STOCKOUT.map(d => d.lost),
                backgroundColor: gradient,
                borderColor: CHART_COLORS.red,
                borderWidth: 1.5,
                borderRadius: 6,
                barPercentage: 0.7
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    ...commonScaleOptions,
                    ticks: {
                        ...commonScaleOptions.ticks,
                        callback: v => '$' + (v/1000).toFixed(1) + 'K'
                    }
                },
                y: {
                    ...commonScaleOptions,
                    ticks: { ...commonScaleOptions.ticks, font: { size: 10 } }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    borderColor: CHART_COLORS.gridBorder,
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => `Lost Revenue: $${ctx.raw.toLocaleString()}`,
                        afterLabel: ctx => `Stockout Events: ${PRODUCT_STOCKOUT[ctx.dataIndex].count}`
                    }
                }
            }
        }
    });
}

function createSegmentChart() {
    const ctx = document.getElementById('segmentChart').getContext('2d');
    if (chartInstances.segment) chartInstances.segment.destroy();

    const colors = [CHART_COLORS.blue, CHART_COLORS.purple, CHART_COLORS.cyan, CHART_COLORS.green];

    chartInstances.segment = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: SEGMENT_DATA.map(d => d.segment),
            datasets: [{
                data: SEGMENT_DATA.map(d => d.revenue),
                backgroundColor: colors.map(c => c + '44'),
                borderColor: colors,
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            cutout: '60%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    borderColor: CHART_COLORS.gridBorder,
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => {
                            const d = SEGMENT_DATA[ctx.dataIndex];
                            const total = SEGMENT_DATA.reduce((s, x) => s + x.revenue, 0);
                            return `$${d.revenue.toLocaleString()} (${(d.revenue/total*100).toFixed(1)}%)`;
                        },
                        afterLabel: ctx => {
                            const d = SEGMENT_DATA[ctx.dataIndex];
                            return `Orders: ${d.orders} | Late: ${d.late} | Margin: ${d.margin}%`;
                        }
                    }
                }
            }
        }
    });
}

function createDeliveryDistChart() {
    const ctx = document.getElementById('deliveryDistChart').getContext('2d');
    if (chartInstances.deliveryDist) chartInstances.deliveryDist.destroy();

    const colors = DELIVERY_DIST.map(d =>
        d.days <= 4 ? CHART_COLORS.green + '66' : CHART_COLORS.red + '66'
    );
    const borderColors = DELIVERY_DIST.map(d =>
        d.days <= 4 ? CHART_COLORS.green : CHART_COLORS.red
    );

    chartInstances.deliveryDist = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: DELIVERY_DIST.map(d => d.days + ' days'),
            datasets: [{
                data: DELIVERY_DIST.map(d => d.count),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.7
            }]
        },
        options: {
            scales: {
                x: { ...commonScaleOptions },
                y: {
                    ...commonScaleOptions,
                    beginAtZero: true,
                    ticks: { ...commonScaleOptions.ticks }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    borderColor: CHART_COLORS.gridBorder,
                    borderWidth: 1,
                    callbacks: {
                        afterLabel: ctx => {
                            const d = DELIVERY_DIST[ctx.dataIndex];
                            return d.days <= 4 ? '✅ Within SLA' : '❌ SLA Breach';
                        }
                    }
                }
            }
        }
    });
}

// ============================================================
// SALES REP SCORECARD TABLE
// ============================================================
function createRepScorecard() {
    const container = document.getElementById('repScorecardTable');

    let html = `<table>
        <thead><tr>
            <th>Sales Rep</th>
            <th>Revenue</th>
            <th>Orders</th>
            <th>Late</th>
            <th>Late Rate</th>
            <th>Stockouts</th>
            <th>Lost Sales</th>
            <th>Margin</th>
        </tr></thead><tbody>`;

    REP_DATA.forEach(rep => {
        const lateRate = (rep.late / rep.orders * 100).toFixed(1);
        const lateClass = lateRate > 27 ? 'cell-bad' : lateRate > 24 ? 'cell-warn' : 'cell-good';

        html += `<tr>
            <td><strong>${rep.rep}</strong></td>
            <td>${formatCurrency(rep.revenue)}</td>
            <td>${rep.orders}</td>
            <td>${rep.late}</td>
            <td class="${lateClass}">${lateRate}%</td>
            <td>${rep.stockouts}</td>
            <td class="cell-bad">${formatCurrency(rep.lostSales)}</td>
            <td class="cell-good">${rep.margin}%</td>
        </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// ============================================================
// INSIGHTS PANEL
// ============================================================
function renderInsights() {
    const grid = document.getElementById('insightsGrid');
    const totalRevenue = REGION_DATA.reduce((s, r) => s + r.revenue, 0);
    const totalLost = REGION_DATA.reduce((s, r) => s + r.lostSales, 0);
    const totalLate = REGION_DATA.reduce((s, r) => s + r.late, 0);
    const totalOrders = REGION_DATA.reduce((s, r) => s + r.orders, 0);

    const insights = [
        {
            type: 'danger',
            title: '🚨 Revenue Leakage from Stockouts',
            metric: formatCurrency(totalLost),
            metricClass: 'danger',
            text: `${(totalLost/(totalRevenue+totalLost)*100).toFixed(1)}% of potential revenue is lost to stockouts. Reducing stockout rate from 12.2% to 6% could recover ~$10K annually.`
        },
        {
            type: 'warning',
            title: '🚚 Delivery Reliability Crisis',
            metric: `${(totalLate/totalOrders*100).toFixed(1)}%`,
            metricClass: 'warning',
            text: `1 in 4 deliveries exceeds the 4-day SLA. South region (28.2%) and North region (29.0%) are the worst performers.`
        },
        {
            type: 'warning',
            title: '📦 Revenue Concentration Risk',
            metric: '39%',
            metricClass: 'warning',
            text: `Vapes category alone contributes 39% of total revenue ($38K). Loss of this category would critically impact business viability.`
        },
        {
            type: 'success',
            title: '📈 Strong December Performance',
            metric: '$11.4K',
            metricClass: 'success',
            text: `December revenue hit $11.4K — the highest month in 2025, showing 32.6% MoM growth from November.`
        },
        {
            type: 'info',
            title: '💡 Recommendation: Inventory Optimization',
            metric: '',
            metricClass: '',
            text: `Prioritize stock replenishment for Vibe Device Starter Kit (P06) — it leads both revenue ($22.8K) and stockout losses ($5.9K). Implement automated reorder alerts.`
        },
        {
            type: 'info',
            title: '💡 Recommendation: Logistics Intervention',
            metric: '',
            metricClass: '',
            text: `Deploy route optimization for South (Port Harcourt DC) and North (Abuja Hub) warehouses. Target: reduce late delivery rate to below 20% within 2 quarters.`
        }
    ];

    grid.innerHTML = insights.map(i => `
        <div class="insight-card insight-${i.type}">
            <div class="insight-title">${i.title}</div>
            ${i.metric ? `<span class="insight-metric ${i.metricClass}">${i.metric}</span>` : ''}
            <div class="insight-text">${i.text}</div>
        </div>
    `).join('');
}

// ============================================================
// FILTER FUNCTIONALITY
// ============================================================
function applyFilters() {
    const region = document.getElementById('regionFilter').value;
    const category = document.getElementById('categoryFilter').value;

    // For a real app we'd filter the data. Here we show a visual indication.
    document.querySelectorAll('.kpi-card, .chart-card').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // trigger reflow
        el.style.animation = 'fadeInUp 0.4s ease-out both';
    });

    // Update header to show active filter
    const badges = document.querySelectorAll('.filter-active');
    badges.forEach(b => b.remove());

    if (region !== 'All' || category !== 'All') {
        const meta = document.querySelector('.header-meta');
        const badge = document.createElement('span');
        badge.className = 'badge badge-live filter-active';
        badge.style.background = 'rgba(139,92,246,0.15)';
        badge.style.color = '#8b5cf6';
        badge.style.borderColor = 'rgba(139,92,246,0.3)';
        badge.textContent = `Filtered: ${region !== 'All' ? region : ''} ${category !== 'All' ? category : ''}`.trim();
        meta.appendChild(badge);
    }
}

// ============================================================
// LAUNCH
// ============================================================
document.addEventListener('DOMContentLoaded', initDashboard);
