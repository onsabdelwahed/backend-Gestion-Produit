const categorie = require("../models/categorie");
//ajouter une categorie  
exports.createCategorie = async (req, res) => {
    try {
        const nouvelCategorie = new categorie(req.body);
        await nouvelCategorie.save();
        res.status(201).json(nouvelCategorie);
    }catch(err)
{
        res.status(400).json({ message:"Erreur de création", error:err.message });
    }
};
//Afficher tous les catégorie
exports.listerCategorie = async (req, res) => {
    try {
        const categorie = await categorie.find();
        res.json(categorie);
    }catch (err) {
        res.status(500).json({error: err.message });
    }
};
//get categorie by id
exports.getCtaegorieById = async ( req, res) => {
    try{
        const cat = await this.getCtaegorieById.findById(req.params.id);
        if(!cat) return  res.status(404).json({ message:"catégorie introuvable"});
        res.json(cat);
    } catch (err) {
        res.status(500).json({ error:err.message});
    }
};
//modifier categorie
exports.updateCategorie = async (req, res) => {
    try {
        const update = await categorie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!update) return res.status(404).json({ message: "categorie intouvable"});
        res.json(update);
    }catch(err){
        res.status(400).json({error: err.message});
    }
};
//suuprimer categorie

exports.deleteCategorie = async (req, res) => {
    try {
        await categorie.findByIdAndDelete(req.params.id);
        res.json({message: "catégorie supprimé"});
    }catch(err){
        res.status(500).json({ error: err.messaage});
    }
};
