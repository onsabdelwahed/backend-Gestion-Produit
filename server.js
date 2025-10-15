// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Connexion BDD
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/produits", require("./routes/productRoutes"));
app.use("/api/categorie", require("./routes/categorieRoutes"));
app.use("/api/commande", require("./routes/commandeRoutes"));
// Serve uploads folder
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));
// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
