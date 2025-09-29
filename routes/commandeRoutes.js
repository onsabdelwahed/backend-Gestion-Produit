///// routes/commandeRoutes.js
const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");

router.post("/ajouter", commandeController.passerCommande);
router.get("/", commandeController.listerCommande);

module.exports = router;
