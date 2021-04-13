const mongoose = require('mongoose')

const options = {discriminatorKey: 'userType'};

const userSchema = mongoose.Schema({password:String},options);

const userModel = mongoose.model('user',userSchema);
const emailUserModel = userModel.discriminator('emailuser',mongoose.Schema({email:String}),options);
const normalUserModel = userModel.discriminator('normaluser',mongoose.Schema({username:String}),options);
const phoneUserModel = userModel.discriminator('phoneuser',mongoose.Schema({phone:String}),options);

function DiscriminatorBuild(){
    //const demo_1 = new emailUserModel({email:"123@outlook.com" , password:"123"});
    //const demo_2 = new emailUserModel({email:"456@outlook.com" , password:"456"});
    
    //const demo_3 = new normalUserModel({username:"normal_1", password:"123"});
    //const demo_4 = new normalUserModel({username:"normal_2", password:"456"});
    
    //const demo_5 = new phoneUserModel({phone:"phone_1", password:"123"});

    //Promise.all([demo_1.save(),demo_2.save(),demo_3.save(),demo_4.save(),demo_5.save()]).then(() => userModel.countDocuments());

    userModel.find({},(err,doc)=>{doc.forEach(x=>console.log(x))});
}

module.exports = {DiscriminatorBuild,userModel,emailUserModel,normalUserModel,phoneUserModel};