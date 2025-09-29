const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");


router.get("/",  userCtrl.listerUtilisateurs); // liste (peut être admin seulement selon besoin)
router.post("/ajouter",  userCtrl.ajouterUtilisateur); // création (admin)
router.get("/:id",  userCtrl.getUtilisateur); // récup par id
router.put("/:id",  userCtrl.modifierUtilisateur); // maj complète (admin)
router.patch("/:id",  userCtrl.modifierPartielUtilisateur); // maj partielle (admin ou user lui-même selon logique)
router.delete("/:id",  userCtrl.supprimerUtilisateur); // suppression (admin)
router.post("/delete-multiple",  userCtrl.supprimerPlusieurs); // suppression multiple

module.exports = router;
