
// import React, { useState } from "react";

// function ProductDetails({ product, onClose }) {
//   const [quantity, setQuantity] = useState(1); // כמות ברירת מחדל

//   const handleAddToCart = () => {
//     alert(`הוספת ${quantity} יחידות של ${product.name} לסל`);
//   };

//   if (!product) return null;

//   return (
//     <div className="product-details-overlay">
//       <div className="product-details">
//         {product.isOnSale === 1 && (<span className="badge badge-sale">מבצע</span> )}
//       {product.isNew === 1 && <span className="badge badge-new">חדש</span>}

//         <button className="close-button" onClick={onClose}>
//           X
//         </button>
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="product-image-large"
//           style={{ width: "100%", borderRadius: "10px" }}

//         />
//         <div className="product-info">
//           <h2>{product.name}</h2>
//           <p>חברה: {product.manufacturer}</p>
//           <p>משקל: {product.weight} גרם</p>
//           <p>כמות בקרטון: {product.unitsPerCarton}</p>
//           <p>מחיר עיסקי: ₪{product.businessPrice}</p>
//           <p>מחיר: ₪{product.regularPrice}</p>

//           {/* כמות וכפתור הוספה לסל */}
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

function ProductDetails({ product, onClose }) {
  const [quantity, setQuantity] = useState(1); // כמות ברירת מחדל

  const handleAddToCart = () => {
    alert(`הוספת ${quantity} יחידות של ${product.name} לסל`);
  };

  if (!product) return null;

  return (
    <div
      className="product-details-overlay"
      onClick={onClose} // סגירת החלונית בלחיצה על הרקע
    >
      <div
        className="product-details"
        onClick={(e) => e.stopPropagation()} // מניעת סגירה בלחיצה על התוכן
      >
        {product.isOnSale === 1 && <span className="badge badge-sale">מבצע</span>}
        {product.isNew === 1 && <span className="badge badge-new">חדש</span>}

        <button className="close-button" onClick={onClose}>
          X
        </button>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image-large"
        />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>חברה: {product.manufacturer}</p>
          <p>משקל: {product.weight} גרם</p>
          <p>כמות בקרטון: {product.unitsPerCarton}</p>
          <p>מחיר עיסקי: ₪{product.businessPrice}</p>
          <p>מחיר: ₪{product.regularPrice}</p>

          <div className="add-to-cart-section">
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
  );
}

export default ProductDetails;
