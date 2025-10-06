const express = require("express");
const router = express.Router();
const commandeCtrl = require("../controllers/commandeController");
const { auth, authorize } = require("../middlewares/auth");

// POST -> créer une commande
router.post("/", auth,  commandeCtrl.passerCommande);

// GET -> lister toutes les commandes
router.get("/", auth, authorize("admin"), commandeCtrl.listerCommande);

// DELETE -> supprimer une commande par id
router.delete("/:id", auth, authorize("admin"), commandeCtrl.deleteOrder);

// PUT -> remplacer une commande (envoyer l'objet complet dans body)
router.put("/:id", auth, authorize("admin"), commandeCtrl.updateCommande);

// PATCH -> mise à jour partielle (ex: statut)
router.patch("/:id/status", auth, authorize("admin"), commandeCtrl.updateCommandeStatus);

module.exports = router;
