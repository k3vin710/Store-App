const express = require("express");
const { body, param} = require("express-validator");

const productController = require("../controller/product");

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.get("/", productController.findAllProducts);

router.get(
    '/category',
    isAuthenticated,
    productController.getCategories
)

router.get(
    '/subcategory/:categoryId',
    isAuthenticated,
    [
        param('categoryId')
            .trim()
            .isInt()
    ],
    productController.getSubcategoriesByCategory
)

router.post(
    '/',
    isAuthenticated,
    [
        body('productName')
            .trim()
            .isLength({max: 200}),
        body('unitPrice')
            .isDecimal(),
        body('market')
            .isInt(),
        body('subcategoryId')
            .isInt()
    ],
    productController.postProduct
)

module.exports = router;
