// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [statuses] = useState(['בהמתנה', 'בביצוע', 'נשלח']);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('/api/admin/orders');
//         setOrders(response.data);
//       } catch (error) {
//         console.error('שגיאה בשליפת ההזמנות:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(`/api/admin/orders/${orderId}`, { status: newStatus });
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//       alert('סטטוס ההזמנה עודכן בהצלחה');
//     } catch (error) {
//       console.error('שגיאה בעדכון הסטטוס:', error);
//       alert('אירעה שגיאה בעדכון הסטטוס');
//     }
//   };

//   return (
//     <div className="admin-orders">
//       <h2>ניהול הזמנות</h2>
//       {orders.length === 0 ? (
//         <p>לא נמצאו הזמנות.</p>
//       ) : (
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>מספר הזמנה</th>
//               <th>שם לקוח</th>
//               <th>טלפון</th>
//               <th>מוצרים</th>
//               <th>סה"כ לתשלום</th>
//               <th>סטטוס</th>
//               <th>עדכון סטטוס</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.username}</td>
//                 <td>{order.phone}</td>
//                 <td>{order.products}</td>
//                 <td>{order.total_price} ₪</td>
//                 <td>{order.status}</td>
//                 <td>
//                   <select
//                     value={order.status}
//                     onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                   >
//                     {statuses.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/orders');
        setOrders(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('שגיאה בטעינת ההזמנות:', error);
      }
    };

    fetchOrders();
  }, []);

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
          {orders.map(order => (
             <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.username}</td>
              <td>{order.phone}</td>
              <td>₪{order.total_price}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>
                <button> פרטי הזמנה</button>
                <button>פרטי המזמין</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
