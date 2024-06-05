const { ProductModel } = require("../models/productModel");
const {
  createResource,
  deleteResource,
  updateResource,
  getAllResource,
  getResourceById,
} = require("../utils/resourceFactory");

const getAllProducts = getAllResource(ProductModel);

const createProduct = createResource(ProductModel);

const deleteProduct = deleteResource(ProductModel);

const updateProduct = updateResource(ProductModel);

const getProductById = getResourceById(ProductModel);

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
};
