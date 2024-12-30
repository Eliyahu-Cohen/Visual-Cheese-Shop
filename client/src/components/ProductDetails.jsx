
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "./UserContext";

// function ProductDetails({ product, onClose }) {
//   const [quantity, setQuantity] = useState(1); // כמות ברירת מחדל
//   const [cartMessage, setCartMessage] = useState("");
//   const { userInfo } = useUser();
//   const navigate = useNavigate();


//   const handleAddToCart = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingItem = cart.find((item) => item.id === product.id);
  
//     if (existingItem) {
//       existingItem.quantity += quantity; // הוספת הכמות שנבחרה
//     } else {
//       cart.push({ ...product, quantity }); // שמירה של הכמות הנבחרת
//     }
  
//     localStorage.setItem("cart", JSON.stringify(cart));
//     setCartMessage(`הוספת ${quantity} יחידות של ${product.name} לסל`);
//     setTimeout(() => setCartMessage(""), 1800);
//   };
  
//   const handleUpdateProduct = (productId) => {
//     navigate(`/admin/products/${productId}`);
//   };


//   if (!product) return null;



//   return (
//     <div
//       className="product-details-overlay"
//       onClick={onClose} // סגירת החלונית בלחיצה על הרקע
//     >
//       {cartMessage && <div className="cart-message">{cartMessage}</div>}

//       <div
//         className="product-details"
//         onClick={(e) => e.stopPropagation()} // מניעת סגירה בלחיצה על התוכן
//       >
//         {product.isOnSale === 1 && (
//           <span className="badge badge-sale">מבצע</span>
//         )}
//         {product.isNew === 1 && <span className="badge badge-new">חדש</span>}

//         <button className="close-button" onClick={onClose}>
//           X
//         </button>
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="product-image-large"
//         />
//         <div className="product-info">
//           <h2>{product.name}</h2>
//           <p>חברה: {product.manufacturer}</p>
//           <p>משקל: {product.weight} גרם</p>
//           <p>כמות בקרטון: {product.unitsPerCarton}</p>
//           <p>מחיר עיסקי: ₪{product.businessPrice}</p>
//           <p className="product-price">
//   {userInfo && userInfo.userType === "business" && (
//     <>מחיר ללקוח עסקי: ₪{product.businessPrice}</>
//   )}
//   {userInfo && userInfo.userType !== "business" && userInfo.userType !== "manager" && (
//     <>מחיר: ₪{product.regularPrice}</>
//   )}
// </p>

// {userInfo && userInfo.userType === "manager" && (
//   <>
//     <p className="product-price">
//       מחיר ללקוח רגיל: ₪{product.regularPrice}
//     </p>
//     <p className="product-price">
//       מחיר ללקוח עסקי: ₪{product.businessPrice}
//     </p>
//     <button
//       className="update-button"
//       onClick={() => handleUpdateProduct(product.id)}
//     >
//       עדכון מוצר
//     </button>
//   </>
// )}
//           <div className="add-to-cart-section">
//             <label>כמות:</label>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//             <button className="add-to-cart-button" onClick={handleAddToCart}>
//               הוסף לסל
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function ProductDetails({ product, onClose }) {
  const [quantity, setQuantity] = useState(1); // כמות ברירת מחדל
  const [cartMessage, setCartMessage] = useState("");
  const { userInfo } = useUser();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity; // הוספת הכמות שנבחרה
    } else {
      cart.push({ ...product, quantity }); // שמירה של הכמות הנבחרת
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartMessage(`הוספת ${quantity} יחידות של ${product.name} לסל`);
    setTimeout(() => setCartMessage(""), 1800);
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  if (!product) return null;

  return (
    // <div
    //   className="product-details-overlay"
    //   onClick={onClose} // סגירת החלונית בלחיצה על הרקע
    // >
    //   {cartMessage && <div className="cart-message">{cartMessage}</div>}

    //   <div
    //     className="product-details"
    //     onClick={(e) => e.stopPropagation()} // מניעת סגירה בלחיצה על התוכן
    //   >
    //     {product.isOnSale === 1 && (
    //       <span className="badge badge-sale">מבצע</span>
    //     )}
    //     {product.isNew === 1 && <span className="badge badge-new">חדש</span>}

    //     <button className="close-button" onClick={onClose}>
    //       X
    //     </button>
    //     <div className="add-to-cart-section-image-large">
    //     <img
    //       src={product.imageUrl}
    //       alt={product.name}
    //       className="product-image-large"
    //     />

      
      
    //     <div className="product-info">
    //       <h2>{product.name}</h2>
    //       <p>חברה: {product.manufacturer}</p>
    //       <p>משקל: {product.weight} גרם</p>
    //       <p>כמות בקרטון: {product.unitsPerCarton}</p>

    //       {/* הצגת מחירים */}
    //       <p className="product-price">
    //         {/* למשתמשים עסקיים */}
    //         {userInfo && userInfo.userType === "business" && (
    //           <>מחיר ללקוח עסקי: ₪{product.businessPrice}</>
    //         )}

    //         {/* למשתמשים רגילים */}
    //         {(!userInfo || userInfo.userType !== "business") && (
    //           <>מחיר: ₪{product.regularPrice}</>
    //         )}
    //       </p>

    //       {/* למנהל */}
    //       {userInfo && userInfo.userType === "manager" && (
    //         <>
    //           <p className="product-price">
    //             מחיר ללקוח רגיל: ₪{product.regularPrice}
    //           </p>
    //           <p className="product-price">
    //             מחיר ללקוח עסקי: ₪{product.businessPrice}
    //           </p>
    //           <button
    //             className="update-button"
    //             onClick={() => handleUpdateProduct(product.id)}
    //           >
    //             עדכון מוצר
    //           </button>
    //         </>
    //       )}
        
    //     </div>

    //     <div className="add-to-cart-section">
    //         <label>כמות:</label>
    //         <input
    //           type="number"
    //           min="1"
    //           value={quantity}
    //           onChange={(e) => setQuantity(Number(e.target.value))}
    //         />
    //         <button className="add-to-cart-button" onClick={handleAddToCart}>
    //           הוסף לסל
    //         </button>
    //       </div>

   
    //     </div>
    //   </div>
    // </div>

    <div
  className="unique-overlay"
  onClick={onClose} // סגירת החלון בלחיצה על הרקע
>
  {cartMessage && <div className="cart-message">{cartMessage}</div>}

  <div
    className="unique-details-container"
    onClick={(e) => e.stopPropagation()} // מניעת סגירה בלחיצה על התוכן
  >
     {product.isOnSale === 1 && (
          <span className="badge badge-sale">מבצע</span>
        )}
        {product.isNew === 1 && <span className="badge badge-new">חדש</span>}

    <button className="unique-close-button" onClick={onClose}>
      X
    </button>

    <div className="unique-content">
      {/* צד ימין - תמונה */}
      <div className="unique-image-section">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image-large"
        />
      </div>

      {/* צד שמאל - פרטים + כפתור */}
      <div className="product-info">
          <h2>{product.name}</h2>
          <p>חברה: {product.manufacturer}</p>
          <p>משקל: {product.weight} גרם</p>
          <p>כמות בקרטון: {product.unitsPerCarton}</p>

          {/* הצגת מחירים */}
          <p className="product-price">
            {/* למשתמשים עסקיים */}
            {userInfo && userInfo.userType === "business" && (
              <>מחיר ללקוח עסקי: ₪{product.businessPrice}</>
            )}

            {/* למשתמשים רגילים */}
            {(!userInfo || userInfo.userType !== "business") && (
              <>מחיר: ₪{product.regularPrice}</>
            )}
          </p>

          {/* למנהל */}
          {userInfo && userInfo.userType === "manager" && (
            <>
              <p className="product-price">
                מחיר ללקוח רגיל: ₪{product.regularPrice}
              </p>
              <p className="product-price">
                מחיר ללקוח עסקי: ₪{product.businessPrice}
              </p>
              <button
                className="update-button"
                onClick={() => handleUpdateProduct(product.id)}
              >
                עדכון מוצר
              </button>
            </>
          )}
        
        

        <div className="unique-add-to-cart">
          <label>כמות:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        <button className="add-to-cart-button" onClick={handleAddToCart}>
              הוסף לסל
            </button>
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
}

export default ProductDetails;
