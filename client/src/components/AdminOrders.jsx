


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/orders');
//         setOrders(response.data);
//         console.log(response.data);
        
//       } catch (error) {
//         console.error('שגיאה בטעינת ההזמנות:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="admin-orders">
//       <h2>ניהול הזמנות</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>מס' הזמנה</th>
//             <th>שם מזמין</th>
//             <th>טלפון</th>
//             <th>סה"כ</th>
//             <th>תאריך הזמנה</th>
//             <th>סטטוס</th>
//             <th>פעולות</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//              <tr key={order.order_id}>
//               <td>{order.order_id}</td>
//               <td>{order.username}</td>
//               <td>{order.phone}</td>
//               <td>₪{order.total_price}</td>
//               <td>{new Date(order.created_at).toLocaleString()}</td>
//               <td>{order.status}</td>
//               <td>
//                 <button> פרטי הזמנה</button>
//                 <button>פרטי המזמין</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminOrders;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statuses] = useState(["בהמתנה", "בביצוע", "נשלח"]); // רשימת סטטוסים
  const navigate = useNavigate();
console.log("orders  =>",orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/orders");
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("שגיאה בטעינת ההזמנות:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/api/orders/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("סטטוס ההזמנה עודכן בהצלחה");
    } catch (error) {
      console.error("שגיאה בעדכון הסטטוס:", error);
      alert("אירעה שגיאה בעדכון הסטטוס.");
    }
  };

  const handleViewUserDetails = (userId) => {
    navigate(`/admin/user-details/${userId}`);
  };

  return (
    <div className="admin-orders">
      <h2>ניהול הזמנות</h2>
      <table>
        <thead>
          <tr>
            <th>מס' הזמנה</th>
            <th>שם מזמין</th>
            <th>טלפון</th>
            <th>סה"כ</th>
            <th>תאריך הזמנה</th>
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.username}</td>
              <td>{order.phone}</td>
              <td>₪{order.total_price}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleViewUserDetails(order.user_id)}>פרטי המזמין</button>
                <button>פרטי ההזמנה</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
