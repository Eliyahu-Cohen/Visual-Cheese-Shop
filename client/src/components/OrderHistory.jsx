
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
