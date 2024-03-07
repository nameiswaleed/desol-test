const { Users } = require("../database/models");
const tokenServices = require("../services/token.service");
const { verifyJwtToken } = tokenServices;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bearer = token.replace("Bearer ", "");
    const decoded = verifyJwtToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await Users.findById(decoded.userId, { password: 0 });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  authMiddleware,
};
