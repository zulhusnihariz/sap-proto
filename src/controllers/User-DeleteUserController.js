const { User } = require("../models");

module.exports = {
  async deleteUser(req, res) {
    console.log("inside controller: delete");
    try {
      const { username, id } = req.body;

      const user = await User.findOne({
        where: {
          id: id,
          username: username
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
