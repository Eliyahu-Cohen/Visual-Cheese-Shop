// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 3001;

// // הגדרת הנתיבים לכל משאב
// const categoriesRoutes = require('./routes/categories');
// const productsRouter = require('./routes/products');
// const usersRoutes = require('./routes/users');
// const subcategories = require('./routes/subcategories');

// app.use(cors());
// app.use(express.json());

// app.use('/api/categories', categoriesRoutes);
// app.use('/api/subcategories', subcategories);
// app.use('/api/products', productsRouter);
// app.use('/api/users', usersRoutes);

// app.get('/', (req, res) => {
//   res.send("hello... bb");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./db");

// הגדרת הנתיבים לכל משאב
const categoriesRoutes = require("./routes/categories");
const productsRouter = require("./routes/products");
const usersRoutes = require("./routes/users");
const subcategoriesRoutes = require("./routes/subcategories");
const ordersRoutes = require("./routes/orders");

app.use(cors());
app.use(express.json());

// שימוש בנתיבים
app.use("/api/categories", categoriesRoutes);
app.use("/api/subcategories", subcategoriesRoutes);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes); // נתיב להזמנות

// דף בית
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API!");
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
