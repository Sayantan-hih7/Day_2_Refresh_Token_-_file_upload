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
const { configureUploader } = require("../config/dynamicFileUploader");
const productImageUpload = configureUploader({
  allowedFormats: ['jpg', 'jpeg', 'png'],
  fileSize: 1 * 1024 * 1024, // 1MB
  folder: 'profile-images',
});

router.post("/", authorization, verifyAdminRole, productImageUpload.single('image'), createProduct);
router.get("/", getProducts);
router.put("/:id", authorization, verifyAdminRole, updateProduct);
router.delete("/:id", authorization, verifyAdminRole, deleteProduct);

module.exports = router;
