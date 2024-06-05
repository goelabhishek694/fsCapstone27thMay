const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const {userRouter}=require("./routes/userRouter");
const {productRouter} = require("./routes/productRouter");
const { USERID, MONGODBPASSWORD,PORT } = process.env;

const app = express();
app.use(express.json());
const dbUrl = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.4jcbhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUrl)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(PORT, function (req, res) {
  console.log(`app is listening on port ${PORT}`);
});