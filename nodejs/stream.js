// http -> req,res
// -> internally uses streams to break req/res data into chunks 
// receiving data in packets -> req-> read Stream 
// sending data in packets -> res -> writeStream 


//zlib -> bts in libraries frameworks to manage data efficiently 
// it provides data compression and decompression capabilities
// files 
// reading -> createReadStream -> my files get compressed 
// writing -> createWriteStram -> decompressed

// hw -> event emitter class 
const fs=require("fs");


const srcPath="./big.file";

const destPath="./newbig.file";

//you have crewted a read strea, at the srcPath location
const readStream=fs.createReadStream(srcPath);

const writeStream=fs.createWriteStream(destPath);

//connect
readStream.pipe(writeStream);

readStream.on("error",(err)=>{
    console.log("err",err);
    readStream.close();
});

readStream.on("end",()=>{
    console.log("data transferred");
    readStream.close();
});

