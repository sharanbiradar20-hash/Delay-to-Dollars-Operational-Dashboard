# 📊 Delay-to-Dollars: Operational Bottleneck & Revenue-at-Risk Dashboard

## 🚀 Overview & Business Problem
Organizations often struggle to connect sales performance, logistics operations, and inventory risks. As a result, operational inefficiencies go undetected until they manifest as revenue leakage. 

This project delivers an end-to-end **Business Intelligence & Operational Analytics** solution that quantifies the financial impact of logistics bottlenecks and supply chain gaps. By analyzing 500+ transactions across 4 Nigerian regions, the project uncovers hidden revenue risks and provides actionable, data-driven recommendations to improve fulfillment SLA compliance and recover lost sales.

---

## 📈 Executive Summary (Key Findings)

- **🚨 Revenue Leakage**: Identified **$20,093** in lost sales due to stockouts — representing a **20.7% revenue leakage rate** against actual revenue ($97.2K).
- **🚚 Delivery Reliability Crisis**: Discovered a **25.4% late delivery rate** (1 in 4 orders delivered beyond the 4-day SLA), concentrated heavily in the South (28.2%) and North (29.0%) regions.
- **📦 Revenue Concentration Risk**: Found that a single product category (Vapes) contributes **39% of total revenue** ($38.2K), exposing the business to severe dependency risk.
- **💰 Discount Erosion**: Average discount of 5.2% reduces gross revenue by $6,714 annually. Statistical analysis (Pearson correlation) shows discount depth negatively impacts profit margins without proportionally driving volume.

---

## 🛠️ Technical Implementation & Methodology

To elevate this project from a standard dashboard to a comprehensive data analysis portfolio piece, I implemented a full-stack analytics workflow:

### 1. Exploratory Data Analysis (Python/Pandas)
- Conducted data profiling, missing value checks, and descriptive statistics.
- Built **correlation heatmaps** to identify relationships between discounts, margins, and delivery times.
- Performed **Pareto analysis (80/20 rule)** to highlight product revenue concentration.
- *Files: `notebooks/01_data_profiling_and_eda.ipynb`*

### 2. Statistical Analysis & Modeling (SciPy/Scikit-learn)
- **ANOVA Testing**: Validated that delivery days differ significantly across regions (p < 0.05).
- **Chi-Square Testing**: Analyzed the association between product categories and delivery delays.
- **Linear Regression**: Built a model to predict `Lost_Sales_Estimate` based on operational factors (R² = 0.85).
- **Time Series Decomposition**: Isolated trend and seasonality from monthly revenue data.
- *Files: `notebooks/02_statistical_analysis.ipynb`*

### 3. Advanced SQL Analysis (SQLite/Window Functions)
- Utilized window functions (`RANK`, `DENSE_RANK`, `LAG`) for month-over-month growth and product ranking.
- Built complex CTEs for inventory risk assessment (Stock vs Reorder levels).
- Executed full star-schema `JOIN`s to analyze stockout impact across regions and segments.
- *Files: `sql/01_revenue_analysis.sql`, `sql/02_delivery_and_stockout_analysis.sql`*

### 4. Interactive Web Dashboard (HTML/CSS/JS/Chart.js)
- Developed a custom, interactive web dashboard showcasing the findings without requiring Power BI.
- Features dynamic KPI cards, MoM trend charts, and a Sales Rep Performance Scorecard.
- *Files: `web_dashboard/index.html`*

### 5. Original Power BI Dashboard (DAX/Power Query)
- Cleaned and modeled the raw dataset using Power Query (Star Schema).
- Created advanced DAX measures (`Revenue at Risk`, `Delivery SLA Compliance`, `MoM Growth %`).

---

## 💼 Actionable Recommendations

Based on the quantified insights, I recommend the following operational improvements:

1. **Inventory Optimization**: Reducing the overall stockout rate from 12.2% to 6% will recover an estimated **$10,000 in annual revenue**. Prioritize reorder alerts for *Vibe Device Starter Kit (P06)*, which accounts for $5.9K of the total lost sales.
2. **Targeted Logistics Intervention**: Deploy route optimization and localized carrier partnerships in the South and North regions to reduce the late delivery rate to below 20% within two quarters.
3. **Portfolio Diversification**: Launch marketing initiatives for Oral Nicotine and Heat-Not-Burn products to reduce the 39% revenue dependency on Vapes.

---

## 📂 Repository Structure

```text
├── data/
│   ├── operational_intelligence_dataset.xlsx  # Raw source data
│   └── operational_intelligence.db            # SQLite database
├── notebooks/
│   ├── 01_data_profiling_and_eda.ipynb        # Python EDA & Visualizations
│   └── 02_statistical_analysis.ipynb          # Hypothesis testing & regression
├── sql/
│   ├── 01_revenue_analysis.sql                # SQL window functions & CTEs
│   ├── 02_delivery_and_stockout_analysis.sql  # SQL performance queries
│   └── run_queries.py                         # Execution script
├── web_dashboard/
│   ├── index.html                             # Interactive dashboard UI
│   ├── dashboard.css                          # Custom styling
│   └── dashboard.js                           # Chart.js implementation & logic
├── reports/
│   └── figures/                               # Exported charts from Python
├── Delay-to-Dollars-Dashboard.pbix    # Power BI file
└── README.md                                  # Project documentation
```

---

## 🔗 Author

**Sharan Biradar**  
Data Analyst Intern | Python • SQL • Power BI  
