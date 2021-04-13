const mongoose = require('mongoose');

function basicBuild(){
    //构建一个schema模型
    const testSchema = mongoose.Schema({
        name: String,
        grade: Number
    });


    //给模型加入方法
    testSchema.methods.findIt = function(){
        console.log(this.name);
    }

    testSchema.virtual('mixed').get(function(){
        return `${this.name} ${this.grade}`;
    })

    //甚至可以动态find
    testSchema.methods.getSpecialWithGrade = function(fun){
        return mongoose.model('test','test').find({grade: this.grade},fun);
    }

    testSchema.statics.findAll = function(fun){
        return this.find({},fun);
    }

    const test = mongoose.model('test',testSchema,'test');


    test.findOne(
        {grade: 12},
        function (err, doc) {
            console.log(doc);
            doc.getSpecialWithGrade((err, doc)=>{
                console.log(doc);
            })

        }).exec();
    console.log("\n\n\n")

    test.findAll((err, doc)=>{
        doc.forEach(x => console.log(x + "   " +x.mixed))
    })
}

module.exports = basicBuild;