
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("hello...")
})

router.get('/m', (req,res)=>{
    res.send("hello m")
})

module.exports = router;
