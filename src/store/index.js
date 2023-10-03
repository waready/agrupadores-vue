import { createStore } from "vuex";

export default createStore({
  state: {
    //logged: secureStorage.getItem("token") !== null
    logged: false,
    Token:"",
    user:""
  },
  getters: {},
  mutations: {
    loginSuccess(state,user) {
      state.logged = true;
      state.Token = user.SessionToken;
      state.user = user.Usuario;
    },

    logout(state) {
      state.logged = false;
      state.Token = null;
      state.user = null;
    }
  },
  actions: {
    async login({ commit },user) {
      await commit("loginSuccess",user);
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        resolve();
      });
    }
  },
  modules: {}
});
