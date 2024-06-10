// Migration Script : 
// create update delete hge set of entries from the db 
// migration is completely independent of our server
// seed the data 
// update the data due to schema changes , security isseu , performance issue 
// delete data 

// Steps for a migration script 
// 1. Connect to the DB
// 2. Identify the collection / model where you want to make the changes
// 3. Ge the list of entries and Identify the query will be used and apply it 
//         * updateMany 
//         * deleteMany 
//         * insertMany 
// 4. close the connection

const ProductModel=require("../models/productModel");
const productList=require("../json/products");
function seedProductData(model,entries){
    const mongoose=require("mongoose");
    const dotenv=require("dotenv");
    dotenv.config();
    const { USERID, MONGODBPASSWORD } = process.env;
    const dbUrl = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.connect(dbUrl)
    .then(() => {
        console.log("db connected");
        console.log("dropping exisitng model");
        return model.collection.drop();
    })
    .then(() => {
        console.log("insert documents in db");
        return model.insertMany(entries);
    })
    .catch((err) => {
        console.log(err.message);
    })
    .finally(()=>{
        console.log("documnets added");
        mongoose.disconnect();
        console.log("connection closed");
    });
}

seedProductData(ProductModel,productList);

