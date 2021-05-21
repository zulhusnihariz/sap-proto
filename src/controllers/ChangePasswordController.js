const { User } = require("../models");

module.exports = {
  async change(req, res) {
    console.log("inside controller: change");
    try {
      const { username, password, newPassword, confirmPassword } = req.body;
      const user = await User.findOne({
        where: {
          username: username
        }
      });

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
      await user.save();

      res.send({ user: user.toJSON() });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in"
      });
    }
  }
};
