const express=require("express");
const fs=require("fs");
const app=express();

function getUser(fPath){
    return JSON.parse(fs.readFileSync(fPath,"utf-8"));
}

function handleUserData(req,res){
    try{
        const userDataStore=getUser("./dev-data.json");
        let msg=userDataStore.length==0 ? "no users found" : userDataStore;
        if(msg=="no users found"){
            return res.status(404).json({
                status:"fail",
                message:msg
            })
        }
        return res.status(200).json({
            status:"success",
            message:msg
        })
    }catch(err){
        console.error("Error reading user data:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

app.get("/api/user",handleUserData);

module.exports=app;
