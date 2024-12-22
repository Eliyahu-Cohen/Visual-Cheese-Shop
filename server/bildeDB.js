const express = require('express');
const router = express.Router();
const db = require('../db');

// פונקציה שתבצע את כל יצירת הדאטה
const createDatabase = async () => {
  try {
    // יצירת בסיס הנתונים אם לא קיים
    await db.query("CREATE DATABASE IF NOT EXISTS `shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;");
    await db.query("USE `shop`;");

    // יצירת טבלאות
    await db.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`username\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`address\` varchar(255) DEFAULT NULL,
        \`userType\` enum('regular','business','manager','admin') DEFAULT 'regular',
        \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`phone\` varchar(15) DEFAULT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`username\` (\`username\`),
        UNIQUE KEY \`email\` (\`email\`),
        UNIQUE KEY \`phone\` (\`phone\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`categories\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`subcategories\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`category_id\` int DEFAULT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`category_id\` (\`category_id\`),
        CONSTRAINT \`subcategories_ibfk_1\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`products\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`manufacturer\` varchar(255) DEFAULT NULL,
        \`name\` varchar(255) NOT NULL,
        \`regularPrice\` decimal(10,2) DEFAULT NULL,
        \`businessPrice\` decimal(10,2) DEFAULT NULL,
        \`imageUrl\` varchar(255) DEFAULT NULL,
        \`weight\` decimal(10,2) DEFAULT NULL,
        \`unitsPerCarton\` int DEFAULT NULL,
        \`sku\` varchar(255) DEFAULT NULL,
        \`isOnSale\` tinyint(1) DEFAULT '0',
        \`isNew\` tinyint(1) DEFAULT '0',
        \`subCategoryId\` int DEFAULT NULL,
        \`mainCategoryId\` int DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    // הוספת נתונים לדאטה
    await db.query(`
      INSERT INTO \`categories\` (\`name\`) VALUES
      ('גבינות'),
      ('מוצרים מן החי'),
      ('דגים'),
      ('נקניקים'),
      ('ריבה'),
      ('משקאות'),
      ('קפואים'),
      ('אסייתי'),
      ('מתוקים');
    `);

    await db.query(`
      INSERT INTO \`subcategories\` (\`name\`, \`category_id\`) VALUES
      ('גבינות מדף', 1),
      ('גבינות בוטיק', 1),
      ('גבינות רכות', 1),
      ('גבינות קשות', 1),
      ('מוצרים יבשים', 2),
      ('בשר', 2),
      ('דגים', 3),
      ('נקניקיות', 4),
      ('ריבות', 5),
      ('סודה', 6),
      ('מיצים', 6),
      ('מאפים', 7),
      ('פירות', 7),
      ('צ'יפס', 7),
      ('גלידות', 7),
      ('ירקות', 7),
      ('ממרחים', 7),
      ('סושי', 8),
      ('עוגות', 9),
      ('שוקולדים', 9);
    `);

    await db.query(`
      INSERT INTO \`products\` (\`name\`, \`regularPrice\`, \`businessPrice\`, \`imageUrl\`, \`weight\`, \`unitsPerCarton\`, \`sku\`, \`subCategoryId\`, \`mainCategoryId\`) VALUES
      ('גבינת מוצרלה', 20.50, 18.50, 'https://example.com/mozzarella.jpg', 250, 12, 'MOZ001', 1, 1),
      ('גבינת צהובה קשה', 35.00, 30.00, 'https://example.com/cheddar.jpg', 400, 8, 'CHD001', 1, 1),
      ('גבינת פריזאי', 25.00, 22.50, 'https://example.com/parmesan.jpg', 300, 6, 'PAR001', 1, 1),
      ('גבינת פטה בוטיק', 45.00, 40.00, 'https://example.com/feta.jpg', 200, 5, 'FET001', 2, 1);
    `);

    console.log('Database and tables created, and data inserted successfully.');
  } catch (error) {
    console.error('Error while creating database and inserting data:', error);
  }
};

// יצירת הדאטה בעת קריאת הדף
router.get('/binit-db', async (req, res) => {
  await createDatabase();
  res.send('Database and data creation completed!');
});

module.exports = router;



// -- יצירת בסיס הנתונים
// CREATE DATABASE IF NOT EXISTS `שוופ` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
// USE `שוופ`;

// -- יצירת טבלת users
// CREATE TABLE `users` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `username` varchar(255) NOT NULL,
//   `password` varchar(255) NOT NULL,
//   `email` varchar(255) NOT NULL,
//   `address` varchar(255) DEFAULT NULL,
//   `userType` enum('regular','business','manager','admin') DEFAULT 'regular',
//   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//   `phone` varchar(15) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `username` (`username`),
//   UNIQUE KEY `email` (`email`),
//   UNIQUE KEY `phone` (`phone`)
// ) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- יצירת טבלת categories
// CREATE TABLE `categories` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `name` varchar(255) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- יצירת טבלת subcategories
// CREATE TABLE `subcategories` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `name` varchar(255) NOT NULL,
//   `category_id` int DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   KEY `category_id` (`category_id`),
//   CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- יצירת טבלת products
// CREATE TABLE `products` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `manufacturer` varchar(255) DEFAULT NULL,
//   `name` varchar(255) NOT NULL,
//   `regularPrice` decimal(10,2) DEFAULT NULL,
//   `businessPrice` decimal(10,2) DEFAULT NULL,
//   `imageUrl` varchar(255) DEFAULT NULL,
//   `weight` decimal(10,2) DEFAULT NULL,
//   `unitsPerCarton` int DEFAULT NULL,
//   `sku` varchar(255) DEFAULT NULL,
//   `isOnSale` tinyint(1) DEFAULT '0',
//   `isNew` tinyint(1) DEFAULT '0',
//   `subCategoryId` int DEFAULT NULL,
//   `mainCategoryId` int DEFAULT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- יצירת טבלת orders
// CREATE TABLE `orders` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `user_id` int NOT NULL,
//   `username` varchar(255) NOT NULL,
//   `phone` varchar(15) NOT NULL,
//   `total_price` decimal(10,2) NOT NULL,
//   `status` enum('בהמתנה','בביצוע','נשלח','הושלם') DEFAULT 'בהמתנה',
//   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//   PRIMARY KEY (`id`),
//   KEY `user_id` (`user_id`),
//   CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
// ) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- יצירת טבלת order_products
// CREATE TABLE `order_products` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `order_id` int NOT NULL,
//   `product_id` int NOT NULL,
//   `product_name` varchar(255) NOT NULL,
//   `product_price` decimal(10,2) NOT NULL,
//   `quantity` int NOT NULL,
//   PRIMARY KEY (`id`),
//   KEY `order_id` (`order_id`),
//   CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
// ) ENGINE=InnoDB AUTO_INCREMENT=273 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// -- יצירת טבלת monthly_sales
// CREATE TABLE `monthly_sales` (
//   `id` int NOT NULL AUTO_INCREMENT,
//   `product_id` int NOT NULL,
//   `year` int NOT NULL,
//   `month` int NOT NULL,
//   `total_quantity` int DEFAULT '0',
//   PRIMARY KEY (`id`),
//   KEY `product_id` (`product_id`),
//   CONSTRAINT `monthly_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



// -- הוספת קטגוריות ראשיות
// INSERT INTO `categories` (`name`) VALUES
// ('גבינות'),
// ('מוצרים מן החי'),
// ('דגים'),
// ('נקניקים'),
// ('ריבה'),
// ('משקאות'),
// ('קפואים'),
// ('אסייתי'),
// ('מתוקים');


// -- הוספת תת-קטגוריות לקטגוריות ראשיות
// INSERT INTO `subcategories` (`name`, `category_id`) VALUES
// -- גבינות
// ('גבינות מדף', 1),
// ('גבינות בוטיק', 1),
// ('גבינות רכות', 1),
// ('גבינות קשות', 1),
// -- מוצרים מן החי
// ('מוצרים יבשים', 2),
// ('בשר', 2),
// -- דגים
// ('דגים', 3),
// -- נקניקים
// ('נקניקיות', 4),
// -- ריבה
// ('ריבות', 5),
// -- משקאות
// ('סודה', 6),
// ('מיצים', 6),
// -- קפואים
// ('מאפים', 7),
// ('פירות', 7),
// ('צ'יפס', 7),
// ('גלידות', 7),
// ('ירקות', 7),
// ('ממרחים', 7),
// -- אסייתי
// ('סושי', 8),
// -- מתוקים
// ('עוגות', 9),
// ('שוקולדים', 9);


// -- הוספת תת-קטגוריות לקטגוריות ראשיות
// INSERT INTO `subcategories` (`name`, `category_id`) VALUES
// -- גבינות
// ('גבינות מדף', 1),
// ('גבינות בוטיק', 1),
// ('גבינות רכות', 1),
// ('גבינות קשות', 1),
// -- מוצרים מן החי
// ('מוצרים יבשים', 2),
// ('בשר', 2),
// -- דגים
// ('דגים', 3),
// -- נקניקים
// ('נקניקיות', 4),
// -- ריבה
// ('ריבות', 5),
// -- משקאות
// ('סודה', 6),
// ('מיצים', 6),
// -- קפואים
// ('מאפים', 7),
// ('פירות', 7),
// ('צ'יפס', 7),
// ('גלידות', 7),
// ('ירקות', 7),
// ('ממרחים', 7),
// -- אסייתי
// ('סושי', 8),
// -- מתוקים
// ('עוגות', 9),
// ('שוקולדים', 9);

// -- הוספת מוצרים
// INSERT INTO `products` (`name`, `regularPrice`, `businessPrice`, `imageUrl`, `weight`, `unitsPerCarton`, `sku`, `subCategoryId`, `mainCategoryId`) VALUES
// -- גבינות מדף
// ('גבינת מוצרלה', 20.50, 18.50, 'https://example.com/mozzarella.jpg', 250, 12, 'MOZ001', 1, 1),
// ('גבינת צהובה קשה', 35.00, 30.00, 'https://example.com/cheddar.jpg', 400, 8, 'CHD001', 1, 1),
// ('גבינת פריזאי', 25.00, 22.50, 'https://example.com/parmesan.jpg', 300, 6, 'PAR001', 1, 1),
// -- גבינות בוטיק
// ('גבינת פטה בוטיק', 45.00, 40.00, 'https://example.com/feta.jpg', 200, 5, 'FET001', 2, 1),
// ('גבינת רוקפור', 55.00, 50.00, 'https://example.com/roquefort.jpg', 250, 4, 'ROQ001', 2, 1),
// -- גבינות רכות
// ('גבינת ריקוטה', 20.00, 18.00, 'https://example.com/ricotta.jpg', 200, 10, 'RIC001', 3, 1),
// ('גבינת קוטג', 15.00, 13.50, 'https://example.com/cottage.jpg', 250, 12, 'COT001', 3, 1),
// -- גבינות קשות
// ('גבינת גבנ"צ', 30.00, 27.00, 'https://example.com/hard_cheese.jpg', 350, 8, 'HARD001', 4, 1),
// -- מוצרים מן החי
// ('בשר טחון', 50.00, 45.00, 'https://example.com/minced_meat.jpg', 500, 10, 'MINC001', 5, 2),
// ('סטייק פריזאי', 100.00, 90.00, 'https://example.com/steak.jpg', 800, 6, 'STK001', 5, 2),
// -- דגים
// ('דג סלמון', 60.00, 55.00, 'https://example.com/salmon.jpg', 300, 8, 'SALM001', 6, 3),
// ('דג טונה', 50.00, 45.00, 'https://example.com/tuna.jpg', 400, 7, 'TUNA001', 6, 3),
// -- נקניקים
// ('נקניק סלמי', 40.00, 35.00, 'https://example.com/salami.jpg', 250, 10, 'SLA001', 7, 4),
// ('נקניק פסטרמה', 45.00, 40.00, 'https://example.com/pastrami.jpg', 300, 6, 'PAS001', 7, 4),
// -- ריבה
// ('ריבת תות', 25.00, 22.00, 'https://example.com/strawberry_jam.jpg', 200, 12, 'STRAW001', 8, 5),
// ('ריבת משמש', 28.00, 25.00, 'https://example.com/apricot_jam.jpg', 220, 10, 'APRICOT001', 8, 5),
// -- משקאות
// ('מיץ תפוזים', 15.00, 12.50, 'https://example.com/orange_juice.jpg', 1000, 12, 'OJ001', 9, 6),
// ('קולה', 7.00, 6.00, 'https://example.com/coke.jpg', 500, 24, 'COK001', 9, 6),
// -- קפואים
// ('מאפה בורקס', 18.00, 16.00, 'https://example.com/burekas.jpg', 150, 15, 'BUR001', 10, 7),
// ('פירות קפואים', 22.00, 20.00, 'https://example.com/frozen_fruits.jpg', 500, 10, 'FRU001', 11, 7),
// -- אסייתי
// ('סושי רול', 50.00, 45.00, 'https://example.com/sushi_roll.jpg', 250, 8, 'SUSHI001', 12, 8),
// -- מתוקים
// ('עוגת שוקולד', 30.00, 27.00, 'https://example.com/chocolate_cake.jpg', 400, 6, 'CAKE001', 13, 9),
// ('שוקולד מריר', 10.00, 9.00, 'https://example.com/dark_chocolate.jpg', 100, 24, 'DARK001', 13, 9);

// INSERT INTO `orders` (`user_id`, `username`, `phone`, `total_price`, `status`) VALUES
// (1, 'user1', '0501234567', 250.00, 'בהמתנה'),
// (2, 'user2', '0502345678', 175.00, 'בביצוע'),
// (3, 'user3', '0503456789', 300.00, 'נשלח'),
// (4, 'user4', '0504567890', 150.00, 'הושלם');

// INSERT INTO `order_products` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`) VALUES
// (1, 1, 'גבינת מוצרלה', 20.50, 5),
// (1, 2, 'גבינת צהובה קשה', 35.00, 3),
// (2, 3, 'גבינת פריזאי', 25.00, 4),
// (3, 4, 'גבינת גבנ"צ', 30.00, 2),
// (4, 5, 'בשר טחון', 50.00, 1),
// (4, 6, 'סטייק פריזאי', 100.00, 2);

// INSERT INTO `monthly_sales` (`product_id`, `year`, `month`, `total_quantity`) VALUES
// (1, 2024, 12, 50),
// (2, 2024, 12, 30),
// (3, 2024, 12, 25),
// (4, 2024, 12, 15),
// (5, 2024, 12, 40),
// (6, 2024, 12, 20),
// (7, 2024, 12, 35),
// (8, 2024, 12, 60);
