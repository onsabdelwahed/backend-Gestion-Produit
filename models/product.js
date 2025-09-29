// models/product.js
const mongoose = require("mongoose");
const categorie = require("./categorie");

const productSchema = mongoose.Schema({
    ref : {type :String, unique : true , required: true},
    nom : { type: String, unique: true , required: true}, 
    prix : { type: Number , required: true},
    qté : { type: Number , required: true},
    type : {type: String , required: true},
    catégorieId : { type: String , ref: "categorie"}
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);