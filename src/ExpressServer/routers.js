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
            a:1
        })
    });
    
    app.get('/user/:id',(req,res)=>{
        res.send("x");
    });

    app.param('id',(req,res,next,id)=>{
        console.log("access");
        next();
    });
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error.ejs');
      });
}

module.exports = route;