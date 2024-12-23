import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductsChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // חודשים מתחילים מ-0
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSalesData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3001/api/sales", {
        params: { year, month },
      });
      setSalesData(response.data);
    } catch (err) {
      setError("אירעה שגיאה בשליפת הנתונים");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [year, month]);
  return (
    <div className="products-chart-container">
      <div className="navigation-link">
        <Link to="/homePageAdmin" className="back-to-admin">
          לחזרה לדף ניהול
        </Link>
      </div>

      <h1 className="page-title">נתוני מכירות</h1>

      <div className="filters">
        <label htmlFor="year" className="filter-label">שנה:</label>
        <select
          id="year"
          className="filter-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {[2022, 2023, 2024, 2025].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        <label htmlFor="month" className="filter-label">חודש:</label>
        <select
          id="month"
          className="filter-select"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <button onClick={fetchSalesData} className="search-button">
          חפש
        </button>
      </div>

      {loading && <p className="loading-text">טוען נתונים...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <table className="sales-table">
          <thead>
            <tr>
              <th>שם המוצר</th>
              <th>מקט</th>
              <th>שנה</th>
              <th>חודש</th>
              <th>כמות שנמכרה</th>
            </tr>
          </thead>
          <tbody>
            {salesData.length > 0 ? (
              salesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.year}</td>
                  <td>{item.month}</td>
                  <td>{item.total_quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">אין נתונים להצגה</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsChart;
