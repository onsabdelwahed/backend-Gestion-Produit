const mongoose = require("mongoose");
const User = require("../models/User");

// Ajouter un utilisateur (admin uniquement)
exports.ajouterUtilisateur = async (req, res) => {
  try {
    const nouvelUser = new User(req.body);
    await nouvelUser.save();
    res.status(201).json(nouvelUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur d’ajout", error: err.message });
  }
};

// Récupérer tous les utilisateurs (optionnel: pagination / filtre)
exports.listerUtilisateurs = async (req, res) => {
  try {
    // Exemples de query params: ?page=1&limit=20&search=ons
    const { page = 1, limit = 50, search } = req.query;
    const query = {};

    if (search) {
      // recherche basique sur nom ou email (ajuste les champs selon ton modèle)
      query.$or = [
        { nom: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    const total = await User.countDocuments(query);

    res.json({
      meta: { total, page: Number(page), limit: Number(limit) },
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Récupérer un utilisateur par id
exports.getUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Mettre à jour un utilisateur (remplacement complet - PUT)
exports.modifierUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    // option { new: true } pour renvoyer le doc mis à jour
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updated) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour", error: err.message });
  }
};

// Mise à jour partielle (PATCH)
exports.modifierPartielUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updated) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Erreur de mise à jour partielle", error: err.message });
  }
};

// Supprimer un utilisateur
exports.supprimerUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé avec succès", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: "Erreur de suppression", error: err.message });
  }
};

// Supprimer plusieurs utilisateurs (ex: body: { ids: ['id1','id2'] }) - admin only
exports.supprimerPlusieurs = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Liste d'ids requise" });
    }

    const invalid = ids.filter((i) => !mongoose.Types.ObjectId.isValid(i));
    if (invalid.length) {
      return res.status(400).json({ message: "Certains IDs sont invalides", invalid });
    }

    const result = await User.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Suppression effectuée", deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
