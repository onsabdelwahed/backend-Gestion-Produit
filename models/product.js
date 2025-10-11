// models/product.js
const mongoose = require("mongoose");
const categorieId = require("./Categorie");

const productSchema = mongoose.Schema({
    ref : {type :String, unique : true , required: true},
    nom : { type: String, unique: true , required: true}, 
    prix : { type: Number , required: true},
    qte : { type: String , required: true },
    type : {type: String , required: true},
    categorieId : { type: String , ref: "categorie"},
    imageProduit : { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);