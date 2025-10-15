// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  image: { type: String },
}, { timestamps: true });

// Hash du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("motdepasse")) return next();
  this.motdepasse = await bcrypt.hash(this.motdepasse, 10);
  next();
});

// Comparer mot de passe lors du login
userSchema.methods.comparePassword = function (mdp) {
  return bcrypt.compare(mdp, this.motdepasse);
};

module.exports = mongoose.model("User", userSchema);
