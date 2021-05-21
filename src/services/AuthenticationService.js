import Api from "../services/Api";

export default {
  login(credentials) {
    return Api().post("login", credentials);
  },
  change(credentials) {
    return Api().post("settings/change-password", credentials);
  },

  getAllUser(credentials) {
    return Api().get("user-management/user", credentials);
  },
  addUser(credentials) {
    return Api().post("user-management/user", credentials);
  },
  deleteUser(credentials) {
    return Api().delete("user-management/user", credentials);
  },
  deleteUser(credentials) {
    return Api().delete("user-management/user", credentials);
  },

  uploadData(credentials) {
    return Api().post("database/upload", credentials);
  },
  getDatabaseData(credentials) {
    return Api().get("database/view", credentials);
  }
};
