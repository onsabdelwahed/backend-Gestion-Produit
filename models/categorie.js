
const mongoose = require("mongoose");
const categorieSchema = new mongoose.Schema({
nom: {type:String, unique: true , required: true },
ref: { type:String, required: true}, 
description: { type: String, default:""},    
}, {timestamps: true });

module.exports = mongoose.model("categorie", categorieSchema );