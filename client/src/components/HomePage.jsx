// import React, { useState, useEffect } from "react";

// function HomePage() {
//   useEffect(() => {
//     if (!localStorage.getItem('cart')) {
//       localStorage.setItem('cart', JSON.stringify([]));
//     }
//   }, []);
  

  
//   return (
//     <div className="HomePage" >
//       <h2>ברוכים הבאים לחנות הבוטיק שלי</h2>
//       <p>עיין בקטגוריות שלנו ומצא את המוצרים הטובים ביותר עבורך!

// </p>
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
// <br />
//     </div>
//   );
// }

// export default HomePage;


import React, { useState, useEffect } from "react";

function HomePage() {
  useEffect(() => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, []);

  return (
    <body class="animated-background">
  <div class="home-page-container">
   
   <h2 className="welcome-message">ברוכים הבאים לחנות הבוטיק שלי</h2>
     <p className="intro-text">
     עיין בקטגוריות שלנו ומצא את המוצרים הטובים ביותר עבורך!
     </p>
  </div>
</body>

    // <>
    // <div className="home-page-container">
    //   <h2 className="welcome-message">ברוכים הבאים לחנות הבוטיק שלי</h2>
    //   <p className="intro-text">
    //     עיין בקטגוריות שלנו ומצא את המוצרים הטובים ביותר עבורך!
    //   </p>
     
    // </div>
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // <br />
    // </>
  );
}

export default HomePage;
