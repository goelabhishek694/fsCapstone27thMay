const {UserModel}=require("../models/userModel");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
dotenv.config();
const { USERID, MONGODBPASSWORD } = process.env;

function encryptPassword(Model){
    const dbUrl = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.connect(dbUrl)
    .then(() => {
        console.log("db connected");
       return Model.find()
    })
    .then(async (userList)=>{
        for(let i=0;i<userList.length;i++){
            const user=userList[i];
            const hashedPassword=await bcrypt.hash(user.password,10);
            user.password=hashedPassword;
            user.confirmPassword=undefined;
            await user.save({validateBeforeSave:false})
        }
    })
    .then(()=>{
        console.log("passowrd updated successfully");
    })
    .catch((err) => {
        console.log(err.message);
    })
    .finally(()=>{
        console.log("password encrypted");
        mongoose.disconnect();
        console.log("connection closed");
    });

}

encryptPassword(UserModel);