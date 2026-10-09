-- ============================================================
-- Delivery Performance & Stockout Impact Queries
-- Author: Sharan Biradar
-- Dataset: Delay-to-Dollars Operational Intelligence
-- ============================================================

-- ============================================================
-- 1. LATE DELIVERY RATE BY WAREHOUSE (CASE WHEN + Aggregation)
-- ============================================================
SELECT 
    w.Warehouse_Name,
    w.Region,
    COUNT(*) AS Total_Orders,
    SUM(CASE WHEN s.Delivery_Status = 'Late' THEN 1 ELSE 0 END) AS Late_Orders,
    SUM(CASE WHEN s.Delivery_Status = 'On Time' THEN 1 ELSE 0 END) AS OnTime_Orders,
    ROUND(
        SUM(CASE WHEN s.Delivery_Status = 'Late' THEN 1.0 ELSE 0 END) 
        / COUNT(*) * 100, 1
    ) AS Late_Delivery_Rate_Pct,
    ROUND(AVG(s.Delivery_Days), 2) AS Avg_Delivery_Days,
    ROUND(SUM(s.Net_Sales), 2) AS Total_Revenue
FROM Sales_Fact s
JOIN Warehouse_Dim w ON s.Warehouse_ID = w.Warehouse_ID
GROUP BY w.Warehouse_Name, w.Region
ORDER BY Late_Delivery_Rate_Pct DESC;


-- ============================================================
-- 2. STOCKOUT IMPACT — FULL STAR SCHEMA JOIN
-- ============================================================
SELECT 
    p.Product_Name,
    p.Product_Category,
    w.Warehouse_Name,
    w.Region,
    c.Customer_Segment,
    COUNT(*) AS Stockout_Events,
    ROUND(SUM(s.Lost_Sales_Estimate), 2) AS Total_Lost_Revenue,
    ROUND(AVG(s.Lost_Sales_Estimate), 2) AS Avg_Lost_Per_Event,
    ROUND(SUM(s.Net_Sales), 2) AS Actual_Revenue_From_Stockout_Orders
FROM Sales_Fact s
JOIN Product_Dim p ON s.Product_ID = p.Product_ID
JOIN Customer_Dim c ON s.Customer_ID = c.Customer_ID
JOIN Warehouse_Dim w ON s.Warehouse_ID = w.Warehouse_ID
WHERE s.Stockout_Flag = 1
GROUP BY p.Product_Name, p.Product_Category, w.Warehouse_Name, w.Region, c.Customer_Segment
ORDER BY Total_Lost_Revenue DESC
LIMIT 20;


-- ============================================================
-- 3. DELIVERY SLA COMPLIANCE TREND (Monthly)
-- ============================================================
WITH Monthly_Delivery AS (
    SELECT 
        strftime('%Y-%m', Order_Date) AS Month,
        COUNT(*) AS Total_Orders,
        SUM(CASE WHEN Delivery_Status = 'On Time' THEN 1 ELSE 0 END) AS OnTime,
        SUM(CASE WHEN Delivery_Status = 'Late' THEN 1 ELSE 0 END) AS Late,
        ROUND(AVG(Delivery_Days), 2) AS Avg_Days
    FROM Sales_Fact
    GROUP BY strftime('%Y-%m', Order_Date)
)
SELECT 
    Month,
    Total_Orders,
    OnTime,
    Late,
    ROUND(OnTime * 100.0 / Total_Orders, 1) AS SLA_Compliance_Pct,
    Avg_Days,
    ROUND(OnTime * 100.0 / Total_Orders - LAG(OnTime * 100.0 / Total_Orders) OVER (ORDER BY Month), 1) AS SLA_Change_vs_Prev_Month
FROM Monthly_Delivery
ORDER BY Month;


-- ============================================================
-- 4. SALES REP PERFORMANCE SCORECARD
-- ============================================================
SELECT 
    s.Sales_Rep,
    COUNT(*) AS Total_Orders,
    ROUND(SUM(s.Net_Sales), 2) AS Total_Revenue,
    ROUND(SUM(s.Profit), 2) AS Total_Profit,
    ROUND(AVG(s.Profit_Margin_Pct) * 100, 1) AS Avg_Margin_Pct,
    ROUND(AVG(s.Delivery_Days), 2) AS Avg_Delivery_Days,
    ROUND(SUM(CASE WHEN s.Delivery_Status = 'Late' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 1) AS Late_Rate_Pct,
    SUM(s.Stockout_Flag) AS Stockout_Count,
    ROUND(SUM(s.Lost_Sales_Estimate), 2) AS Lost_Sales,
    RANK() OVER (ORDER BY SUM(s.Net_Sales) DESC) AS Revenue_Rank,
    RANK() OVER (ORDER BY SUM(CASE WHEN s.Delivery_Status = 'Late' THEN 1.0 ELSE 0 END) / COUNT(*)) AS Delivery_Rank
FROM Sales_Fact s
GROUP BY s.Sales_Rep
ORDER BY Revenue_Rank;


-- ============================================================
-- 5. REVENUE AT RISK: ORDERS WITH BOTH LATE DELIVERY + STOCKOUT
-- ============================================================
SELECT 
    s.Order_ID,
    s.Order_Date,
    p.Product_Name,
    c.Customer_Name,
    w.Warehouse_Name,
    s.Net_Sales,
    s.Delivery_Days,
    s.Delivery_Status,
    s.Lost_Sales_Estimate,
    s.Net_Sales + s.Lost_Sales_Estimate AS Total_Revenue_At_Risk
FROM Sales_Fact s
JOIN Product_Dim p ON s.Product_ID = p.Product_ID
JOIN Customer_Dim c ON s.Customer_ID = c.Customer_ID
JOIN Warehouse_Dim w ON s.Warehouse_ID = w.Warehouse_ID
WHERE s.Delivery_Status = 'Late' AND s.Stockout_Flag = 1
ORDER BY Total_Revenue_At_Risk DESC;


-- ============================================================
-- 6. INVENTORY RISK ASSESSMENT (Stock vs Reorder Level)
-- ============================================================
WITH Inventory_Status AS (
    SELECT 
        p.Product_Name,
        p.Product_Category,
        s.Region,
        s.Stock_On_Hand,
        s.Reorder_Level,
        s.Stock_On_Hand - s.Reorder_Level AS Stock_Buffer,
        CASE 
            WHEN s.Stock_On_Hand = 0 THEN 'OUT OF STOCK'
            WHEN s.Stock_On_Hand < s.Reorder_Level THEN 'BELOW REORDER'
            WHEN s.Stock_On_Hand < s.Reorder_Level * 1.2 THEN 'WARNING'
            ELSE 'ADEQUATE'
        END AS Inventory_Status,
        s.Net_Sales,
        s.Lost_Sales_Estimate
    FROM Sales_Fact s
    JOIN Product_Dim p ON s.Product_ID = p.Product_ID
)
SELECT 
    Inventory_Status,
    COUNT(*) AS Order_Count,
    ROUND(SUM(Net_Sales), 2) AS Revenue,
    ROUND(SUM(Lost_Sales_Estimate), 2) AS Lost_Sales,
    ROUND(AVG(Stock_Buffer), 1) AS Avg_Stock_Buffer
FROM Inventory_Status
GROUP BY Inventory_Status
ORDER BY 
    CASE Inventory_Status 
        WHEN 'OUT OF STOCK' THEN 1 
        WHEN 'BELOW REORDER' THEN 2 
        WHEN 'WARNING' THEN 3 
        ELSE 4 
    END;
