
import React, { useEffect, useState } from "react";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

import axios from "axios";
import ProductDetails from "./ProductDetails";

function Products(props) {
  const { categoryId } = useParams();
  const { search } = useLocation();
    const navigate = useNavigate();
  const isMainCategory = new URLSearchParams(search).get("isMainCategory") === "true";
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [filter, setFilter] = useState(null); // משתנה לאחסון הסינון של המוצרים
  const { userInfo } = useUser();


  const location = useLocation();

  // שליפת פרמטרים מה-URL
  const searchParams = new URLSearchParams(location.search);
  const isOnSale = searchParams.get('isOnSale'); // אם יש 'isOnSale'
  const isNew = searchParams.get('isNew'); 
  
    // המרת הערכים ל-boolean (אם הם 'true', הם יהפכו ל-true, אחרת ל-false)
    const isOnSaleBool = isOnSale === 'true';
    const isNewBool = isNew === 'true';


useEffect(() => {
  let fetchUrl;

  if (isNew === "true") {
    // בקשה למוצרים חדשים
    fetchUrl = `http://localhost:3001/api/products?isNew=true`;
  } else if (isOnSale === "true") {
    // בקשה למוצרים במבצע
    fetchUrl = `http://localhost:3001/api/products?isOnSale=true`;
  } else if (isMainCategory) {
    // בקשה לפי קטגוריה ראשית
    fetchUrl = `http://localhost:3001/api/products?mainCategoryId=${categoryId}`;
  } else {
    // בקשה לפי תת-קטגוריה
    fetchUrl = `http://localhost:3001/api/products?subCategoryId=${categoryId}`;
  }

  // שליחת הבקשה לשרת
  axios
    .get(fetchUrl)
    .then((response) => setProducts(response.data))
    .catch((error) => console.error("Error fetching products:", error));
}, [categoryId, isMainCategory, isOnSale, isNew]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };
const handleUpdateProduct = (productId) => {
  navigate(`/admin/products/${productId}`);
};


  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartMessage(`${product.name} נוסף לסל הקניות.`);
    setTimeout(() => setCartMessage(""), 1700);
  };

  return (
    <div className="products-container">
      {cartMessage && (
        <div className="cart-message">
          {cartMessage}
        </div>
      )}
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
          {userInfo && userInfo.userType === "manager" &&   <button
            className="update-button"
            onClick={() => handleUpdateProduct(product.id)}
          >
            עדכון מוצר
         </button>   }
 
          <div className="add-to-cart">
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
            >
              הוסף לסל
            </button>
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