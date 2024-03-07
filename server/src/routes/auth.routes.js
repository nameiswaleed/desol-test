const express = require("express");
const authRouter = express.Router();
const { authController } = require("../controller");
const { signUpHandler, loginHandler } = authController;
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await signUpHandler(name, email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginHandler(email, password);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(403).json({ status: "error", error: error.message });
  }
});

module.exports = authRouter;
