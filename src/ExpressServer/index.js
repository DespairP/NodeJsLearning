const mongoose = require('mongoose');
const express = require('express');
const router = require('./routers');
const ejs = require('ejs');
var path = require("path");

const app = express();


app.engine('.html', ejs.renderFile);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

router(app);

app.listen(3000,()=>{
    console.log(`🎈🎈🎈Server is on! http://localhost:3000`);
});

