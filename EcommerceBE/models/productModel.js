const {Schema,model} = require("mongoose");
const productSchema=new Schema({
    title:{
        type:String,
        required:true,
        minLength:[4,"product name should have atleast 4 characters"]
    },
    price:{
        type:Number,
        required:true,
        min:[0,"price cant be negative"]
    },
    discount:{
        type:Number,
        default:0,
        validate:[function(){
            return this.price>=this.discount
        },"discount cannot be more than price"]
    },
    description:String,
    brand:String,
    category:{
        type:String,
        default:"Miscellaneous",
        required:true
    },
    image:{
        type:String,
        default:"https://picsum.photos/200/300"
    }
},{timestamp:true});


const ProductModel=model("productModel",productSchema);
module.exports=ProductModel;