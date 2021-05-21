const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

module.exports = app => {
  app.post("/login", AuthenticationController.login);

  app.post(
    "/settings/change-password",
    AuthenticationControllerPolicy.change,
    AuthenticationController.change
  );

  app.get("/user-management/user", AuthenticationController.getAllUser);

  app.post(
    "/user-management/user",
    AuthenticationControllerPolicy.addUser,
    AuthenticationController.addUser
  );

  app.delete("/user-management/user", AuthenticationController.deleteUser);

  app.post("/database", AuthenticationController.uploadData);

  app.get("/database", AuthenticationController.getDatabaseData);
};
