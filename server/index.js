
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
const mail = require("./routes/mail");
const sales = require("./routes/sales");

app.use(cors());
app.use(express.json());

// שימוש בנתיבים
app.use("/api/categories", categoriesRoutes);
app.use("/api/subcategories", subcategoriesRoutes);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes); // נתיב להזמנות
app.use("/api/send-email",mail)
app.use("/api/sales", sales)

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
