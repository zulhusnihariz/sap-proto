const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async login(req, res) {
    console.log("inside controller: login");
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      if (!user) {
        req.status(403).send({
          error: "The login information was incorrect"
        });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Incorrect Password"
        });
      }

      userJson = user.toJSON();
      res.send({ user: userJson, token: jwtSignUser(userJson) });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in"
      });
    }
  }
};
