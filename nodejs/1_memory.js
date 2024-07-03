// copy a large file in th FileSystemDirectoryReader

// const content=(Math.random().toString(36).repeat(10000000));

const fs=require("fs");
// fs.writeFileSync("big.file",content);

const http =require("http");
const server=http.createServer();
server.listen(3000,()=>{
    console.log("server started at 3000");
});

server.on("request",(req,res)=>{
    fs.readFile("./big.file",(err,data)=>{
        if(err) throw err;
        res.end(data);
    })
})

// Solution -> streaming
