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
    },
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"ReviewModel"
    },
    averageRating:{
        type:Number,
        min:[1,"rating cannot be less than 1"],
        max:[5,"rating cannot be more than 5"]
    }
},{timestamp:true});


const ProductModel=model("productModel",productSchema);
module.exports=ProductModel;