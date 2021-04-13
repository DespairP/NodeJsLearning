const mongoose = require('mongoose');


function build(){
    mongoose.connect('mongodb://localhost:27017/springTest', {
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else {
            console.log('Error in DB connection: ' + err)
        }
    });
    return mongoose;
}

module.exports = build;
