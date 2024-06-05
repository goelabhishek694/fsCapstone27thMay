const express = require("express");
const productRouter = express.Router();
const {
    sanityMiddleware: payloadSanity,
  } = require("../middlewares/sanityOfPayload");
  const {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
  } = require("../controller/productController");

  productRouter
    .route("/")
    .get(getAllProducts)
    .post(payloadSanity, createProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

  module.exports={
    productRouter
  }