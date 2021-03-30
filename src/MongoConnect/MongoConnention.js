var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/",{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{console.log(err)});
const db = mongoose.connection;
db.once('open',()=>{
    console.log("ok!");
});