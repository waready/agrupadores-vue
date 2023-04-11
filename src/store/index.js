import { createStore } from "vuex";

export default createStore({
  state: {
    //logged: secureStorage.getItem("token") !== null
    logged: false,
    Token:""
  },
  getters: {},
  mutations: {
    loginSuccess(state,user) {
      state.logged = true;
      state.Token = user.SessionToken;
    },

    logout(state) {
      state.logged = false;
      state.Token = null;
    }
  },
  actions: {
    async login({ commit },user) {
      console.log(user)
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
