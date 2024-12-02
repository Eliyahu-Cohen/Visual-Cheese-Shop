import React, { useState, useEffect } from "react";

function HomePage() {
  useEffect(() => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, []);
  

  
  return (
    <div>
      <h2>ברוכים הבאים לחנות הבוטיק שלי</h2>
      <p>עיין בקטגוריות שלנו ומצא את המוצרים הטובים ביותר עבורך!

</p>
    </div>
  );
}

export default HomePage;
