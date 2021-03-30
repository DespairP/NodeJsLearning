const mongoose = require('mongoose');
const express = require('express');
const router = require('./routers');

const app = express();

router(app);


app.listen(3000,()=>{
    console.log("🎈🎈🎈Server is on!");
});

