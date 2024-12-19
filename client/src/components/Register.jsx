
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    phone: "",
    userType: "regular",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();  // שימוש ב-useNavigate לניהול ניווט

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3001/api/users/register", formData);
      setSuccessMessage("הרישום הצליח! אתם מועברים...");
      setErrorMessage("");
      
      // שמירת הטוקן ופרטי המשתמש ב-localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
      localStorage.setItem("token", response.data.token);
      
    
    
      setTimeout(() => {
        window.location.href = "/";  // ניווט לדף הבית
      }, 2000);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "שגיאה בהרשמה");
      } else {
        setErrorMessage("שגיאה בחיבור לשרת");
      }
      setSuccessMessage("");
    }
  };
  

  return (
    <div className="register-container">
      <h2 className="register-title">הרשמה</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-label">שם משתמש:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="register-input"
        />

        <label className="register-label">סיסמה:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="register-input"
        />

        <label className="register-label">דוא"ל:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="register-input"
        />

        <label className="register-label">כתובת:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="register-input"
        />

        <label className="register-label">מספר טלפון:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="register-input"
        />

        <button type="submit" className="register-button">
          הירשם
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <p className="login-prompt">
        משתמש קים? <Link to="/login" className="register-link">התחבר כאן</Link>
      </p>
    </div>
  );
}

export default Register;
