const {UserModel}=require("../models/userModel")
const {ProductModel}=require("../models/productModel")
const createFactory=function(modelName){
    console.log(modelName, " method created");
    return async (req,res)=>{
        try{
            console.log("create method called");
            const resourceData = new modelName(req.body);
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

const createUser=createFactory(UserModel);
const createProduct=createFactory(ProductModel);

createUser()
createProduct()



class FactoryMethods{

    static 
}