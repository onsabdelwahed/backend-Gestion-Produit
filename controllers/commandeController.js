// controllers/commandeController.js
const commande = require("../models/commande");
const Commande = require("../models/commande");
const Product = require('../models/product');

// Passer une commande 
exports.passerCommande = async (req, res) => {
  try {
    const nouvelCommande = new Commande(req.body);
    await nouvelCommande.save();
    res.status(201).json(nouvelCommande);
  } catch (err) {
    res.status(400).json({ message: "Erreur d’ajout", error: err.message });
  }
};

// Récupérer tous les Commande
exports.listerCommande = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//supprimer une commande
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Commande supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//modifier commande 
exports.updateCommandeStatus = async (req, res) => {
  try {
    const { statut } = req.body;
    const commande = await commande.findByIdAndUpdate(req.params.id, {statut}, {new: true, runValidators: true});
    if (!commande) return res.status(404).json({ message: "commande introuvable"});
    res.json(commande);
  }catch (err) {
    res.status(400).json({error: err.message});
  }
};

