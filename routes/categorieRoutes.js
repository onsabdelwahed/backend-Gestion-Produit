//routes/categorieRoutes.js
const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorieController");
const { auth, authorize } = require("../middlewares/auth");

router.get("/", auth,  categorieController.listerCategorie); // afficher tous les catégorie
router.post("/ajouter", auth, authorize("admin"),  categorieController.createCategorie);// création d'une catégorie
router.get("/:id", auth, authorize("admin"),  categorieController.getCategorieById); // récupérer catégorie  par id
router.put("/:id", auth, authorize("admin"),  categorieController.updateCategorie); // modification compléte de catégorie
router.delete("/:id", auth, authorize("admin"), categorieController.deleteCategorie); // suppression d"une catégorie 

module.exports = router;