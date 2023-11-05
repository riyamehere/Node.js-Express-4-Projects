const express = require("express");
const router = express.Router();

//getting the modules
const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

//exporting the route module
module.exports = router;
