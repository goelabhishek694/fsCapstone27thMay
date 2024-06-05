const { ratingClasses } = require("@mui/material");

const createResource=function(modelName){
    console.log(modelName, " method created");
    return async (req,res)=>{
        try{
            console.log("create method called");
            const resourceData = await new modelName(req.body);
            const data= await resourceData.save();
            if(data) res.status(200).json({message:"data added successfully",data});
            else res.status(400).json({message:"data could not be added",data});
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    }
}

const getAllResource = function(modelName){
    return async (req,res)=>{
        try{
            let allResources = await modelName.find();
            if(allResources.length!=0){
                res.status(200).json({
                    message:"resource list",
                    data:allResources
                })
            }
            else{
                res.status(400).json({
                    message:"data not found"
                })
            }
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    }
}

const deleteResource = function(modelName){
    return async (req,res)=>{
        try{
            const {id} = req.params;
            //search my db for id 
            let deletedResource =  modelName.findOneAndDelete({_id:id});
            // findByIdAndDelete internally calls findOneAndDelete
            // let deletedUser = await UserModel.findByIdAndDelete(id);
            //delete if user is found
            if(!deletedResource){
                res.status(400).json({
                    message:"data not found"
                })
            }else{
                res.status(200).json({message:"resource deleted successfully"});
            }
        }catch(err){
            res.status(500).json({message:err.message});
        }
    }
    
}

const updateResource = function(modelName){
    return async(req,res)=>{
        try{
            const {id}=req.params;
            const dataToBeUpdated=req.body;
            const updatedResource = await modelName.findByIdAndUpdate(id,dataToBeUpdated,{returnDocument:'after',upsert:true});
            if(updatedResource){
                res.status(200).json({
                    message:"resource updated",
                    data:updatedResource
                })
            }else{
                res.status(400).json({
                    message:"data could not be updated"
                })
            }
        }catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    }
    
}

const getResourceById = function(modelName){
    return async (req,res)=>{
        try{
            let {id}=req.params;
            //search my db for id 
            const resource = await modelName.findById(id);
            // const user = await UserModel.find({_id:userid});
            // const user = await UserModel.findOne({_id:userid});
            //return if user is found
            if(!resource){
                res.status(400).json({
                    message:"data not found"
                })
            }else{
                //return the user
                res.status(200).json({data:resource});
            }
        }catch(err){
            res.status(500).json({message:err.message});
        }
    }
    
}

module.exports={
    createResource,
    deleteResource,
    updateResource,
    getAllResource,
    getResourceById
}



