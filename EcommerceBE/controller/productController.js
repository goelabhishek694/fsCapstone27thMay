const {ProductModel}=require("../models/productModel");

const getAllProducts=async (req,res)=>{
    try{
        console.log("send data of all the users");
        let allData = await ModelX.find();
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
}

const createProduct=async (req,res)=>{
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
}

const deleteProduct=async (req,res)=>{
    try{
        const {id} = req.params;
        //search my db for id 
        let deletedUser = await UserModel.findOneAndDelete({_id:id});
        // findByIdAndDelete internally calls findOneAndDelete
        // let deletedUser = await UserModel.findByIdAndDelete(id);
        //delete if user is found
        if(!deletedUser){
            res.status(400).json({
                message:"user not found"
            })
        }else{
            res.status(200).json({message:"user deleted successfully"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const updateProduct=async(req,res)=>{
    try{
        const {id}=req.params;
        const dataToBeUpdated=req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(id,dataToBeUpdated,{returnDocument:'after',upsert:true});
        if(updatedUser){
            res.status(200).json({
                message:"user profile updated",
                user:updatedUser
            })
        }else{
            res.status(400).json({
                message:"user profile could not be updated"
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const getProductById=async (req,res)=>{
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
}

module.exports={
    getAllProducts,createProduct,deleteProduct,updateProduct,getProductById
}
