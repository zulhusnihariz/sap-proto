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
    databaseData: null
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
    }

    // addNewUser(state, newUser) {
    //   Vue.set(state.allUser, newUser.id, newUser.data);
    // }
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
    }

    // addNewUser({ commit }, newUser) {
    //   commit("addNewUser", newUser);
    // }
  }
});

export default store;
