import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUserInfo(null);
  };

 
  const login = (user) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    setUserInfo(user); // עדכון המידע הגלובלי על המשתמש
  };
  
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo,  login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
