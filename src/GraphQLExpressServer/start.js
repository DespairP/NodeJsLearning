var express = require('express');
var router = require('./graphWithDefaultSchema');

var app = express();

router(app)

app.listen(3000,()=>{
    console.log('Server is running ✨✨✨')
})