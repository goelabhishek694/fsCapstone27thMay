const http=require("http");

const server=http.createServer();

server.on("request",function(req,res){
    console.log("request has been made");
    res.end("Thanks for sending the request")
})

server.listen(3000,function(){
    console.log("started listening on port number 3000");
});
//port already in use 