// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { pdf } from "@react-pdf/renderer";
// import OrderPDF from "./OrderPDF"; // הקומפוננטה שייצרת עבור ה-PDF

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true);
//   const [TotalPayable, setTotalPayable] = useState(0);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const sanitizedCart = storedCart.map((item) => ({
//       ...item,
//       regularPrice: parseFloat(item.regularPrice),
//       quantity: parseInt(item.quantity),
//     }));
//     setCart(sanitizedCart);
//   }, []);

//   // Recalculate total payable whenever the cart changes
//   useEffect(() => {
//     const total = cart.reduce(
//       (sum, item) => sum + item.regularPrice * item.quantity,
//       0
//     );
//     setTotalPayable(total);
//   }, [cart]);

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) return;

//     const updatedCart = cart.map((item) =>
//       item.id === productId ? { ...item, quantity: newQuantity } : item
//     );

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (productId) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const toggleCart = () => {
//     setShowCart(!showCart);
//   };

//   // const checkout = async () => {
//   //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//   //   if (!userInfo || !userInfo.id || !userInfo.username || !userInfo.phone) {
//   //     alert("אנא התחבר לפני ביצוע הזמנה");
//   //     return;
//   //   }

//   //   const orderData = {
//   //     userId: userInfo.id,
//   //     username: userInfo.username,
//   //     phone: userInfo.phone,
//   //     totalPrice: TotalPayable,
//   //     items: cart,
//   //   };

//   //   try {
//   //     console.log("orderData =>", orderData);

//   //     // שליחת ההזמנה לשרת
//   //     await axios.post("http://localhost:3001/api/orders", orderData);

//   //     alert("ההזמנה נשמרה בהצלחה!");
//   //     localStorage.removeItem("cart");
//   //     setCart([]); // ריקון העגלה

  
      

//   //     // יצירת ה-PDF
//   //     const blob = await pdf(<OrderPDF orderData={orderData} />).toBlob();

//   //     // הורדת ה-PDF אוטומטית
//   //     const link = document.createElement("a");
//   //     link.href = URL.createObjectURL(blob);
//   //     link.download = `Order_${orderData.userId}.pdf`;
//   //     link.click();
//   //     URL.revokeObjectURL(link.href); // ניקוי ה-URL כדי למנוע זליגת זיכרון
//   //   } catch (error) {
//   //     console.error("שגיאה בשמירת ההזמנה:", error.response || error);
//   //     alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
//   //   }
//   // };


//   const checkout = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
//     if (!userInfo || !userInfo.id || !userInfo.username || !userInfo.phone) {
//       alert("אנא התחבר לפני ביצוע הזמנה");
//       return;
//     }
  
//     const orderData = {
//       userId: userInfo.id,
//       username: userInfo.username,
//       phone: userInfo.phone,
//       totalPrice: TotalPayable,
//       items: cart,
//     };
  
//     try {
  
//       // יצירת ה-PDF
//       const blob = await pdf(<OrderPDF orderData={orderData} />).toBlob();
  
//       // יצירת אובייקט FormData
//       const formData = new FormData();
//       formData.append("orderData", JSON.stringify(orderData)); // נתוני ההזמנה
//       formData.append("file", blob, `Order_${orderData.userId}.pdf`); // קובץ ה-PDF
  
//       // שליחת הבקשה לשרת
//       await axios.post("http://localhost:3001/api/orders", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // חובה לציין את הפורמט הזה
//         },
//       });
  
//       alert("ההזמנה נשמרה בהצלחה!");
//       localStorage.removeItem("cart");
//       setCart([]); // ריקון העגלה
//     } catch (error) {
//       console.error("שגיאה בשמירת ההזמנה:", error.response || error);
//       alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
//     }
//   };
  

//   return (
//     <div className={`cart-container ${showCart ? "show-cart" : ""}`} dir="rtl">
//       <button className="cart-toggle-btn" onClick={toggleCart}>
//         {showCart ? "סגור סל" : "הצג סל"}
//       </button>

//       {showCart && (
//         <div className="cart-items">
//           <h2 className="cart-title">העגלה שלי</h2>
//           {cart.length === 0 ? (
//             <p>אין מוצרים בעגלה.</p>
//           ) : (
//             cart.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <div className="cart-item-details">
//                   <div className="cart-item-info">
//                     <img
//                       src={item.imageUrl}
//                       alt={item.name}
//                       className="cart-item-image"
//                     />
//                     <div className="cart-item-description">
//                       <h4>{item.name}</h4>
//                       <p>{item.weight} גרם</p>
//                     </div>
//                   </div>
//                   <div className="cart-item-total">
//                     <p className="cart-item-price">₪{item.regularPrice}</p>
//                     <p>₪{(item.regularPrice * item.quantity).toFixed(2)}</p>
//                   </div>
//                   <div className="cart-item-quantity">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeItem(item.id)}
//                 >
//                   הסר
//                 </button>
//               </div>
//             ))
//           )}
//           <div className="cart-summary">
//             <h3 key={TotalPayable}>סה"כ לתשלום: ₪{TotalPayable.toFixed(2)}</h3>
//             {  cart.length > 0 && (<button className="checkout-btn" onClick={checkout}>
//               שליחת ההזמנה
//             </button>)
            
//           }
//           </div>
//         </div>
//       )}
//       <div>
//         <h1>דף הזמנה</h1>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import OrderPDF from "./OrderPDF";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(true);
  const [TotalPayable, setTotalPayable] = useState(0);
  const [userType, setUserType] = useState("regular"); // ברירת מחדל למשתמש רגיל

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const sanitizedCart = storedCart.map((item) => ({
      ...item,
      regularPrice: parseFloat(item.regularPrice),
      businessPrice: parseFloat(item.businessPrice),
      quantity: parseInt(item.quantity),
    }));
    setCart(sanitizedCart);

    // שליפת סוג המשתמש מתוך localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserType(userInfo?.userType || "regular");
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const price =
        userType === "business" ? item.businessPrice : item.regularPrice;
      return sum + price * item.quantity;
    }, 0);
    setTotalPayable(total);
  }, [cart, userType]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return;

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const checkout = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.id || !userInfo.username || !userInfo.phone) {
      alert("אנא התחבר לפני ביצוע הזמנה");
      return;
    }

    const filteredItems = cart.map((item) => ({
          id: item.id,
          name: item.name,
          regularPrice: item.regularPrice,
          quantity: item.quantity,
        }));
console.log(cart);

    const orderData = {
      userId: userInfo.id,
      username: userInfo.username,
      phone: userInfo.phone,
      totalPrice: TotalPayable,
      items: cart,
    };

    try {
      const blob = await pdf(<OrderPDF orderData={orderData} userType={userType}/>).toBlob();
      const formData = new FormData();
      formData.append("orderData", JSON.stringify(orderData));
      formData.append("file", blob, `Order_${orderData.userId}.pdf`);

      await axios.post("http://localhost:3001/api/orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("ההזמנה נשמרה בהצלחה!");
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.error("שגיאה בשמירת ההזמנה:", error.response || error);
      alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
    }
  };
// const checkout = async () => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//   if (!userInfo || !userInfo.id || !userInfo.username || !userInfo.phone) {
//     alert("אנא התחבר לפני ביצוע הזמנה");
//     return;
//   }

//   // בניית מערך של פריטים עם השדות הרצויים
//   const filteredItems = cart.map((item) => ({
//     id: item.id,
//     name: item.name,
//     regularPrice: item.regularPrice,
//     quantity: item.quantity,
//   }));

//   const orderData = {
//     userId: userInfo.id,
//     username: userInfo.username,
//     phone: userInfo.phone,
//     totalPrice: TotalPayable,
//     items: filteredItems,
//   };

//   try {
//     const blob = await pdf(<OrderPDF orderData={orderData} userType={userType} />).toBlob();
//     const formData = new FormData();
//     formData.append("orderData", JSON.stringify(orderData));
//     formData.append("file", blob, `Order_${orderData.userId}.pdf`);

//     await axios.post("http://localhost:3001/api/orders", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert("ההזמנה נשמרה בהצלחה!");
//     localStorage.removeItem("cart");
//     setCart([]);
//   } catch (error) {
//     console.error("שגיאה בשמירת ההזמנה:", error.response || error);
//     alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
//   }
// };

  return (
    <div className={`cart-container ${showCart ? "show-cart" : ""}`} dir="rtl">
      <button className="cart-toggle-btn" onClick={toggleCart}>
        {showCart ? "סגור סל" : "הצג סל"}
      </button>

      {showCart && (
        <div className="cart-items">
          <h2 className="cart-title">העגלה שלי</h2>
          {cart.length === 0 ? (
            <p>אין מוצרים בעגלה.</p>
          ) : (
            cart.map((item) => {
              const price =
                userType === "business" ? item.businessPrice : item.regularPrice;
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <div className="cart-item-description">
                        <h4>{item.name}</h4>
                        <p>{item.weight} גרם</p>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      <p className="cart-item-price">₪{price.toFixed(2)}</p>
                      <p>₪{(price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    הסר
                  </button>
                </div>
              );
            })
          )}
          <div className="cart-summary">
            <h3>סה"כ לתשלום: ₪{TotalPayable.toFixed(2)}</h3>
            {cart.length > 0 && (
              <button className="checkout-btn" onClick={checkout}>
                שליחת ההזמנה
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
