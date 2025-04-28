const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const ProductAccessor = require("../model/product");
const CategoryAccessor = require("../model/category");
const SubCategoryAccessor = require("../model/subcategory");

exports.findAllProducts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    const allProducts = await ProductAccessor.findAllProducts();
    res.status(200).json({
      products: allProducts,
    });
  } catch (e) {
    res.status(400).json({
      message: "Error",
      errors: e,
    });
  } finally {
    next();
  }
};

exports.getCategories = async (req, res, next) => {
  const categories = await CategoryAccessor.findAll();
  return res.status(200).json(categories);
}

exports.getSubcategoriesByCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array()
    });
  }
  const categoryId = req.params.categoryId;
  const subCategories = await SubCategoryAccessor.findAllByCategory(categoryId);
  return res.status(200).json(subCategories);
}

exports.postProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array()
    });
  }
  const productName = req.body.productName;
  const unitPrice = req.body.unitPrice;
  const market = req.body.market;
  const subcategoryId = req.body.subcategoryId;
  const newProduct = await ProductAccessor.insert(productName, unitPrice, market, subcategoryId);
  return res.status(200).json(newProduct);
}
