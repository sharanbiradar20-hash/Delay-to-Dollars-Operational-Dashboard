-- ============================================================
-- Revenue Analysis Queries
-- Author: Sharan Biradar
-- Dataset: Delay-to-Dollars Operational Intelligence
-- ============================================================

-- ============================================================
-- 1. REVENUE RANKING BY PRODUCT (Window Function: RANK)
-- ============================================================
SELECT 
    p.Product_Name,
    p.Product_Category,
    ROUND(SUM(s.Net_Sales), 2) AS Total_Revenue,
    ROUND(SUM(s.Profit), 2) AS Total_Profit,
    RANK() OVER (ORDER BY SUM(s.Net_Sales) DESC) AS Revenue_Rank,
    ROUND(SUM(s.Net_Sales) * 100.0 / (SELECT SUM(Net_Sales) FROM Sales_Fact), 1) AS Revenue_Share_Pct
FROM Sales_Fact s
JOIN Product_Dim p ON s.Product_ID = p.Product_ID
GROUP BY p.Product_Name, p.Product_Category
ORDER BY Revenue_Rank;


-- ============================================================
-- 2. RUNNING TOTAL OF MONTHLY REVENUE (Window Function: SUM OVER)
-- ============================================================
WITH Monthly_Revenue AS (
    SELECT 
        strftime('%Y-%m', Order_Date) AS Month,
        ROUND(SUM(Net_Sales), 2) AS Revenue
    FROM Sales_Fact
    GROUP BY strftime('%Y-%m', Order_Date)
)
SELECT 
    Month,
    Revenue,
    ROUND(SUM(Revenue) OVER (ORDER BY Month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS Running_Total,
    ROUND(Revenue * 100.0 / SUM(Revenue) OVER (), 1) AS Pct_of_Annual
FROM Monthly_Revenue
ORDER BY Month;


-- ============================================================
-- 3. MONTH-OVER-MONTH GROWTH (Window Function: LAG)
-- ============================================================
WITH Monthly_Revenue AS (
    SELECT 
        strftime('%Y-%m', Order_Date) AS Month,
        ROUND(SUM(Net_Sales), 2) AS Revenue
    FROM Sales_Fact
    GROUP BY strftime('%Y-%m', Order_Date)
)
SELECT 
    Month,
    Revenue,
    LAG(Revenue, 1) OVER (ORDER BY Month) AS Prev_Month_Revenue,
    ROUND(
        (Revenue - LAG(Revenue, 1) OVER (ORDER BY Month)) * 100.0 
        / LAG(Revenue, 1) OVER (ORDER BY Month), 
    1) AS MoM_Growth_Pct
FROM Monthly_Revenue
ORDER BY Month;


-- ============================================================
-- 4. CATEGORY REVENUE WITH DENSE_RANK & CUMULATIVE SUM
-- ============================================================
WITH Category_Rev AS (
    SELECT 
        p.Product_Category,
        ROUND(SUM(s.Net_Sales), 2) AS Total_Revenue,
        COUNT(*) AS Order_Count,
        ROUND(AVG(s.Profit_Margin_Pct) * 100, 1) AS Avg_Margin_Pct
    FROM Sales_Fact s
    JOIN Product_Dim p ON s.Product_ID = p.Product_ID
    GROUP BY p.Product_Category
)
SELECT 
    Product_Category,
    Total_Revenue,
    Order_Count,
    Avg_Margin_Pct,
    DENSE_RANK() OVER (ORDER BY Total_Revenue DESC) AS Category_Rank,
    ROUND(SUM(Total_Revenue) OVER (ORDER BY Total_Revenue DESC 
          ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 100.0 
          / SUM(Total_Revenue) OVER (), 1) AS Cumulative_Revenue_Pct
FROM Category_Rev
ORDER BY Category_Rank;


-- ============================================================
-- 5. TOP CUSTOMERS BY REVENUE (NTILE for Segmentation)
-- ============================================================
SELECT 
    c.Customer_Name,
    c.Customer_Segment,
    c.Channel,
    ROUND(SUM(s.Net_Sales), 2) AS Total_Revenue,
    COUNT(*) AS Total_Orders,
    ROUND(AVG(s.Net_Sales), 2) AS Avg_Order_Value,
    NTILE(4) OVER (ORDER BY SUM(s.Net_Sales) DESC) AS Revenue_Quartile
FROM Sales_Fact s
JOIN Customer_Dim c ON s.Customer_ID = c.Customer_ID
GROUP BY c.Customer_Name, c.Customer_Segment, c.Channel
ORDER BY Total_Revenue DESC;
