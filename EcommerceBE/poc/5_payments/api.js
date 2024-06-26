const express = require("express");
const dotenv = require("dotenv");
const RazorPay = require("razorpay");
const path = require("path");
const cors = require('cors');
const crypto=require("crypto");
const ShortUniqueId = require('short-unique-id');
const helmet=require("helmet");
const uid = new ShortUniqueId({ length: 10 });
dotenv.config({ path: path.join("../", "../", ".env") });
const { RAZORPAY_PUBLIC_KEY, RAZORPAY_PRIVATE_KEY, WEBHOOK_SECRET } = process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
var razorpayInstance = new RazorPay({
  key_id: RAZORPAY_PUBLIC_KEY,
  key_secret: RAZORPAY_PRIVATE_KEY,
});
app.post("/checkout", async (req, res) => {
  try {
    //get the required data fro checkout
    const amount = 500; //is in the smalles unit of currency
    //currency
    const currency = "INR";
    //receipt id
    const receipt = `rp_${uid.rnd()}`;
    const payment_capture = 1;
    const orderConfig = {
      amount: amount * 100,
      receipt,
      currency,
      payment_capture
    };
    //create an order
    const order = await razorpayInstance.orders.create(orderConfig);
    console.log(order);
    res.status(200).json({
      status: "success",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/verify",async(req,res)=>{
    try{
        // 1. fetch the signature from header 
        const inComingSignature=req.headers["x-razorpay-signature"];
        console.log(inComingSignature);
        // 2. crete a fresh signature from webhook secret and encryption 
        const shasum=crypto.createHmac("sha256",WEBHOOK_SECRET);
        shasum.update(JSON.stringify(req.body));
        const freshSignature=shasum.digest("hex");
        console.log(freshSignature);
        // 3. match header signature and fresh signature 
        if(freshSignature==inComingSignature){
            console.log("signature is valid");
            // const order_id=
            //do further processing 
            res.status(200).json({message:"success"})
        }else res.status(403).json({message:"invalid"})

    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
})

app.get("/",async(req,res)=>{
    res.status(200).json({
        status:"hello from public url"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})