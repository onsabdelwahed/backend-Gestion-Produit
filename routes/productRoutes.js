//routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/ajouter",  productController.ajouterProduit );
router.get("/", productController.listerProduits );
router.get("/:id", productController.getProductById );
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
module.exports = router;

















