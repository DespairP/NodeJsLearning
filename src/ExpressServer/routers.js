function route(app){
    app.post("/",(req,res)=>{
        res.send("Hello! this is post method!");
    });
    app.get("/",(req,res)=>{
        res.send("Hello! This is an index!");
    });
    app.get("/information",(req,res)=>{
        res.json({name:1});
    });
    app.get("/ejs",(req,res)=>{
        res.render('user',{
            name: "this is a name"
        });
    });


}

module.exports = route;