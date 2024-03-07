const userServices = require("../services/user.service");
const tokenServices = require("../services/token.service");
const cryptoServices = require("../services/crypto.service");
const { Users } = require("../database/models");
const validator = require("validator");

/**
 * Handles the sign-up process.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {object} The newly created user object.
 */
const signUpHandler = async (name, email, password) => {
  try {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }
    const user = await userServices.getUserByEmail(email);
    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword = await cryptoServices.createHashPassword(password);
    const newUser = await userServices.addUserToDB({
      name,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    console.error(`Err while signing up`, error.message);
    throw new Error(error.message);
    co;
  }
};

/**
 * Handles the login process.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<string>} The token generated upon successful login.
 */
const loginHandler = async (email, password) => {
  try {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    } else {
      console.log(email, password);
      const isPasswordMatch = await cryptoServices.comparePassword(
        password,
        user.password
      );

      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      } else {
        const token = tokenServices.createToken(user);
        return token;
      }
    }
  } catch (error) {
    console.error(`Err while logging in`, error);
    throw new Error(error.message);
  }
};

module.exports = {
  loginHandler,
  signUpHandler,
};
