var http = require('http');
var url = require("url");

function start(route) {
    function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");
      var post = "";
      request.on("data", (chunk)=>{
        post+=chunk;
      })
      
      route(pathname);

      // 解析 url 参数
      var params = url.parse(request.url, true).query;

      
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write('<head><meta charset="utf-8"/></head>');
      response.write("有数值：" + params.s,"utf-8");
      response.write("Hello World");
      response.end();
    }
   
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
  }

exports.start = start;