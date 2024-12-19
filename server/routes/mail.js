require('dotenv').config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// הגדרת משתני סביבה
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// יצירת מחבר (Transporter)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// פונקציה לשליחת מייל
const sendEmail = async (to, subject, text, html ,attachments) => {
  try {
    const mailOptions = {
      from: EMAIL_USER, // השולח
      to : to, // הנמען
      subject: subject, 
      text: text, 
      html: html,
      attachments, 
          };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// ייצוא הפונקציה
module.exports = sendEmail;
