// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [userDetails, setUserDetails] = useState({});
// //   const [totalPrice, setTotalPrice] = useState(0);

// //   useEffect(() => {
// //     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
// //     setCartItems(savedCart);

// //     const userData = JSON.parse(localStorage.getItem('user')) || {};
// //     setUserDetails(userData);

// //     calculateTotal(savedCart);
// //   }, []);

// //   const calculateTotal = (items) => {
// //     const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
// //     setTotalPrice(total);
// //   };

// //   const updateQuantity = (productId, change) => {
// //     const updatedCart = cartItems.map((item) =>
// //       item.id === productId
// //         ? { ...item, quantity: Math.max(item.quantity + change, 1) }
// //         : item
// //     );
// //     setCartItems(updatedCart);
// //     localStorage.setItem('cart', JSON.stringify(updatedCart));
// //     calculateTotal(updatedCart);
// //   };

// //   const handleOrder = async () => {
// //     if (cartItems.length === 0) {
// //       alert('עגלת הקניות שלך ריקה.');
// //       return;
// //     }

// //     if (!userDetails.username || !userDetails.phone) {
// //       alert('לא נמצאו פרטי משתמש. אנא התחבר מחדש.');
// //       return;
// //     }

// //     const orderData = {
// //       username: userDetails.username,
// //       phone: userDetails.phone,
// //       totalPrice,
// //       products: cartItems.map((item) => ({
// //         productId: item.id,
// //         productName: item.name,
// //         barcode: item.barcode,
// //         quantity: item.quantity,
// //         price: item.price,
// //         total: item.quantity * item.price,
// //       })),
// //       status: 'בהמתנה', // סטטוס התחלתי
// //     };

// //     try {
// //       const response = await axios.post('/api/orders', orderData);
// //       alert('ההזמנה בוצעה בהצלחה!');
// //       setCartItems([]);
// //       localStorage.removeItem('cart');
// //     } catch (error) {
// //       console.error('שגיאה בשליחת ההזמנה:', error);
// //       alert('אירעה שגיאה במהלך ההזמנה.');
// //     }
// //   };

// //   const handleRemoveItem = (productId) => {
// //     const updatedCart = cartItems.filter((item) => item.id !== productId);
// //     setCartItems(updatedCart);
// //     localStorage.setItem('cart', JSON.stringify(updatedCart));
// //     calculateTotal(updatedCart);
// //   };

// //   return (
// //     <div className="cart-container">
// //       <h2>עגלת קניות</h2>
// //       {cartItems.length === 0 ? (
// //         <p>עגלת הקניות שלך ריקה.</p>
// //       ) : (
// //         <>
// //           <table className="cart-table">
// //             <thead>
// //               <tr>
// //                 <th>שם המוצר</th>
// //                 <th>כמות</th>
// //                 <th>מחיר יחידה</th>
// //                 <th>סה"כ</th>
// //                 <th>פעולות</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {cartItems.map((item) => (
// //                 <tr key={item.id}>
// //                   <td>{item.name}</td>
// //                   <td>
// //                     <button onClick={() => updateQuantity(item.id, -1)}>-</button>
// //                     {item.quantity}
// //                     <button onClick={() => updateQuantity(item.id, 1)}>+</button>
// //                   </td>
// //                   <td>{item.price} ₪</td>
// //                   <td>{item.quantity * item.price} ₪</td>
// //                   <td>
// //                     <button onClick={() => handleRemoveItem(item.id)}>הסר</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //           <div className="cart-summary">
// //             <h3>סה"כ לתשלום: {totalPrice} ₪</h3>
// //             <button onClick={handleOrder}>בצע הזמנה</button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;

// // Cart.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [totalPrice, setTotalPrice] = useState(0);

// //   useEffect(() => {
// //     const cart = JSON.parse(localStorage.getItem('cart')) || [];
// //     setCartItems(cart);

// //     const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
// //     setTotalPrice(total);
// //   }, []);

// //   const handleUpdateQuantity = async (productId, quantity) => {
// //     try {
// //       await axios.put(`/api/cart/update/${productId}`, { quantity });
// //       const updatedCart = await axios.get('/api/cart');
// //       setCartItems(updatedCart.data.items);
// //       setTotalPrice(updatedCart.data.totalPrice);
// //     } catch (error) {
// //       console.error('שגיאה בעדכון כמות המוצר:', error);
// //     }
// //   };

// //   const handleRemoveItem = async (productId) => {
// //     try {
// //       await axios.delete(`/api/cart/remove/${productId}`);
// //       const updatedCart = await axios.get('/api/cart');
// //       setCartItems(updatedCart.data.items);
// //       setTotalPrice(updatedCart.data.totalPrice);
// //     } catch (error) {
// //       console.error('שגיאה בהסרת מוצר מהעגלה:', error);
// //     }
// //   };

// //   return (
// //     <div className="cart">
// //       <h2>סל קניות</h2>
// //       {cartItems.length === 0 ? (
// //         <p>העגלה ריקה.</p>
// //       ) : (
// //         <>
// //           <table className="cart-table">
// //             <thead>
// //               <tr>
// //                 <th>מוצר</th>
// //                 <th>כמות</th>
// //                 <th>מחיר</th>
// //                 <th>סך הכל</th>
// //                 <th>הסרה</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {cartItems.map((item) => (
// //                 <tr key={item.productId}>
// //                   <td>{item.productName}</td>
// //                   <td>
// //                     <input
// //                       type="number"
// //                       value={item.quantity}
// //                       min="1"
// //                       onChange={(e) =>
// //                         handleUpdateQuantity(item.productId, e.target.value)
// //                       }
// //                     />
// //                   </td>
// //                   <td>{item.price} ₪</td>
// //                   <td>{item.quantity * item.price} ₪</td>
// //                   <td>
// //                     <button onClick={() => handleRemoveItem(item.productId)}>
// //                       הסר
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //           <div className="cart-total">
// //             <h3>סה"כ לתשלום: {totalPrice} ₪</h3>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;

// import React, { useEffect, useState } from 'react';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // טוען נתוני עגלה מ-localStorage ומחשב סכום כולל
//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(cart);

//     const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
//     setTotalPrice(total);
//   }, []);

//   // עדכון כמות מוצר
//   const handleUpdateQuantity = (productId, quantity) => {
//     if (quantity < 1) return;

//     const updatedCart = cartItems.map((item) =>
//       item.productId === productId ? { ...item, quantity: Number(quantity) } : item
//     );

//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));

//     const total = updatedCart.reduce((sum, item) => sum + item.quantity * item.price, 0);
//     setTotalPrice(total);
//   };

//   // הסרת מוצר מהעגלה
//   const handleRemoveItem = (productId) => {
//     const updatedCart = cartItems.filter((item) => item.productId !== productId);

//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));

//     const total = updatedCart.reduce((sum, item) => sum + item.quantity * item.price, 0);
//     setTotalPrice(total);
//   };

//   // שליחת ההזמנה
//   const handleOrderSubmit = () => {
//     if (cartItems.length === 0) {
//       alert('העגלה ריקה. אין מה לשלוח.');
//       return;
//     }

//     const orderDetails = {
//       items: cartItems,
//       total: totalPrice,
//     };

//     console.log('Order Submitted:', orderDetails); // ניתן להחליף ב-API בפועל
//     alert('הזמנה נשלחה בהצלחה!');

//     // ניקוי העגלה
//     setCartItems([]);
//     setTotalPrice(0);
//     localStorage.setItem('cart', JSON.stringify([]));
//   };

//   return (
//     <div className="cart">
//       <h2>סל קניות</h2>
//       {cartItems.length === 0 ? (
//         <p>העגלה ריקה.</p>
//       ) : (
//         <>
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>מוצר</th>
//                 <th>כמות</th>
//                 <th>מחיר</th>
//                 <th>סך הכל</th>
//                 <th>הסרה</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.productId}>
//                   <td>{item.productName}</td>
//                   <td>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       onChange={(e) =>
//                         handleUpdateQuantity(item.productId, e.target.value)
//                       }
//                     />
//                   </td>
//                   <td>{item.price} ₪</td>
//                   <td>{item.quantity * item.price} ₪</td>
//                   <td>
//                     <button onClick={() => handleRemoveItem(item.productId)}>הסר</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="cart-total">
//             <h3>סה"כ לתשלום: {totalPrice} ₪</h3>
//             <button onClick={handleOrderSubmit}>שלח הזמנה</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // export default Cart;
// import React, { useState, useEffect } from "react";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true); // מצב האם להציג את הסל

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     console.log("storedCart");

//     setCart(storedCart);
//   }, []);

//   const updateQuantity = (productId, newQuantity) => {
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

//   const calculateTotal = () => {
//     return cart.reduce(
//       (total, item) => total + item.regularPrice * item.quantity,
//       0
//     );
//   };

//   const toggleCart = () => {
//     setShowCart(!showCart);
//   };

//   return (
//     <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
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
//                   <p className="cart-item-price">₪{item.regularPrice}</p>
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
//                   <button
//                     className="remove-btn"
//                     onClick={() => removeItem(item.id)}
//                   >
//                     הסר
//                   </button>
//                 </div>
//                 <div className="cart-item-total">
//                   <p>₪{(item.regularPrice * item.quantity).toFixed(2)}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           <div className="cart-summary">
//             <h3>סה"כ לתשלום: ₪{calculateTotal().toFixed(2)}</h3>
//             <button className="checkout-btn">מעבר לקופה</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useState, useEffect } from "react";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   // עדכון כמות של פריט בעגלה
//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) return;  // מוודא שהכמות לא תהיה פחותה מ-1
//     const updatedCart = cart.map((item) =>
//       item.id === productId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart); // עדכון המצב של העגלה
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון ב-localStorage
//   };

//   // הסרת פריט מהעגלה
//   const removeItem = (productId) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart); // עדכון המצב של העגלה
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון ב-localStorage
//   };

//   // חישוב הסכום הכולל של העגלה
//   const calculateTotal = () => {
//     return cart.reduce(
//       (total, item) => total + item.regularPrice * item.quantity,
//       0
//     );
//   };

//   const toggleCart = () => {
//     setShowCart(!showCart);
//   };

//   return (
//     <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
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
//             {/* <h3 key={}>סה"כ לתשלום: ₪{calculateTotal().toFixed(2)}</h3> */}
//             <button className="checkout-btn">מעבר לקופה</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// //הקוד מס 3
// import React, { useState, useEffect } from "react";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   // עדכון כמות של פריט בעגלה
//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) return;  // מוודא שהכמות לא תהיה פחותה מ-1
//     const updatedCart = cart.map((item) =>
//       item.id === productId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart); // עדכון המצב של העגלה
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון ב-localStorage
//   };

//   // הסרת פריט מהעגלה
//   const removeItem = (productId) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart); // עדכון המצב של העגלה
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון ב-localStorage
//   };

//   // חישוב הסכום הכולל של העגלה
//   const calculateTotal = () => {
//     return cart.reduce(
//       (total, item) => total + item.regularPrice * item.quantity,
//       0
//     );
//   };

//   const toggleCart = () => {
//     setShowCart(!showCart);
//   };

//   return (
//     <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
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
//             <h3>סה"כ לתשלום: ₪{calculateTotal().toFixed(2)}</h3>
//             <button className="checkout-btn">מעבר לקופה</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
// import React, { useState, useEffect } from "react";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true);
//   const [TotalPayable, setTotalPayable] = useState(0);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);

//     // מחשבים את הסכום הכולל בפעם הראשונה
//     const calculateTotal = (cartItems) => {
//       return cartItems.reduce(
//         (total, item) => total + item.regularPrice * item.quantity,
//         0
//       );
//     };

//     setTotalPayable(calculateTotal(storedCart));
//   }, []);

//   const updateTotalPayable = (action, amount) => {
//     if (action === "+") {
//       console.log(TotalPayable);
//       setTotalPayable( TotalPayable + amount);
//     } else if (action === "-") {
//       setTotalPayable(TotalPayable - amount);
//     } else {
//       console.error("Invalid action provided. Use '+' or '-'.");
//     }
//   };
//   // עדכון כמות של פריט בעגלה
//   const updateQuantity = (productId, newQuantity, action) => {
//     if (newQuantity <= 0) return; // מוודא שהכמות לא תהיה פחותה מ-1

//     const updatedCart = cart.map((item) => {
//       if (item.id === productId) {
//         // קריאה לפונקציה לעדכון המחיר הכולל
//         updateTotalPayable(action, item.regularPrice);
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });

//     setCart(updatedCart); // עדכון המצב של העגלה
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון ב-localStorage
//   };

//   // הסרת פריט מהעגלה
//   const removeItem = (productId) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart); // עדכון המצב של העגלה
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון ב-localStorage
//   };

//   const toggleCart = () => {
//     setShowCart(!showCart);
//   };

//   return (
//     <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
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
//                       onClick={() => {
//                         console.log(item.quantity); // כתיבת לוג
//                         console.log(TotalPayable); // כתיבת לוג
//                         updateQuantity(item.id, item.quantity - 1,"-"); // קריאה לפונקציה
//                         console.log(TotalPayable); // כתיבת לוג
//                       }}
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>

//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1,"+")}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   className="remove-btn"

//                   onClick={() => {
//                     updateTotalPayable("-",(item.regularPrice * item.quantity))
//                     removeItem(item.id)}}
//                 >
//                   הסר
//                 </button>
//               </div>
//             ))
//           )}
//           <div className="cart-summary">
//             <h3>סה"כ לתשלום: ₪{TotalPayable.toFixed(2)}</h3>
//             <button className="checkout-btn">מעבר לקופה</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useState, useEffect } from "react";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true);
//   const [TotalPayable, setTotalPayable] = useState(0);

  

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

//     // ממיר מחירים למספרים אם יש צורך
//     const sanitizedCart = storedCart.map((item) => ({
//       ...item,
//       regularPrice: Number(item.regularPrice),
//     }));

//     setCart(sanitizedCart);

//     const calculateTotal = (cartItems) => {
//       return cartItems.reduce(
//         (total, item) => total + item.regularPrice * item.quantity,
//         0
//       );
//     };

//     setTotalPayable(calculateTotal(sanitizedCart));
//   }, []);

  
//   const updateTotalPayable = (action, amount) => {
//     const numericAmount = Number(amount); // המרת הערך למספר

//     if (isNaN(numericAmount)) {
//       console.error("Invalid amount: not a number");
//       return;
//     }

//     if (action === "+") {
//       setTotalPayable((prev) => prev + numericAmount);
//             console.log(TotalPayable);
//     } else if (action === "-") {
//       setTotalPayable((prev) => prev - numericAmount);
//     } else {
//       console.error("Invalid action provided. Use '+' or '-'.");
//       console.log(TotalPayable);

//     }
//   };

//   const updateQuantity = (productId, newQuantity, action) => {
//     if (newQuantity <= 0) return;

//     const updatedCart = cart.map((item) => {
//       if (item.id === productId) {
//         updateTotalPayable(action, item.regularPrice);
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeItem = (productId) => {
//     const itemToRemove = cart.find((item) => item.id === productId);
//     if (itemToRemove) {
//       updateTotalPayable("-", itemToRemove.regularPrice * itemToRemove.quantity);
//     }
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const toggleCart = () => {
//     setShowCart(!showCart);
//   };

//   return (
//     <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
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
//                       onClick={() =>
//                         updateQuantity(item.id, item.quantity - 1, "-")
//                       }
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() =>{
//                         updateQuantity(item.id, item.quantity + 1, "+")
//                         }
//                       }
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
//             <h3>
//               סה"כ לתשלום: ₪{(Number(TotalPayable) || 0).toFixed(2)}
//             </h3>
//             <button className="checkout-btn">מעבר לקופה</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useState, useEffect } from "react";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true);
//   const [TotalPayable, setTotalPayable] = useState(0);
//   console.log(TotalPayable);

//   // Load cart from localStorage and calculate the total payable
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const sanitizedCart = storedCart.map((item) => ({
//       ...item,
//       regularPrice: parseFloat(item.regularPrice),
//       quantity: parseInt(item.quantity),
//     }));

//     setCart(sanitizedCart);
//     calculateTotalPayable(sanitizedCart);
//   }, []);

//   useEffect(() => {
//     calculateTotalPayable(cart);
//   }, [cart]);

//   const calculateTotalPayable = (cartItems) => {
//     console.log("2-", TotalPayable);

//     const total = cartItems.reduce(
//       (sum, item) => sum + item.regularPrice * item.quantity,
//       0
//     );
//     console.log("total -", total);

//     setTotalPayable(total);
//   };

//   const updateQuantity = (productId, newQuantity, action) => {
//     if (newQuantity <= 0) return;

//     const updatedCart = cart.map((item) => {
//       if (item.id === productId) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     // calculateTotalPayable(updatedCart);
//   };

//   const removeItem = (productId) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     calculateTotalPayable(updatedCart);
//   };

//   const toggleCart = () => {
//     setShowCart(!showCart);
//   };

//   return (
//     <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
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
//                       onClick={() =>
//                         updateQuantity(item.id, item.quantity - 1, "-")
//                       }
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() =>
//                         updateQuantity(item.id, item.quantity + 1, "+")
//                       }
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
//             <h3> סה"כ לתשלום: ₪{TotalPayable && TotalPayable.toFixed(2)} </h3>
//             <button className="checkout-btn">מעבר לקופה</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import axios from 'axios';


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(true);
  const [TotalPayable, setTotalPayable] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const sanitizedCart = storedCart.map((item) => ({
      ...item,
      regularPrice: parseFloat(item.regularPrice),
      quantity: parseInt(item.quantity),
    }));
    setCart(sanitizedCart);
  }, []);

  // Recalculate total payable whenever the cart changes
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.regularPrice * item.quantity,
      0
    );
    setTotalPayable(total);
  }, [cart]);

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
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log("userInfo =>",userInfo);
    
    if (!userInfo) {
      alert("אנא התחבר לפני ביצוע הזמנה");
      return;
    }
  
    try {
      const orderData = {
        userId: userInfo.id,  // וודא ש-`userInfo.id` מוגדר כמו שצריך
        username: userInfo.username,
        phone: userInfo.phone,
        totalPrice: TotalPayable,
        items: cart,  // פרטי העגלה
      };
      
      console.log("orderData =>",orderData);
  
      await axios.post('http://localhost:3001/api/orders', orderData);
      alert("ההזמנה נשמרה בהצלחה!");
      localStorage.removeItem("cart");
      setCart([]); // ריקון העגלה
    } catch (error) {
      console.error("שגיאה בשמירת ההזמנה:", error);     
      alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
    }
  };
  
  // const checkout = async () => {
  //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //   console.log("userInfo =>",userInfo);
    
  //   if (!userInfo) {
  //     alert("אנא התחבר לפני ביצוע הזמנה");
  //     return;
  //   }
  
  //   try {
  //     const orderData = {
  //       userId: userInfo.id,  // וודא ש-`userInfo.id` מוגדר כמו שצריך
  //       username: userInfo.username,
  //       phone: userInfo.phone,
  //       totalPrice: TotalPayable,
  //       items: cart,  // פרטי העגלה
  //     };
      
  //     console.log("orderData =>",orderData);
  
  //     await axios.post('http://localhost:3001/api/orders', orderData);
  //     alert("ההזמנה נשמרה בהצלחה!");
  //     localStorage.removeItem("cart");
  //     setCart([]); // ריקון העגלה
  //   } catch (error) {
  //     console.error("שגיאה בשמירת ההזמנה:", error);     
  //     alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
  //   }
  // };
  

  return (
    <div className={`cart-container ${showCart ? "show-cart" : ""}`}>
      <button className="cart-toggle-btn" onClick={toggleCart}>
        {showCart ? "סגור סל" : "הצג סל"}
      </button>

      {showCart && (
        <div className="cart-items">
          <h2 className="cart-title">העגלה שלי</h2>
          {cart.length === 0 ? (
            <p>אין מוצרים בעגלה.</p>
          ) : (
            cart.map((item) => (
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
                    <p className="cart-item-price">₪{item.regularPrice}</p>
                    <p>₪{(item.regularPrice * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
            ))
          )}
          <div className="cart-summary">
            <h3 key={TotalPayable}>סה"כ לתשלום: ₪{TotalPayable.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={checkout}>
   שליחת ההזמנה
</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
