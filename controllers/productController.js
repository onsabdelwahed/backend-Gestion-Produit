const product = require("../models/product");

//ajouter un produit
exports.ajouterProduit = async (req, res) => {
  try {
    const nouvelProduct = new product(req.body);
    await nouvelProduct.save();
    res.status(201).json(nouvelProduct);
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout", error: err.message });
  }
};
//Récupérer tous les produits
exports.listerProduits = async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await product
      .findById(req.params.id)
      .populate("categorie", "nom ref description");
    if (!p) return res.status(404).json({ message: "produit introuvable" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//modifier produit
exports.updateProduct = async (req, res) => {
  try {
    const update = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Produit introuvable" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// supprimer Produit
exports.deleteProduct = async (req, res) => {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
