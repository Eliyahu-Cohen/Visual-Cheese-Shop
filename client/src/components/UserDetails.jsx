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

//   const handleViewUserDetails = (userId) => {
//     navigate(`/admin/user-details/${userId}`);
//   };
  

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
      <p>תאריך יצירה: {new Date(user.created_at).toLocaleString()}</p>

      <button onClick={handleOrder}>לחזרה</button>
    </div>
  );
};

export default UserDetails;


