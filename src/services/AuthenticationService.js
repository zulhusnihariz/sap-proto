import Api from "../services/Api";

export default {
  login(credentials) {
    return Api().post("login", credentials);
  },
  change(credentials) {
    return Api().post("settings/change-password", credentials);
  },

  allUser(credentials) {
    return Api().get("user-management/user", credentials);
  },
  addNewUser(credentials) {
    return Api().post("user-management/user", credentials);
  },
  deleteUser(credentials) {
    return Api().delete("user-management/user", credentials);
  }
};
