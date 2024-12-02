// require('dotenv').config();
// const mysql = require('mysql2');

// // יצירת חיבור למסד הנתונים
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // מתן אפשרות לשימוש ב-Promises
// const promisePool = pool.promise();

// module.exports = promisePool;
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // מארח נפרד
  port: process.env.DB_PORT,       // יציאה נפרדת
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();
module.exports = promisePool;