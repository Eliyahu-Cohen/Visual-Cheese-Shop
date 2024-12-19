
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { pdf } from "@react-pdf/renderer"; // ייבוא יצירת PDF
import OrderPDF from "./OrderPDF"; // ייבוא קומפוננטת ה-PDF

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statuses] = useState(["בהמתנה", "בביצוע", "נשלח"]); // רשימת סטטוסים
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/orders");
        setOrders(response.data);
        console.log("orders =>", response.data);
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

  const handleViewOrderPDF = async (order) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/orders/${order.order_id}/products`);
      const products = response.data;

      const formattedProducts = products.map((product) => ({
        id: product.id,
        manufacturer: product.manufacturer || "לא ידוע",
        name: product.product_name,
        regularPrice: parseFloat(product.product_price),
        businessPrice: product.business_price || "0.00",
        quantity: product.quantity,
      }));

      const orderData = {
        ...order,
        totalPrice: parseFloat(order.total_price),
        items: formattedProducts,
      };

      const blob = await pdf(<OrderPDF orderData={orderData} />).toBlob();
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("שגיאה בקבלת פרטי המוצרים:", error);
      alert("אירעה שגיאה בקבלת פרטי המוצרים.");
    }
  };

  const getLabelForOrder = (date) => {

    const now = new Date();
    const orderDate = new Date(date);
    const diffInDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return { label: "מהיום", color: "#4CAF50" };
    if (diffInDays === 1) return { label: "אתמול", color: "#FFC107" };
    if (diffInDays <= 7) return { label: "משבוע זה", color: "#03A9F4" };
    if (diffInDays <= 14) return { label: "משבוע שעבר", color: "#9C27B0" };
    return { label: "ישנה יותר", color: "#F44336" };
  };

  return (
    <div className="admin-orders">  
      <Link to="/homePageAdmin">לחזרה לדף ניהול</Link>

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
          {orders.map((order) => {
            const { label, color } = getLabelForOrder(order.created_at);
            return (
              <tr key={order.order_id}>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      backgroundColor: color,
                      color: "white",
                      borderRadius: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {label}
                  </span>
                  <br />
                  {order.order_id}
                </td>
                <td>{order.username}</td>
                <td>{order.phone}</td>
                <td>₪{order.total_price}</td>
                <td>{new Date(order.created_at).toLocaleString("he-IL", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</td>
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
                  <button onClick={() => handleViewOrderPDF(order)}>פרטי ההזמנה</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
