const fs=require("fs");
// fs.writeFileSync("big.file",content);

const http =require("http");
const server=http.createServer();

server.on("request",(req,res)=>{
    const readStream=fs.createReadStream("./newbig.file");
    readStream.pipe(res);

    readStream.on("error",(err)=>{
        console.log("err",err);
        readStream.close();
    });
    
    readStream.on("end",()=>{
        console.log("data transferred");
        readStream.close();
    });

})

server.listen(3000,()=>{
    console.log("server started at 3000");
});