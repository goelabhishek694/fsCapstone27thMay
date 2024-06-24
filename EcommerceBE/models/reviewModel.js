const mongoose=require("mongoose");

let reviewSchemObject={
    //this is total price after discount and promotions
    rating:{
        type:Number,
        required:true,
        min:[1,"rating cannot be less than 1"],
        max:[5,"rating cannot be more than 5"]
    },
    review_title:{
        type:String,
        required:true
    },
    review_desc:{
        type:String,
        required:true
    },
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"BookingModel"
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
    }
}

const reviewSchema=new mongoose.Schema(reviewSchemObject,{ timestamps: true });

const ReviewModel=mongoose.model("ReviewModel",reviewSchema);

module.exports=ReviewModel;