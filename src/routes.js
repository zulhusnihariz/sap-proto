const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

module.exports = app => {
  app.post("/login", AuthenticationController.login);

  app.post(
    "/settings/change-password",
    AuthenticationControllerPolicy.change,
    AuthenticationController.change
  );

  app.get("/user-management/user", AuthenticationController.allUser);

  app.post(
    "/user-management/user",
    AuthenticationControllerPolicy.addNewUser,
    AuthenticationController.addNewUser
  );

  app.delete("/user-management/user", AuthenticationController.deleteUser);
};
