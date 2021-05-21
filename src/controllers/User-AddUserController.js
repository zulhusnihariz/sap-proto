const { User } = require("../models");

module.exports = {
  async addNewUser(req, res) {
    console.log("inside controller: addNewUser");
    try {
      const user = await User.create(req.body);
      console.log(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use."
      });
    }
  }
};
