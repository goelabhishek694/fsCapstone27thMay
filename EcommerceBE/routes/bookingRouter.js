const express = require("express");
const bookingRouter = express.Router();
const {
    sanityMiddleware: payloadSanity,
  } = require("../middlewares/sanityOfPayload");
  const {
    initialBooking,getAllBookings,confirmBooking,userOrder
  } = require("../controller/bookingController");
//   bookingRouter.use(protectRouteMiddleware)
  bookingRouter.route("/").get(getAllBookings);

  bookingRouter.route("/checkout").post(initialBooking)

  bookingRouter.route("/verify").post(confirmBooking);
  bookingRouter.route("/orders").get(userOrder)

  module.exports={
    bookingRouter
  }