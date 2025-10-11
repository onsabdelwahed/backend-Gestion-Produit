//routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const { auth, authorize } = require("../middlewares/auth");
const upload = require("../middlewares/upload");



router.post("/ajouter", auth, authorize("admin"), upload.single("imageProduit"), productController.ajouterProduit );
router.get("/", auth, productController.listerProduits );
router.get("/:id", auth, authorize("admin"), productController.getProductById );
router.patch('/:id', auth, authorize("admin"), productController.updateProduct);
router.delete('/:id', auth, authorize("admin"), productController.deleteProduct);
module.exports = router;

















