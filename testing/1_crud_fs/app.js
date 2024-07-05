const express=require("express");
const fs=require("fs");
const app=express();

function getUser(fPath){
    try{
        return JSON.parse(fs.readFileSync(fPath,"utf-8"));
    }
    catch(err){
        throw new Error(err);
    }
}

function handleUserData(req,res){
    try{
        const userDataStore=getUser("./dev-data.json");
        let msg=userDataStore.length==0 ? "no users found" : userDataStore;
        if(msg=="no users found"){
            return res.status(404).json({
                status:"fail",
                message:msg,
                data:userDataStore
            })
        }
        return res.status(200).json({
            status:"success",
            message:msg
        })
    }catch(err){
        console.log("Error reading user data:", err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
}
console.log("hello -> ",process.env.MODE);
app.get("/api/user",handleUserData);
if(process.env.MODE !== "test"){
    //if mode is not equal to test then srver will be started 
    const port= process.env.PORT || 3000 ;
    app.listen(port, () => {
        console.log(`server is listening at PORT ${port}`);
    });
}else module.exports=app;
