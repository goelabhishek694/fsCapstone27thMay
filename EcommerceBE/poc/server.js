const express=require("express");
const fs=require("fs");
//server is created
const app=express();
const userDataDB=JSON.parse(fs.readFileSync("./dev-data.json","utf-8"));
const { v4: uuidv4 } = require('uuid');
app.use(express.json());


const updateUser=()=>{
    console.log("user profile updated");
}

const sanityMiddleware=(req,res,next)=>{
    try{
        console.log("in sanityMiddleware");
        let user=req.body;
        let isEmpty=Object.keys(user).length==0;
        if(isEmpty){
            res.status(400).json({
                status:"fail",
                message:"user is not present"
            })
        }else next()
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

//this is a middleware 
app.use(function(req,res,next){
    console.log("req received");
    next();
})

app.get("/api/users",(req,res)=>{
    try{
        console.log("send data of all the users");
        res.status(200).json({
            message:"user data list",
            data:userDataDB
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
});
app.post("/api/user",sanityMiddleware,(req,res)=>{
    try{
        // console.log(req.body);
        //get the new user
        let newUser=req.body;
        let id=uuidv4();
        newUser.id=id;
        // add this new user to db 
        userDataDB.push(newUser.hello);
        fs.writeFileSync("./dev-data.json",JSON.stringify(userDataDB));
        //res with success message
        res.status(200).json({message:"user added successfully"});
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
});
app.patch("/api/user",updateUser);
app.delete("/api/user/:id",(req,res)=>{
    try{
        const {id} = req.params;
        //search my db for id 
        let idx=userDataDB.findIndex((userObj)=>{
            return userObj.id==id
        })
        //delete if user is found
        if(idx==-1){
            res.status(400).json({
                message:"user not found"
            })
        }else{
            //delete the user
            userDataDB.splice(idx,1);
            fs.writeFileSync("./dev-data.json",JSON.stringify(userDataDB));
            //res with success message
            res.status(200).json({message:"user deleted successfully"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
//to get a specific user
app.get("/api/user/:userid",(req,res)=>{
    try{
        let {userid}=req.params;
        //search my db for id 
        let user=userDataDB.find((userObj)=>{
            return userObj.id==userid
        })
        //return if user is found
        if(!user){
            res.status(400).json({
                message:"user not found"
            })
        }else{
            //return the user
            res.status(200).json({data:user});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})



//this function catches any request that comes to the server . 
// app.use(function(req,res){
//     console.log("received req");
//     res.json({
//         "message":"response from servers"
//     })
// })

app.listen(3000,function(req,res){
    console.log("app is listening on port 3000");
})