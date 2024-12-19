import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // שליפת כל הקטגוריות
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // שליפת כל תתי-הקטגוריות
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/subcategories")
      .then((response) => {
        const subCategoryMap = {};
        response.data.forEach((subCategory) => {
          if (!subCategoryMap[subCategory.category_id]) {
            subCategoryMap[subCategory.category_id] = [];
          }
          subCategoryMap[subCategory.category_id].push(subCategory);
        });
        setSubCategories(subCategoryMap);
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  }, []);

  return (
    <div className="categories">
      <Link to="/products?isOnSale=true">מבצע</Link>
      <Link to="/products?isNew=true">חדש</Link>

      {categories.map((category) => (
        <div
          key={category.id}
          className="category-item"
          onMouseEnter={() => setHoveredCategory(category.id)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <Link
            key={category.id}
            to={`/products/${category.id}?isMainCategory=true`}
          >
            {category.name}
          </Link>
          {hoveredCategory === category.id && subCategories[category.id] && (
            <div className="subcategories">
              {subCategories[category.id].map((sub) => (
                <Link
                  key={sub.id}
                  to={`/products/${sub.id}?isMainCategory=false`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Categories;
