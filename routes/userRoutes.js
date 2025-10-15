const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const authCtrl = require("../controllers/authController");
const { auth, authorize } = require("../middlewares/auth");
const upload = require("../middlewares/upload");


// Auth routes
router.post("/register",  upload.single("image"), authCtrl.register);
router.post("/login", authCtrl.login);

router.get("/", auth, authorize("admin"), userCtrl.listerUtilisateurs); // liste (peut être admin seulement selon besoin)
router.post("/ajouter", auth, authorize("admin"), upload.single("image"), userCtrl.ajouterUtilisateur); // création (admin)
router.get("/:id", auth, authorize("admin"),  userCtrl.getUtilisateur); // récup par id
router.put("/:id", auth, authorize("admin"), userCtrl.modifierUtilisateur); // maj complète (admin)
router.patch("/:id", auth, authorize("admin"), userCtrl.modifierPartielUtilisateur); // maj partielle (admin ou user lui-même selon logique)
router.delete("/:id", auth, authorize("admin"), userCtrl.supprimerUtilisateur); // suppression (admin)
router.post("/delete-multiple", auth, authorize("admin"),  userCtrl.supprimerPlusieurs); // suppression multiple

module.exports = router;
