
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = () => {
  const { login } = useUser();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', { phone, password });
      alert(response.data.message);
      localStorage.setItem('token', response.data.token); // שמירת טוקן
      login(response.data.userInfo); // עדכון המידע על המשתמש ב-Context

      if( response.data.userInfo.userType === 'manager'){
        navigate('/homePageAdmin'); // תפוס את הדרך ל
        return; // עצור כאן כדי לא לעבור שוב לדף '/'

      }

      navigate('/'); // מעבר לדף הבית לאחר התחברות
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'שגיאה בשרת');
    }
  };

  return (
<div className="login-container mediterranean-theme">
<h2 className="login-title">התחברות</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-field">
          <label htmlFor="phone-input" className="login-label">מספר טלפון:</label>
          <input
            id="phone-input"
            className="login-input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="login-field">
          <label htmlFor="password-input" className="login-label">סיסמה:</label>
          <input
            id="password-input"
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">כניסה</button>
      </form>
      <p className="register-prompt">
        משתמש חדש? <Link to="/register" className="register-link">הירשם כאן</Link>
      </p>
    </div>
  );
};

export default Login;
