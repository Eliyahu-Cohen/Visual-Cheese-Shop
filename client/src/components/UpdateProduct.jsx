
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function UpdateProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [productDetails, setProductDetails] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/api/products/${id}`)
//       .then((response) => setProductDetails(response.data))
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]);

//   const handleUpdate = async () => {
//     console.log("Product details being sent to server:", productDetails); // לוג לבדיקה
//     try {
//       await axios.put(`http://localhost:3001/api/products/${id}`, productDetails);
//       alert("המוצר עודכן בהצלחה!");
//       navigate("/admin/products");
//     } catch (error) {
//       console.error("Error updating product:", error.response || error);
//       alert("אירעה שגיאה בעדכון המוצר.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3001/api/products/${id}`);
//       alert("המוצר נמחק בהצלחה!");
//       navigate("/");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("אירעה שגיאה במחיקת המוצר.");
//     }
//   };

//   if (!productDetails) {
//     return <p>טוען פרטי מוצר...</p>;
//   }

//   return (
//     <div className="update-product">
//       <h2>עדכון מוצר</h2>
//       <input
//         type="text"
//         value={productDetails.name}
//         onChange={(e) =>
//           setProductDetails({ ...productDetails, name: e.target.value })
//         }
//         placeholder="שם המוצר"
//       />
//       <input
//         type="number"
//         value={productDetails.regularPrice}
//         onChange={(e) =>
//           setProductDetails({
//             ...productDetails,
//             regularPrice: parseFloat(e.target.value),
//           })
//         }
//         placeholder="מחיר ללקוח רגיל"
//       />
//       <input
//         type="text"
//         value={productDetails.businessPrice}
//         onChange={(e) =>
//           setProductDetails({
//             ...productDetails,
//             businessPrice: e.target.value,
//           })
//         }
//         placeholder="מחיר לעסקים"
//       />
 
//       <input
//         type="text"
//         value={productDetails.sku}
//         onChange={(e) =>
//           setProductDetails({ ...productDetails, sku: e.target.value })
//         }
//         placeholder="מקט"
//       />
//       <input
//         type="number"
//         value={productDetails.unitsPerCarton}
//         onChange={(e) =>
//           setProductDetails({
//             ...productDetails,
//             unitsPerCarton: parseInt(e.target.value),
//           })
//         }
//         placeholder="יחידות בקרטון"
//       />
//       <input
//         type="text"
//         value={productDetails.manufacturer}
//         onChange={(e) =>
//           setProductDetails({
//             ...productDetails,
//             manufacturer: e.target.value,
//           })
//         }
//         placeholder="יצרן"
//       />
//       <input
//         type="text"
//         value={productDetails.imageUrl}
//         onChange={(e) =>
//           setProductDetails({ ...productDetails, imageUrl: e.target.value })
//         }
//         placeholder="כתובת לתמונה"
//       />
//       <input
//         type="number"
//         value={productDetails.weight}
//         onChange={(e) =>
//           setProductDetails({ ...productDetails, weight: parseFloat(e.target.value) })
//         }
//         placeholder="משקל"
//       />
//       <label>
//         <input
//           type="checkbox"
//           checked={productDetails.isNew === 1}
//           onChange={(e) =>
//             setProductDetails({
//               ...productDetails,
//               isNew: e.target.checked ? 1 : 0,
//             })
//           }
//         />
//         חדש
//       </label>
// <label>
//         <input
//           type="checkbox"
//           checked={productDetails.isOnSale === 1}
//           onChange={(e) =>
//             setProductDetails({
//               ...productDetails,
//               isOnSale: e.target.checked ? 1 : 0,
//             })
//           }
//         />
//         במבצע
//       </label>
//       <button onClick={handleUpdate}>עדכן מוצר</button>
//       <button onClick={handleDelete} style={{ color: "red" }}>
//         מחק מוצר
//       </button>
//     </div>
//   );
// }

// export default UpdateProduct;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((response) => setProductDetails(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, productDetails);
      alert("המוצר עודכן בהצלחה!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error.response || error);
      alert("אירעה שגיאה בעדכון המוצר.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      alert("המוצר נמחק בהצלחה!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("אירעה שגיאה במחיקת המוצר.");
    }
  };

  if (!productDetails) {
    return <p className="loading-text">טוען פרטי מוצר...</p>;
  }

  return (
    <section className="update-product-section">
      <header className="update-product-header">
        <h2>עדכון מוצר</h2>
      </header>
      <fieldset className="product-form">
        <legend>פרטי מוצר</legend>
        <label>
          שם המוצר:
          <input
            className="product-input product-name"
            type="text"
            value={productDetails.name}
            onChange={(e) =>
              setProductDetails({ ...productDetails, name: e.target.value })
            }
            placeholder="הזן שם מוצר"
          />
        </label>
        <label>
          מחיר ללקוח רגיל:
          <input
            className="product-input product-regular-price"
            type="number"
            value={productDetails.regularPrice}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                regularPrice: parseFloat(e.target.value),
              })
            }
            placeholder="הזן מחיר רגיל"
          />
        </label>
        <label>
          מחיר לעסקים:
          <input
            className="product-input product-business-price"
            type="number"
            value={productDetails.businessPrice}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                businessPrice: parseFloat(e.target.value),
              })
            }
            placeholder="הזן מחיר עסקים"
          />
        </label>
        <label>
          מקט:
          <input
            className="product-input product-sku"
            type="text"
            value={productDetails.sku}
            onChange={(e) =>
              setProductDetails({ ...productDetails, sku: e.target.value })
            }
            placeholder="הזן מקט"
          />
        </label>
        <label>
          יחידות בקרטון:
          <input
            className="product-input product-units-per-carton"
            type="number"
            value={productDetails.unitsPerCarton}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                unitsPerCarton: parseInt(e.target.value),
              })
            }
            placeholder="הזן יחידות בקרטון"
          />
        </label>
        <label>
          יצרן:
          <input
            className="product-input product-manufacturer"
            type="text"
            value={productDetails.manufacturer}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                manufacturer: e.target.value,
              })
            }
            placeholder="הזן יצרן"
          />
        </label>
        <label>
          כתובת לתמונה:
          <input
            className="product-input product-image-url"
            type="text"
            value={productDetails.imageUrl}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                imageUrl: e.target.value,
              })
            }
            placeholder="הזן URL לתמונה"
          />
        </label>
        <label>
          משקל:
          <input
            className="product-input product-weight"
            type="number"
            value={productDetails.weight}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                weight: parseFloat(e.target.value),
              })
            }
            placeholder="הזן משקל"
          />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={productDetails.isNew === 1}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                isNew: e.target.checked ? 1 : 0,
              })
            }
          />
          מוצר חדש
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={productDetails.isOnSale === 1}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                isOnSale: e.target.checked ? 1 : 0,
              })
            }
          />
          במבצע
        </label>
      </fieldset>
      <div className="button-container">
        <button className="update-button" onClick={handleUpdate}>
          עדכן מוצר
        </button>
        <button className="delete-button" onClick={handleDelete}>
          מחק מוצר
        </button>
      </div>
    </section>
  );
}

export default UpdateProduct;
