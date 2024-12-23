import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
 

  // שליפת כל הקטגוריות
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);


  return (
    <div >
      {categories.map((category) => (
        <div
          key={category.id}
    
        >
          <Link
            key={category.id}
            to={`/products/${category.id}?isMainCategory=true`}
          >
            {category.name}
          </Link>
  
        </div>
      ))}
      <div >
      <Link to="/products?isOnSale=true">מבצע</Link>
</div>
   
      <Link to="/products?isNew=true">חדש</Link>

    </div>
  );
}
export default Categories;
