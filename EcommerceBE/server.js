require('dotenv').config();
const {USERID,MONGODBPASSWORD} = process.env;
const express=require("express");
//server is created
const app=express();
const { v4: uuidv4 } = require('uuid');
const mongoose=require("mongoose");
app.use(express.json());
const dbUrl=`mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const {UserModel}=require("./userModel");
mongoose.connect(dbUrl).then(connection=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err.message);
})


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

app.get("/api/users",async (req,res)=>{
    try{
        console.log("send data of all the users");
        let allUsers = await UserModel.find();
        if(allUsers.length!=0){
            res.status(200).json({
                message:"user data list",
                data:allUsers
            })
        }
        else{
            res.status(400).json({
                message:"no users found"
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
});
app.post("/api/user",sanityMiddleware,async (req,res)=>{
    try{
        // console.log(req.body);
        //get the new user
        let newUser= new UserModel(req.body);
        const user= await newUser.save();
        if(user) res.status(200).json({message:"user added successfully",user});
        else res.status(400).json({message:"user could not be registered",user});
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
});
// app.patch("/api/user",updateUser);
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
app.get("/api/user/:userid",async (req,res)=>{
    try{
        let {userid}=req.params;
        //search my db for id 
        const user = await UserModel.findById(userid);
        console.log(user);
        // const user = await UserModel.find({_id:userid});
        // const user = await UserModel.findOne({_id:userid});
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

app.listen(3000,function(req,res){
    console.log("app is listening on port 3000");
})


// findByidandUpdate
// findByidandDelete
