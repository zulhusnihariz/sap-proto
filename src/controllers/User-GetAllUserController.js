const { User } = require("../models");

module.exports = {
  async allUser(req, res) {
    console.log("inside controller: getAllUser");

    console.log(User);
    try {
      let user = await User.findAll(req.body);

      user = JSON.stringify(user);
      user = JSON.parse(user);
      res.send(user);

      // res.send(user);
    } catch (err) {
      res.status(400).send({
        error: "An error occured. Unable to retrieve data"
      });
    }
  }
};
