const express = require("express");
const reviewRouter = express.Router();
const {
  sanityMiddleware: payloadSanity,
} = require("../middlewares/sanityOfPayload");
const {productReviews,allProductReviews} = require("../controller/reviewController");
//   reviewRouter.use(protectRouteMiddleware)
reviewRouter.route("/:productId")
.get(productReviews) // show reviews of a particular ptoduct 
.post(productReview) // add a review , adjust the average rating , save to db 


//someone gave the product id rating title desc productid
reviewRouter.route("/").post(allProductReviews);

module.exports = {
  reviewRouter,
};
