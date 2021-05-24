import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLogged: false,
    allUser: null,
    databaseData: null,
    sheetsName: null,
    changeDepartmentColumn: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      token ? (state.isUserLogged = true) : (state.isUserLogged = false);
    },

    setUser(state, user) {
      state.user = user;
    },

    setAllUser(state, allUser) {
      state.allUser = allUser;
    },

    setDatabaseData(state, databaseData) {
      state.databaseData = databaseData;
    },
    setSheetsName(state, sheetsName) {
      state.sheetsName = sheetsName;
    },
    setChangeDepartmentColumn(state, changeDepartmentColumn) {
      state.changeDepartmentColumn = changeDepartmentColumn;
    }
  },
  actions: {
    setToken: ({ commit }, token) => {
      commit("setToken", token);
    },

    setUser: ({ commit }, user) => {
      commit("setUser", user);
    },

    setAllUser: ({ commit }, allUser) => {
      commit("setAllUser", allUser);
    },

    setDatabaseData: ({ commit }, databaseData) => {
      commit("setDatabaseData", databaseData);
    },
    setSheetsName: ({ commit }, sheetsName) => {
      commit("setSheetsName", sheetsName);
    },
    setChangeDepartmentColumn: ({ commit }, changeDepartmentColumn) => {
      commit("setChangeDepartmentColumn", changeDepartmentColumn);
    }
  }
});

export default store;
