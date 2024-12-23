import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/orders/user-details/${id}`);
        setUser(response.data);
      } catch (error) {
        setError("שגיאה בשליפת פרטי המשתמש.");
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [id]);


  const handleOrder = () =>{
    navigate(`/adminOrders` )                     
  }
  

  if (error) return <p>{error}</p>;
  if (!user) return <p>טוען פרטים...</p>;

 

  return (
    <div className="user-details">
      <h2>פרטי משתמש</h2>
      <p>שם משתמש: {user.username}</p>
      <p>דוא"ל: {user.email}</p>
      <p>טלפון: {user.phone}</p>
      <p>כתובת: {user.address}</p>
      <p>סוג משתמש: {user.userType}</p>
      <p>
  תאריך יצירה: {new Date(user.created_at).toLocaleDateString()} <br /> 
  שעה: {new Date(user.created_at).toLocaleTimeString()}
</p>


      <button onClick={handleOrder}>לחזרה</button>
    </div>
  );
};

export default UserDetails;


