const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Inscription
exports.register = async (req, res) => {
  try {
    const { nom, email, motdepasse, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email déjà utilisé" });

    const newUser = new User({ nom, email, motdepasse, role });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(motdepasse);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
