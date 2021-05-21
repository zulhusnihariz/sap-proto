const { StaffListing } = require("../models");

module.exports = {
  async uploadData(req, res) {
    console.log("inside controller: uploadData");
    try {
      await StaffListing.destroy({
        truncate: true
      });

      req.body.data.forEach(async function(data) {
        await StaffListing.create(data);
      });

      res.send({ message: "Successfully updated" });
    } catch (err) {
      res.status(400).send({
        error: "Oops, an error has occured"
      });
    }
  }
};
