// controllers/commandeController.js
const Commande = require("../models/commande"); // modèle Commande (Mongoose)
const Product = require("../models/product");

// Créer / Passer une commande
exports.passerCommande = async (req, res) => {
  try {
    const nouvelCommande = new Commande(req.body);
    await nouvelCommande.save();
    return res.status(201).json(nouvelCommande);
  } catch (err) {
    return res.status(400).json({ message: "Erreur d’ajout", error: err.message });
  }
};

// Récupérer toutes les commandes
exports.listerCommande = async (req, res) => {
  try {
    const commandes = await Commande.find();
    return res.json(commandes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Supprimer une commande (DELETE)
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Commande.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Commande introuvable" });
    return res.json({ message: "Commande supprimée", id: req.params.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Modifier une commande (PUT — remplacement complet)
exports.updateCommande = async (req, res) => {
  try {
    // ici on attend un objet complet de commande dans req.body
    const updated = await Commande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, overwrite: true } // overwrite true = remplacer
    );
    if (!updated) return res.status(404).json({ message: "Commande introuvable" });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Mettre à jour partiellement le statut (PATCH — modification partielle)
exports.updateCommandeStatus = async (req, res) => {
  try {
    const { statut } = req.body;
    if (typeof statut === "undefined") {
      return res.status(400).json({ message: "Champ 'statut' requis pour ce endpoint." });
    }

    const updated = await Commande.findByIdAndUpdate(
      req.params.id,
      { $set: { statut } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Commande introuvable" });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
