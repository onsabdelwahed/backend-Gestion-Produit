//routes/categorieRoutes.js
const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorieController");

router.get("/",  categorieController.listerCategorie); // afficher tous les catégorie
router.post("/ajouter",  categorieController.createCategorie);// création d'une catégorie
router.get("/:id",  categorieController.getCtaegorieById); // récupérer catégorie  par id
router.put("/:id",  categorieController.updateCategorie); // modification compléte de catégorie
router.patch("/:id",  categorieController.updateCategorie); // maj partielle : méthode mizelt ma5dmthch fel controller 
router.delete("/:id",  categorieController.deleteCategorie); // suppression d"une catégorie 

module.exports = router;