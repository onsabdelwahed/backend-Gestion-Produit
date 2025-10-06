const jwt = require("jsonwebtoken");

// Vérifier si l’utilisateur est connecté
exports.auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // format: Bearer token

  if (!token) return res.status(401).json({ message: "Accès refusé. Token manquant." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user; // {id, role}
    next();
  });
};

// Vérifier si l’utilisateur a un rôle spécifique
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit" });
    }
    next();
  };
};
