// models/Commande.js
const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
    num: {type: Number, unique: true},
    date: { type: Date, default: Date.now},
    montantTotal: {type: Number, min: 0},
    modePaiement: { type: String, enum: ['espece', 'carte', 'virement', 'paypal'], default: 'espece' },
    produitId: { type : String, ref: 'Product', required: true},
    userId: { type: String , ref: 'user', required: true }
},
{ timestamps: true });

module.exports = mongoose.model("Commande", commandeSchema);
