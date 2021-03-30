var m = 2;

function a(){
    var k = 0;
    console.log('in base func');
    this.setA = (a)=>{k=a;};
    this.printA = ()=>{console.log(k)};
}
class person{
    
}

module.exports = a;