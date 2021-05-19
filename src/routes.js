const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

module.exports = app => {
  app.post(
    "/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );

  app.post("/login", AuthenticationController.login);

  app.post(
    "/settings/change-password",
    AuthenticationControllerPolicy.change,
    AuthenticationController.change
  );

  app.post("/settings/delete-account", AuthenticationController.delete);

  app.get("/user-management/user", AuthenticationController.allUser);
};
