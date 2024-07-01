const express=require("express");
const http=require("http");
const {Server} = require("socket.io");

//manage the app logic, routing , middleware 
const app=express();
app.use(express.static("public"))
//server lsitens for network request and can serve both http and WS requests 
// http server manages the lower level http comm b/w client and server 
const server=http.createServer(app);

const io=new Server(server);

io.on("connection",(socket)=>{
    console.log("a user connected ", socket.id);
    setInterval(()=>{
        socket.emit("message","message from server"+"-"+socket.id+"at "+new Date());
    },2000);

    socket.on("disconnect",()=>{
        console.log("user disconnected "+socket.id);
    })
});


app.get("/",(req,res)=>{
    res.send("Hello World")
});

server.listen(3000,()=>{console.log("listening on 3000")});

