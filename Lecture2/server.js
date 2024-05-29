const express=require("express");
const fs=require("fs");
//server is created
const app=express();
const userDataDB=fs.readFileSync("./dev-data.json","utf-8");


const addUser=()=>{
    console.log("a new user has signed up");
    // res.status(200).json({
    //     message:"user data list",
    //     data:userDataDB
    // })
}

const updateUser=()=>{
    console.log("user profile updated");
}

const deleteUser=()=>{
    console.log("user profile deleted");
}

app.get("/user",(req,res)=>{
    console.log("send data of all the users");
    res.status(200).json({
        message:"user data list",
        data:userDataDB
    })
});
app.post("/user",addUser);
app.put("/user",updateUser);
app.delete("/user",deleteUser);




//this function catches any request that comes to the server . 
app.use(function(req,res){
    console.log("received req");
    res.json({
        "message":"response from servers"
    })
})

app.listen(3000,function(req,res){
    console.log("app is listening on port 3000");
})