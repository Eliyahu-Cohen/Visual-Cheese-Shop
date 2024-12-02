// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const username = JSON.parse(localStorage.getItem('user'))?.username;

//   useEffect(() => {
//     if (!username) {
//       alert('אנא התחבר כדי לצפות בהיסטוריית ההזמנות.');
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`/api/orders/${username}`);
//         setOrders(response.data);
//       } catch (error) {
//         console.error('שגיאה בשליפת ההיסטוריה:', error);
//       }
//     };

//     fetchOrders();
//   }, [username]);

//   return (
//     <div className="order-history">
//       <h2>היסטוריית הזמנות</h2>
//       {orders.length === 0 ? (
//         <p>לא נמצאו הזמנות.</p>
//       ) : (
//         <table className="order-history-table">
//           <thead>
//             <tr>
//               <th>מספר הזמנה</th>
//               <th>מוצר</th>
//               <th>כמות</th>
//               <th>מחיר</th>
//               <th>סטטוס</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.product_name}</td>
//                 <td>{order.quantity}</td>
//                 <td>{order.price} ₪</td>
//                 <td>{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;



// OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/history/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('שגיאה בשליפת היסטוריית הזמנות:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="order-history">
      <h2>היסטוריית הזמנות</h2>
      {orders.length === 0 ? (
        <p>לא נמצאו הזמנות.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>מספר הזמנה</th>
              <th>סטטוס</th>
              <th>סה"כ לתשלום</th>
              <th>מוצרים</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.total_price} ₪</td>
                <td>{order.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
