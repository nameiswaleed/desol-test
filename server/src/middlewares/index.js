const tokenServices = require("../services/token.service");
const { verifyJwtToken } = tokenServices;

const authMiddleware = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = verifyJwtToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = decoded;
};

module.exports = {
  authMiddleware,
};
