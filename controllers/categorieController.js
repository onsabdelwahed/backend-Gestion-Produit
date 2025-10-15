const Categorie = require("../models/Categorie");
//ajouter une categorie  
exports.createCategorie = async (req, res) => {
    try {
        const { nom , ref , description } = req.body;
        const categorie = new Categorie({
            nom, 
            ref, 
            description,
            imageCategorie : req.file ? `/uploads/${req.file.filename}` : null,

        });
        await categorie.save();
        res.status(201).json(categorie);
    }catch (error) {
        res.status(400).json({ message: error.message });

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
exports.getCategorieById = async ( req, res) => {
    try{
        const cat = await categorie.findById(req.params.id);
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
