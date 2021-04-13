const mongoose = require('mongoose');
const basicBuild = require('./demo_1');
const DiscriminatorBuild = require('./DiscriminatorDemo');

// Connect MongoDB at default port 27017.
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

//basicBuild();
DiscriminatorBuild();