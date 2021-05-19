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
  // create new data in database

  async allUser(req, res) {
    console.log(User);
    try {
      let user = await User.findAll(req.body);

      user = JSON.stringify(user);
      user = JSON.parse(user);
      console.log(user);
      res.send(user);

      // res.send(user);
    } catch (err) {
      res.status(400).send({
        error: "An error occured. Unable to retrieve data"
      });
    }
  },

  async register(req, res) {
    console.log(User);
    try {
      const user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use."
      });
    }
  },

  // find data in database that match email given
  async login(req, res) {
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
      console.log(userJson);
      res.send({ user: userJson, token: jwtSignUser(userJson) });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in"
      });
    }
  },

  async change(req, res) {
    console.log("inside controller");
    try {
      const { username, password, newPassword, confirmPassword } = req.body;
      const user = await User.findOne({
        where: {
          username: username
        }
      });

      console.log(req.body);
      console.log(`enter`);

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Old password isn't valid"
        });
      }

      if (newPassword != confirmPassword) {
        return res.status(403).send({
          error: "Password confirmation doesn't match the password"
        });
      }
      user.password = newPassword;
      console.log(newPassword);
      await user.save();

      res.send({ user: user.toJSON() });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in"
      });
    }
  },

  async delete(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      await user.destroy({ truncate: true });

      res.send({ user: user.toJSON() });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in"
      });
    }
  }
};
