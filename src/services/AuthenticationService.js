import Api from "../services/Api";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  },
  login(credentials) {
    return Api().post("login", credentials);
  },
  change(credentials) {
    return Api().post("settings/change-password", credentials);
  },
  delete(credentials) {
    return Api().post("settings/delete-account", credentials);
  },
  allUser(credentials) {
    return Api().get("user-management/user", credentials);
  }
};
