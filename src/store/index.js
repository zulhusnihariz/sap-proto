import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
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
  },

  getters: {
    allUser: state => {
      return state.allUser;
    }
  }
});

export default store;

// const state = {
//   isUserLogged: false,
//   token: null,
//   user: null,
//   mode: "change-password"
// };

// const mutations = {
//   setToken(state, token) {
//     state.token = token;
//     token ? (state.isUserLogged = true) : (state.isUserLogged = false);
//   },

//   setUser(state, user) {
//     state.user = user;
//   },

//   setMode(state, mode) {
//     state.mode = mode;
//   }
// };

// const actions = {
//   setToken({ commit }, token) {
//     console.log({ "in action": token });
//     commit("setToken", token);
//   },

//   setUser({ commit }, user) {
//     commit("setUser", user);
//   },

//   setMode({ commit }, mode) {
//     commit("setMode", mode);
//   }
// };

// const getters = {};

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getters
// };
