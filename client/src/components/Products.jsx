// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function Products() {
//   const { categoryId, isMainCategory } = useParams(); // נניח שהפרמטר מגדיר אם זו קטגוריה ראשית או תת-קטגוריה
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // בדיקה אם זו קטגוריה ראשית או תת-קטגוריה
//     const queryParam = isMainCategory === 'true' ? 'mainCategoryId' : 'subCategoryId';

//     axios.get(`http://localhost:3001/api/products?${queryParam}=${categoryId}`)
//       .then(response => setProducts(response.data))
//       .catch(error => console.error("Error fetching products:", error));
//   }, [categoryId, isMainCategory]);

//   return (
//     <div>
//       <h2>Products</h2>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             <h3>{product.name}</h3>
//             <p>Price: ${product.regularPrice}</p>
//             <button>Add to Cart</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Products;

// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';

// function Products() {
//   const { categoryId } = useParams();
//   const { search } = useLocation();
//   const isMainCategory = new URLSearchParams(search).get('isMainCategory') === 'true';
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchUrl = isMainCategory
//       ? `http://localhost:3001/api/products?mainCategoryId=${categoryId}`
//       : `http://localhost:3001/api/products?subCategoryId=${categoryId}`;

//     axios.get(fetchUrl)
//       .then(response => setProducts(response.data))
//       .catch(error => console.error("Error fetching products:", error));
//   }, [categoryId, isMainCategory]);

//   return (
//     <div>
//       <h2>Products</h2>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             <h3>{product.name}</h3>
//             <p>מחיר: ₪{product.regularPrice}</p>
//             <button>הוסף לסל</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Products;

// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';

// function Products() {
//   const { categoryId } = useParams();
//   const { search } = useLocation();
//   const isMainCategory = new URLSearchParams(search).get('isMainCategory') === 'true';
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchUrl = isMainCategory
//       ? `http://localhost:3001/api/products?mainCategoryId=${categoryId}`
//       : `http://localhost:3001/api/products?subCategoryId=${categoryId}`;

//     axios.get(fetchUrl)
//       .then(response => setProducts(response.data))
//       .catch(error => console.error("Error fetching products:", error));
//   }, [categoryId, isMainCategory]);

//   const handleProductClick = (product) => {
//     // כאן תוכל להוסיף לוגיקה לפתיחת חלון מפורט של המוצר
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <div className="products-container">
//       {products.map(product => (
//         <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
//           <img src={product.imageUrl} alt={product.name} className="product-image" />
//           {product.isOnSale && <div className="badge badge-sale">מבצע</div>}
//           {product.isNew && <div className="badge badge-new">חדש</div>}
//           <h3 className="product-name">{product.name}</h3>
//           <p className="product-manufacturer">{product.manufacturer}</p>
//           <p className="product-weight">משקל: {product.weight} גרם</p>
//           <p className="product-price">מחיר: ₪{product.regularPrice}</p>
//           <div className="add-to-cart">
//             <button className="add-to-cart-button">הוסף לסל</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Products;


// import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import ProductDetails from "./ProductDetails";

// function Products() {
//   const { categoryId } = useParams();
//   const { search } = useLocation();
//   const isMainCategory =
//     new URLSearchParams(search).get("isMainCategory") === "true";
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     const fetchUrl = isMainCategory
//       ? `http://localhost:3001/api/products?mainCategoryId=${categoryId}`
//       : `http://localhost:3001/api/products?subCategoryId=${categoryId}`;

//     axios
//       .get(fetchUrl)
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, [categoryId, isMainCategory]);

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const closeProductDetails = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="products-container">
//       {products.map((product) => (
//         <div
//           className="product-card"
//           key={product.id}
//           onClick={() => handleProductClick(product)}
//         >
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="product-image"
//           />
//           {product.isOnSale === 1 && (
//             <span className="badge badge-sale">מבצע</span>
//           )}
//           {product.isNew === 1 && <span className="badge badge-new">חדש</span>}
//           <h3 className="product-name">{product.name}</h3>
//           <p className="product-manufacturer">{product.manufacturer}</p>
//           <p className="product-weight">משקל: {product.weight} גרם</p>
//           <p className="product-price">מחיר: ₪{product.regularPrice}</p>
//           <div className="add-to-cart">
//             <button className="add-to-cart-button">הוסף לסל</button>
//           </div>
//         </div>
//       ))}
//       {selectedProduct && (
//         <ProductDetails
//           product={selectedProduct}
//           onClose={closeProductDetails}
//         />
//       )}
//     </div>
//   );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductDetails from "./ProductDetails";

function Products() {
  const { categoryId } = useParams();
  const { search } = useLocation();
  const isMainCategory =
    new URLSearchParams(search).get("isMainCategory") === "true";
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({}); // עקיבה אחר כמות כל מוצר בסל

  useEffect(() => {
    const fetchUrl = isMainCategory
      ? `http://localhost:3001/api/products?mainCategoryId=${categoryId}`
      : `http://localhost:3001/api/products?subCategoryId=${categoryId}`;

    axios
      .get(fetchUrl)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryId, isMainCategory]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  // פונקציה להוספת מוצר לסל
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} נוסף לסל הקניות.`);
  };
    

  // פונקציה להפעלת אנימציית מעוף
  const animateImage = (productId) => {
    const image = document.getElementById(`image-${productId}`);
    image.classList.add("fly-to-cart");
    setTimeout(() => {
      image.classList.remove("fly-to-cart");
    }, 500);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
            id={`image-${product.id}`}
            onClick={() => handleProductClick(product)}
          />
          {product.isOnSale === 1 && <span className="badge badge-sale">מבצע</span>}
          {product.isNew === 1 && <span className="badge badge-new">חדש</span>}
          <h3 className="product-name">{product.name}</h3>
          <p className="product-manufacturer">{product.manufacturer}</p>
          <p className="product-weight">משקל: {product.weight} גרם</p>
          <p className="product-price">מחיר: ₪{product.regularPrice}</p>
          <div className="add-to-cart">
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
            >
              הוסף לסל
            </button>
            {quantities[product.id] > 0 && (
              <span>הוספת {quantities[product.id]} פעמים</span>
            )}
          </div>
        </div>
      ))}
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={closeProductDetails} />
      )}
    </div>
  );
}

export default Products;
