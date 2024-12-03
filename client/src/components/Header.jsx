// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Categories from "./Categories";

// function Header() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   // פונקציית חיפוש עם debounce
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         fetchSuggestions(searchTerm);
//       } else {
//         setSuggestions([]);
//         setDropdownVisible(false);
//       }
//     }, 300); // עיכוב של 300ms

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm]);

//   const fetchSuggestions = async (term) => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/api/products/search`, {
//         params: { name: term },
//       });
//       setSuggestions(data);
//       setDropdownVisible(true);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   };

//   const handleSuggestionClick = (productName) => {
//     setSearchTerm(productName);
//     setDropdownVisible(false); // סגירת התפריט
//   };

//   return (
//     <header className="Rectangle_header">
//       <nav>
//         <div className="item_left">
//           <Link to="/AdminPage">להוספת מוצר/קטגוריה</Link>
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="חיפוש מוצר"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//             {isDropdownVisible && (
//               <ul className="search-suggestions">
//                 {suggestions.map((product) => (
//                   <li
//                     key={product.id}
//                     onClick={() => handleSuggestionClick(product.name)}
//                     className="suggestion-item"
//                   >
//                     {product.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <Link to="/cart">צפייה בסל הקניות</Link>
//         </div>
//         <img
//           className="item_center"
//           src="https://images.pexels.com/photos/80453/poppy-field-of-poppies-flower-flowers-80453.jpeg?auto=compress&cs=tinysrgb&w=600"
//           alt="לוגו חברה"
//         />
//         <div className="item_right">
//           <Link to="/login">כניסה / רישום</Link>
//         </div>
//       </nav>
//       <Categories />
//     </header>
//   );
// }

// export default Header;

// import React from "react";
// import { Link } from "react-router-dom";
// import Categories from "./Categories";
// function Header() {
//   return (
//     <header className="Rectangle_header">
//       <nav>
//         <div className="item_left">
//         <Link to={"/AdminPage"}>להוספת מוצר/קטגוריה</Link>
//           <input type="text" placeholder="חיפוש מוצר" />
//           <Link to="/cart">צפייה בסל הקניות</Link>
//         </div>
//         <img className="item_center" src="https://images.pexels.com/photos/80453/poppy-field-of-poppies-flower-flowers-80453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="לוגו חברה" />
//         <div className="item_right">
//         <Link to="/login">כניסה / רישום</Link>
//         </div>
//       </nav>

//         <Categories/>

//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import ProductDetails from "./ProductDetails"; // יבוא של דף פרטי המוצר

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // סטייט למוצר הנבחר

  // פונקציית חיפוש עם debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
        setDropdownVisible(false);
      }
    }, 300); // עיכוב של 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSuggestions = async (term) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/products/search`,
        {
          params: { name: term },
        }
      );
      setSuggestions(data);
      console.log(data);

      setDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // const handleSuggestionClick = (product) => {
  //   setSelectedProduct(product);  // עדכון המוצר הנבחר
  //   setDropdownVisible(false);    // סגירת התפריט
  // };
  const handleSuggestionClick = (product) => {
    setSelectedProduct(product);
    console.log("all -", suggestions);

    setDropdownVisible(false);
    console.log(product); // הוספת שורת ההדפסה
  };

  const closeProductDetails = () => {
    setSelectedProduct(null); // סגירת פרטי המוצר
  };

  return (
    <header className="Rectangle_header">
      <nav>
        <div className="item_left">
        <div className="nav-links">
  <Link to="/AdminPage">להוספת מוצר/קטגוריה</Link>
  <Link to="/adminOrders">לצפיה בהזמנות</Link>
  <Link to="/cart">צפייה בסל הקניות</Link>
  <Link to="/adminUsers">צפייה בנתוני משתמשים</Link>
</div>


          <div className="search-container">
            <input
              type="text"
              placeholder="חיפוש מוצר"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {isDropdownVisible && (
              <ul className="search-suggestions">
                {suggestions.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)} // העברת המוצר שנבחר
                    className="suggestion-item"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
        </div>
        <img
          className="item_center"
          src="https://images.pexels.com/photos/80453/poppy-field-of-poppies-flower-flowers-80453.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="לוגו חברה"
        />
        <div className="item_right">
          <Link to="/login">כניסה / רישום</Link>
        </div>
      </nav>
      <Categories />

      {/* הצגת פרטי המוצר */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={closeProductDetails}
        />
      )}
    </header>
  );
}

export default Header;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Categories from "./Categories";
// import ProductDetails from "./ProductDetails"; // יבוא של דף פרטי המוצר

// function Header() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null); // סטייט למוצר הנבחר
//   const navigate = useNavigate();

//   // פונקציית חיפוש עם debounce
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         fetchSuggestions(searchTerm);
//       } else {
//         setSuggestions([]);
//         setDropdownVisible(false);
//       }
//     }, 300); // עיכוב של 300ms

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm]);

//   const fetchSuggestions = async (term) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:3001/api/products/search`,
//         {
//           params: { name: term },
//         }
//       );
//       setSuggestions(data);
//       setDropdownVisible(true);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   };

//   const handleSuggestionClick = (product) => {
//     setSelectedProduct(product);
//     setDropdownVisible(false);
//   };

//   const closeProductDetails = () => {
//     setSelectedProduct(null); // סגירת פרטי המוצר
//   };

//   return (
//     <header className="header-container">
//       <nav className="nav-container">
//         <div className="nav-left">
//           <Link to="/AdminPage" className="nav-link">
//             להוספת מוצר/קטגוריה
//           </Link>
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="חיפוש מוצר"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//             {isDropdownVisible && (
//               <ul className="search-suggestions">
//                 {suggestions.map((product) => (
//                   <li
//                     key={product.id}
//                     onClick={() => handleSuggestionClick(product)} // העברת המוצר שנבחר
//                     className="suggestion-item"
//                   >
//                     {product.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <Link to="/cart" className="nav-link">
//             צפייה בסל הקניות
//           </Link>
//         </div>
//         <img
//           className="logo-center"
//           src="https://images.pexels.com/photos/80453/poppy-field-of-poppies-flower-flowers-80453.jpeg?auto=compress&cs=tinysrgb&w=600"
//           alt="לוגו חברה"
//         />
//         <div className="nav-right">
//           <Link to="/login" className="nav-link">
//             כניסה / רישום
//           </Link>
//         </div>
//       </nav>
//       <Categories />
//       {/* הצגת פרטי המוצר */}
//       {selectedProduct && (
//         <ProductDetails
//           product={selectedProduct}
//           onClose={closeProductDetails}
//         />
//       )}
//     </header>
//   );
// }

// export default Header;
