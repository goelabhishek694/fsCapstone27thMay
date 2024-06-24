const RazorPay = require("razorpay");
const dotenv = require("dotenv");
const path=require("path");
dotenv.config({ path: path.join("../", "../", ".env") });
const { RAZORPAY_PUBLIC_KEY, RAZORPAY_PRIVATE_KEY, WEBHOOK_SECRET } = process.env;
const ProductModel = require("../models/productModel");
const { UserModel } = require("../models/userModel");
const BookingModel = require("../models/bookingModel");

var razorpayInstance = new RazorPay({
    key_id: RAZORPAY_PUBLIC_KEY,
    key_secret: RAZORPAY_PRIVATE_KEY,
  });

async function initialBooking(req,res){
    try{
        // 1. loggedin->token->userid
        const userId=req.userId;
        const user =await UserModel.findById(userId);
        // 2. productid -> frontend 
        const productId=req.body.productId;
        const product=await ProductModel.findById(productId);
        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }
        // 3. search the product -> get its price 
        const price=product.price; //500 rupees
        const payment_capture=1;
        const orderConfig={
            amount:price*100, //50000 paise
            currency:"INR",
            payment_capture
        }
        // 4. create the orde via razorpay -> order_id
        const order = await razorpayInstance.orders.create(orderConfig);
        // 5. create an actual booking . 
        const bookingDetails={
            price,
            payment_order_id:order.id,
            user:userId,
            product:productId
        }
        const booking=await BookingModel.create(bookingDetails);
        user.bookings.push(booking["_id"]);
        await user.save();
        // 6. return the order to fe 
        res.status(200).json({
            status:"success",
            message:{
                order,
                email:user.email,
                nane:user.name,
                receipt:booking["_id"]
            }
        })
    }catch(err){
        console.log(error);
        res.status(500).json({
            message: "server error"
        })
    }
}

async function getAllBookings(req,res){
    try {
        //send all the bookings/orders received 
        // const bookings=await BookingModel.find().populate("user");
        const bookings=await BookingModel.find().populate({path:"user", select: "name email"}).populate({path:"product", select:"price discount category"});
        res.status(200).json({
            status:"success",
            message:{
                bookings
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error"
        })
    }
}

async function confirmBooking(req,res){
    try {
        // verify -> the request from -> api
        const inComingSignature = req.headers['x-razorpay-signature'];
        // create the hash
        const shasum = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
        shasum.update(JSON.stringify(req.body));
        const freshSignature = shasum.digest('hex');
        if (freshSignature === inComingSignature) {
            // 2. get the order_id from the request
            const body = req.body;
            const order_id = body.payload.payment.enitity.order_id;
            const event = body.event;
            const booking = await BookingModel.find({ payment_order_id: order_id });
            if (event === "payment.captured") {
                // go to the booking -> update the status -> success or a failure
                booking.status = "success";
                await booking.save();
            } else {
                booking.status = "failure";
                await booking.save();
            }
            console.log(req.body);
            res.status(200).json({ message: "OK" });
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "server error"
        })
    }
}

async function userOrder(req,res){
    try {
       const userId=req.userId;
       const bookings=await UserModel.findById(userId).populate("bookings") ;
       res.status(200).json({
        status:"success",
        message:{
            bookings
        }
       })
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: "server error"
        })
    }
}

module.exports={
    initialBooking,getAllBookings,confirmBooking,userOrder
}