const express = require("express");
const mongoose = require("mongoose");
const rateLimit=require("express-rate-limit");
require("dotenv").config();
const {userRouter}=require("./routes/userRouter");
const {productRouter} = require("./routes/productRouter");
const {bookingRouter} = require("./routes/bookingRouter");
const {reviewRouter} = require("./routes/reviewRouter");
const { USERID, MONGODBPASSWORD,PORT } = process.env;
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
const cors=require("cors");
app.use(express.json());
app.use(mongoSanitize());
const dbUrl = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUrl)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });
const corsConfig={
  origin:true,
  credentials:true
};
app.use(cors(corsConfig));
// "Access-Control-Allow_origin":true,
//credentials : allows cookies and other credentials to be uincluded in the request .
const limiter=rateLimit({
  windowMs: 15*60*1000,
  limit:100
})
app.use("/api/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/review", reviewRouter);

app.listen(PORT, function (req, res) {
  console.log(`app is listening on port ${PORT}`);
});