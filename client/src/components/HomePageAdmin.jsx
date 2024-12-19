import React from "react";
import { Link } from "react-router-dom";

function HomePageAdmin() {
  return (
    <div className="homepage-admin-container">
      {/* Title section of the admin dashboard */}
      <h1 className="homepage-admin-title">ברוכים הבאים ללוח הבקרה של המנהל</h1>

      {/* Description guiding the user on navigation */}
      <p className="homepage-admin-description">
        השתמשו בקישורים הבאים כדי לנווט בין משימות הניהול.
      </p>

      {/* Container for navigation links */}
      <div className="homepage-admin-links">
        {/* Link to add products or categories */}
        <Link to="/AdminPage" className="homepage-admin-link">
          להוספת מוצרים או קטגוריות
        </Link>

        {/* Link to view orders */}
        <Link to="/adminOrders" className="homepage-admin-link">
          לצפייה בהזמנות
        </Link>

        {/* Link to view user data */}
        <Link to="/adminUsers" className="homepage-admin-link">
          לצפייה בנתוני משתמשים
        </Link>

        {/* Link to product analytics */}
        <Link to="/productsChart" className="homepage-admin-link">
          ניתוח נתוני מוצרים לפי חודש
        </Link>
      </div>
    </div>
  );
}

export default HomePageAdmin;
