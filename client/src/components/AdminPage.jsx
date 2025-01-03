import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);
  const [isExpanded4, setIsExpanded4] = useState(false);

  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [productDetails, setProductDetails] = useState({
    manufacturer: "",
    name: "",
    regularPrice: "",
    businessPrice: "",
    imageUrl: "",
    weight: "",
    unitsPerCarton: "",
    barcode: "",
    isOnSale: false,
    isNew: false,
    subCategoryId: "",
    mainCategoryId: "", // הוספת הקטגוריה הראשית
  });

  // שליפת קטגוריות ותתי-קטגוריות מהשרת
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("http://localhost:3001/api/subcategories")
      .then((response) => setSubCategories(response.data))
      .catch((error) => console.error("Error fetching subcategories:", error));
  }, []);

  // פונקציה להוספת קטגוריה חדשה
  const handleAddCategory = async () => {
    try {
      await axios.post("http://localhost:3001/api/categories", {
        name: categoryName,
      });
      alert("קטגוריה נוספה בהצלחה!");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // פונקציה להוספת תת-קטגוריה חדשה
  const handleAddSubCategory = async () => {
    try {
      await axios.post("http://localhost:3001/api/subcategories", {
        name: subCategoryName,
        category_id: selectedCategoryId,
      });
      alert("תת-קטגוריה נוספה בהצלחה!");
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  // פונקציה להוספת מוצר חדש
  const handleAddProduct = async () => {
    // יצירת אובייקט חדש שבו יש וידוא על כל השדות המספריים
    const details = {
      ...productDetails,
      regularPrice: productDetails.regularPrice || 0,
      businessPrice: productDetails.businessPrice || 0,
      weight: productDetails.weight || 0,
      unitsPerCarton: productDetails.unitsPerCarton || 0,
    };

    try {
      console.log("Product Details:", details); // הצגת הנתונים בקונסולה כדי לוודא שהשדות מלאים כראוי
      await axios.post("http://localhost:3001/api/products", details);
      alert("מוצר נוסף בהצלחה!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!selectedCategoryId) {
      alert("אנא בחר קטגוריה למחיקה");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3001/api/categories/${selectedCategoryId}`
      );
      alert("קטגוריה נמחקה בהצלחה!");
      setCategories(
        categories.filter((category) => category.id !== selectedCategoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Delete subcategory
  const handleDeleteSubCategory = async () => {
    if (!selectedSubCategoryId) {
      alert("אנא בחר תת-קטגוריה למחיקה");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3001/api/subcategories/${selectedSubCategoryId}`
      );
      alert("תת-קטגוריה נמחקה בהצלחה!");
      setSubCategories(
        subCategories.filter(
          (subCategory) => subCategory.id !== selectedSubCategoryId
        )
      );
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <div className="admin-page">
    <Link to="/homePageAdmin">לחזרה לדף ניהול</Link>

      <h2>דף ניהול מוצרים וקטגוריות</h2>

      <div className="buttonsExpanded"> 
<button className="form-header" onClick={() => setIsExpanded1(!isExpanded1)}>להוספת קטגוריה</button>
<button className="form-header" onClick={() => setIsExpanded2(!isExpanded2)}>להוספת קטגוריה</button>
<button className="form-header" onClick={() => setIsExpanded3(!isExpanded3)}>להוספת קטגוריה</button>
<button className="form-header" onClick={() => setIsExpanded4(!isExpanded4)}>להוספת קטגוריה</button>

</div>

      {/* טופס להוספת קטגוריה */}
      {isExpanded1 && (  <div className="form-section">
        <h3 className="section-title">הוספת קטגוריה</h3>
        <input
          type="text"
          className="input-field"
          placeholder="שם הקטגוריה"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className="submit-button" onClick={handleAddCategory}>
          הוסף קטגוריה
        </button>
      </div>)}
     

      {/* טופס להוספת תת-קטגוריה */}
      {isExpanded2 && (     <div className="form-section">
        <h3 className="section-title">הוספת תת-קטגוריה</h3>
        <select
          className="select-field"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">בחר קטגוריה ראשית</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="input-field"
          placeholder="שם תת-הקטגוריה"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
        <button className="submit-button" onClick={handleAddSubCategory}>
          הוסף תת-קטגוריה
        </button>
      </div>)}

      
  
      <div className="form-section">
        <h3 className="section-title">מחיקת קטגוריה</h3>
        <select
          className="select-field"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">בחר קטגוריה למחיקה</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="submit-button" onClick={handleDeleteCategory}>
          מחק קטגוריה
        </button>
      </div>
      {/* Delete SubCategory */}
      <div className="form-section">
        <h3 className="section-title">מחיקת תת-קטגוריה</h3>
        <select
          className="select-field"
          value={selectedSubCategoryId}
          onChange={(e) => setSelectedSubCategoryId(e.target.value)}
        >
          <option value="">בחר תת-קטגוריה למחיקה</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
        </select>
        <button className="submit-button" onClick={handleDeleteSubCategory}>
          מחק תת-קטגוריה
        </button>
      </div>
      טופס להוספת מוצר
      <div className="form-section">
        <h3 className="section-title">הוספת מוצר</h3>
        <input
          type="text"
          className="input-field"
          placeholder="שם היצרן"
          value={productDetails.manufacturer}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              manufacturer: e.target.value,
            })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="שם המוצר"
          value={productDetails.name}
          onChange={(e) =>
            setProductDetails({ ...productDetails, name: e.target.value })
          }
        />
        <input
          type="number"
          className="input-field"
          placeholder="מחיר ללקוח רגיל"
          value={productDetails.regularPrice}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              regularPrice: e.target.value,
            })
          }
        />
        <input
          type="number"
          className="input-field"
          placeholder="מחיר ללקוח עסקי"
          value={productDetails.businessPrice}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              businessPrice: e.target.value,
            })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="כתובת לתמונה"
          value={productDetails.imageUrl}
          onChange={(e) =>
            setProductDetails({ ...productDetails, imageUrl: e.target.value })
          }
        />
        <input
          type="number"
          className="input-field"
          placeholder="משקל"
          value={productDetails.weight}
          onChange={(e) =>
            setProductDetails({ ...productDetails, weight: e.target.value })
          }
        />
        <input
          type="number"
          className="input-field"
          placeholder="כמות בקרטון"
          value={productDetails.unitsPerCarton}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              unitsPerCarton: e.target.value,
            })
          }
        />
 
        <input
          type="text"
          className="input-field"
          placeholder="מקט"
          value={productDetails.sku}
          onChange={(e) =>
            setProductDetails({ ...productDetails, sku: e.target.value })
          }
        />

        <select
          className="select-field"
          value={productDetails.mainCategoryId}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              mainCategoryId: e.target.value,
            })
          }
        >
          <option value="">בחר קטגוריה ראשית</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="select-field"
          value={productDetails.subCategoryId}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              subCategoryId: e.target.value,
            })
          }
        >
          <option value="">בחר תת-קטגוריה</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
        </select>

        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={productDetails.isOnSale}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                isOnSale: e.target.checked,
              })
            }
          />
          במבצע
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={productDetails.isNew}
            onChange={(e) =>
              setProductDetails({ ...productDetails, isNew: e.target.checked })
            }
          />
          מוצר חדש
        </label>

        <button className="submit-button" onClick={handleAddProduct}>
          הוסף מוצר
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
