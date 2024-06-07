const express = require("express");
const mongoose = require("mongoose");
// const path=require("path");
// require("dotenv").config({path:path.join(__dirname,"../",".env")});
require("dotenv").config();
const { USERID, MONGODBPASSWORD,PORT } = process.env;
const app = express();
app.use(express.json());
const dbUrl = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUrl)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });
const ProductModel=require("../models/productModel");
app.get("/api/user/:id",function(req,res){
    const {params,query}=req;

    res.json({queryParmas:req.query, pathParams:params})
})

app.get("/api/product",async(req,res)=>{
    //sort paginate limit 
    const {query:{sort,page,limit}} = req;
    let [prop,order]=sort.split("_");
    // price:1 -> asc 
    // price : -1 -> desc 
    order = order == "desc" ? -1 : 1;
    //page no 
    // let page=query.page;
    //limit
    // let limit=query.limit;
    console.log(prop,order,limit,page);
    let ppp=2;
    let productToSkip=ppp*(page-1)
    let query=ProductModel.find().sort({[prop]:order}).skip(productToSkip).limit(ppp);
    let data=await query;
    res.status(200).json(data);



})


app.listen(PORT, function (req, res) {
    console.log(`app is listening on port ${PORT}`);
  });