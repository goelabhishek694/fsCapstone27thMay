const mongoose=require("mongoose");

let bookingSchemObject={
    bookedAt:{
        type:Date,
        default:Date.now()
    },
    //this is total price after discount and promotions
    price:{
        type:Number,
        required:true
    },
    payment_order_id:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserModel"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"productModel"
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","success","falure"]
    },
    quantity:{
        type:Number,
        default:1,
    }
}

const bookingSchema=new mongoose.Schema(bookingSchemObject);

const BookingModel=mongoose.model("BookingModel",bookingSchema);

module.exports=BookingModel;