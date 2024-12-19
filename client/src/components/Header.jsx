import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import ProductDetails from "./ProductDetails"; // יבוא של דף פרטי המוצר
import { useUser } from "./UserContext";

function Header() {
  const { userInfo, logout } = useUser();
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
      <div className="Rectangle_header__search-1">
        <div className="item_left1">
          <Link to="/cart">צפייה בסל הקניות</Link>
        </div>
        <div className="item_center1">
        <img
          className="item_center"
          src="https://www.picshare.co.il/m_pictures/img164331.jpg"
          alt="לוגו חברה"
        />
        </div>
        <div className="item_right1">
          {userInfo && userInfo.userType === "manager" && (
            <Link to="/homePageAdmin">לצפיה בדף ניהול</Link>
          )}
          {userInfo ? (
            <button className="logout" onClick={logout}>
              התנתק
            </button>
          ) : (
            <Link to="/login">התחבר</Link>
          )}
        </div>
      </div>
      <div className="Rectangle_header__search-2">
        <div className="item_left2">  
                  {userInfo && <p className="hallow">שלום {userInfo.username} </p>}

        </div>
        <div className="item_center1">
        {selectedProduct && (
        <ProductDetails 
          product={selectedProduct}
          onClose={closeProductDetails}
        />
      )}
        </div>

        <div className="item_right2">    <div className="search-container">
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
          </div></div>
      </div>
      <div className="Rectangle_header__search-3">
      <Categories />

      </div>
    
      {/* <nav>
        <div className="item_left">
          {userInfo && <p className="hallow">שלום {userInfo.username} </p>}

          <div className="nav-links">
            <Link to="/cart">צפייה בסל הקניות</Link>
            {userInfo && userInfo.userType === "manager" && (
              <Link to="/homePageAdmin">לצפיה בדף ניהול</Link>
            )}
            {userInfo ? (
              <button className="logout" onClick={logout}>
                התנתק
              </button>
            ) : (
              <Link to="/login">התחבר</Link>
            )}
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
          src="https://www.picshare.co.il/m_pictures/img164331.jpg"
          alt="לוגו חברה"
        />
      </nav>
      <Categories />

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={closeProductDetails}
        />
      )}
       */}
    </header>
  );
}

export default Header;
