//routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { auth, authorize } = require("../middlewares/auth");

router.post("/ajouter", auth, authorize("admin"),  productController.ajouterProduit );
router.get("/", auth, productController.listerProduits );
router.get("/:id", auth, authorize("admin"), productController.getProductById );
router.put('/:id', auth, authorize("admin"), productController.updateProduct);
router.delete('/:id', auth, authorize("admin"), productController.deleteProduct);
module.exports = router;

















