// UpdateOrderStatus.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateOrderStatus = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const statuses = ['בהמתנה', 'בביצוע', 'נשלח'];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/admin/orders/${orderId}`);
        setOrder(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error('שגיאה בשליפת פרטי הזמנה:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async () => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { status });
      alert('סטטוס ההזמנה עודכן בהצלחה');
    } catch (error) {
      console.error('שגיאה בעדכון הסטטוס:', error);
      alert('אירעה שגיאה בעדכון הסטטוס');
    }
  };

  if (!order) return <p>טוען הזמנה...</p>;

  return (
    <div className="update-order">
      <h2>עדכון סטטוס הזמנה #{order.id}</h2>
      <div>
        <label>סטטוס הנוכחי: {order.status}</label>
      </div>
      <div>
        <label>בחר סטטוס חדש</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleStatusChange}>עדכן סטטוס</button>
    </div>
  );
};

export default UpdateOrderStatus;
