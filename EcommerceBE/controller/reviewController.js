const BookingModel = require("../models/bookingModel");
const ProductModel = require("../models/productModel");
const ReviewModel = require("../models/reviewModel");





const allProductReviews=async function(req,res){
    try {
        // 1. get the data from req.body-> rating review title ,desc, productid
        let {rating,review_title,review_desc,productId}=req.body;
        // 2. if anything is missing , give error 
        if(!rating || !review_desc || !review_title || !productId){
            return res.json(400).json({
                message:"rating,review_title,review_desc,productId are required",
                status:"failure"
            })
        }
        // 3. get the userId from req.userId
        let userId=req.userId;
        // 4. check if product is bought 
        const booking=await BookingModel.find({user:userId,product:productId});
        if(booking.status!=="success"){
            return res.status(400).json({
                message:"buy the product to add review",
                status : "failure"
            })
        }
        // const booking=await BookingModel.find({user:userId,product:productId,status:"success"});
        // 5. create the review 
        let reviewObject={
            rating,review_title,
            review_desc,
            product:productId,
            user:userId,
            booking:booking["_id"]
        }
        // 6. add that review to product 
        const review=await ReviewModel.create(reviewObject);
        const product=await ProductModel.findById(productId).populate({path:"reviews", select: "rating"})
        // 7. calculate the avg rating , update
        const allReviewOfAProduct=product.reviews;
        const numOfReviews=allProductReviews.length;
        let sum=0;
        allReviewOfAProduct.forEach(review=>sum+=review.rating);
        const newSum=sum+rating;
        const averageRating=newSum/(numOfReviews+1);
        product.reviews.push(review["_id"]);
        product.averageRating=averageRating;
        await product.save();

        res.status(200).json({
            message: review,
            status: "success"

        })


        
    } catch (error) {
        res.status(500).json({
            message: "server error",
            status: "failure"

        })
    }
}





module.exports={productReview,allProductReviews}