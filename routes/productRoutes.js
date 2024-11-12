const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  authorization,
  verifyAdminRole,
} = require("../middleware/authorisationHandler");
const router = express.Router();

router.post("/", authorization, verifyAdminRole, createProduct);
router.get("/", getProducts);
router.put("/:id", authorization, verifyAdminRole, updateProduct);
router.delete("/:id", authorization, verifyAdminRole, deleteProduct);

module.exports = router;
