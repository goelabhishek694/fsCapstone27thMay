const express = require("express");
const userRouter = express.Router();
const {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById,
  } = require("../controller/userController");
  const {
    sanityMiddleware: payloadSanity,
  } = require("../middlewares/sanityOfPayload");
userRouter
.route("/")
.get(getAllUsers)
.post(payloadSanity, createUser)

userRouter
.route("/:id")
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

module.exports={userRouter}