const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"name cannot be empty"]
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8,"password should contain atleast 8 characters"]
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: [function () {
      return this.password == this.confirmPassword;
    },"{VALUE} did not match password"]
  },
  // createdAt:{
  //   type:Date,
  //   default: Date.now()
  // },
  role: {
    type:String,
    default:"admin"
  },
  bookings:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"BookingModel"
  }

},{ timestamps: true });

userSchema.pre("save",function(next){
  console.log("prehook is called");
  this.confirmPassword = undefined;
  next();
})
const roles=["admin","buyer","seller"];
userSchema.pre("save",function(next){
  let isPresent=roles.find(role=>role==this.role);
  if(!isPresent){
    const error=new Error("Role is invalid");
    next(error);
  }
  next();
})

userSchema.pre("findOne",function(next){
  console.log("user by id hook");
  console.log(this);
  // this.select("-password");
  next()
})
//can be used to handle errors related to unique :true 
userSchema.post("save",function(error,doc,next){
  console.log("post hook is called");
  if(error.code==11000) {
    next(new Error("email is already registered"))
  };
  console.log("document",doc);
  next();
})

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = {
  UserModel,
};
