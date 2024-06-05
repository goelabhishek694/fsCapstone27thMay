const express=require("express");
const mongoose=require("mongoose");
require('dotenv').config();
const {sanityMiddleware:payloadSanity}=require("./middlewares/sanityOfPayload");
const {getAllUsers,createUser,deleteUser,updateUser,getUserById} = require("./controller/userController");
const {getAllProducts,createProduct,deleteProduct,updateProduct,getProductById} = require("./controller/productController");
const {USERID,MONGODBPASSWORD} = process.env;

const app=express();
app.use(express.json());
const dbUrl=`mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUrl).then(connection=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err.message);
})

// user routes
app.get("/api/users",getAllUsers);

app.post("/api/user",payloadSanity,createUser);

app.patch("/api/user/:id",updateUser);

app.delete("/api/user/:id",deleteUser);

app.get("/api/user/:userid",getUserById)

//product routes

app.get("/api/product",getAllProducts);

app.post("/api/product",payloadSanity,createProduct);

app.patch("/api/product/:id",updateProduct);

app.delete("/api/product/:id",deleteProduct);
//to get a specific user

app.get("/api/product/:userid",getProductById)


app.listen(3000,function(req,res){
    console.log("app is listening on port 3000");
})