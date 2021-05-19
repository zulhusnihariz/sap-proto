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
    allUser: null
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
    }

    // addNewUser({ commit }, newUser) {
    //   commit("addNewUser", newUser);
    // }
  },

  getters: {
    allUser: state => {
      return state.allUser;
    }
  }
});

export default store;
