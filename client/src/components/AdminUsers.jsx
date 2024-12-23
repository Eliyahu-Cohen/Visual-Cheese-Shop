import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [userCounts, setUserCounts] = useState({ activeUsers: 0, regularUsers: 0, businessUsers: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserType, setNewUserType] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");        
        setUsers(response.data);
      } catch (error) {
        console.error("שגיאה בטעינת המשתמשים:", error);
      }
    };

    const fetchUserCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users/countByType");
        setUserCounts(response.data);
      } catch (error) {
        console.error("שגיאה בטעינת ספירת המשתמשים:", error);
      }
    };

    fetchUsers();
    fetchUserCounts();
  }, []);

  const handleUpdateUserType = async (userId) => {
    try {
      await axios.put(`http://localhost:3001/api/users/updateUserType/${userId}`, { userType: newUserType });
      alert("סוג המשתמש עודכן בהצלחה!");
      setNewUserType("");
      setSelectedUser(null);
    } catch (error) {
      console.error("שגיאה בעדכון סוג המשתמש:", error);
    }
  };

  return (
    <div className="admin-users">
    <Link to="/homePageAdmin">לחזרה לדף ניהול</Link>


      <h2>ניהול משתמשים</h2>
      <div className="user-summary">
        <p>לקוחות פעילים: {userCounts.activeUsers}</p>
        <p>לקוחות רגילים: {userCounts.regularUsers}</p>
        <p>לקוחות עסקיים: {userCounts.businessUsers}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>אימייל</th>
            <th>טלפון</th>
            <th>סוג משתמש</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.userType}</td>
              <td>
                <button onClick={() => setSelectedUser(user)}>עדכן סוג</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div  className="updateUser">
          <h3>עדכון סוג משתמש עבור {selectedUser.username}</h3>
          <select value={newUserType} onChange={(e) => setNewUserType(e.target.value)}>
            <option value="">בחר סוג משתמש</option>
            <option value="regular">רגיל</option>
            <option value="business">עסקי</option>
          </select>
          <button onClick={() => handleUpdateUserType(selectedUser.id)}>שמור</button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
