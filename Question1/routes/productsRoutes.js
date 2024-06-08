const router = require("express").Router();
const products = require("../controllers/productCategory");
const tokenMiddleware = require("../middleware/auth");

router.get(
  "/company/:companyname/categories/:categoryname/products",
  tokenMiddleware,
  products.getProducts
);
router.get(
  "/categories/:categoryname/products/:productid",
  products.getProductById
);

module.exports = router;
