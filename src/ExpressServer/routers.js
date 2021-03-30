function route(app){
    app.post("/",(req,res)=>{
        res.send("Hello! this is post method!");
    });
    app.get("/",(req,res)=>{
        res.send("Hello! This is an index!");
        res.render("<p> this is a render status</p>");
    });
    app.get("/information",(req,res)=>{
        res.json({name:1});
    });

}

module.exports = route;