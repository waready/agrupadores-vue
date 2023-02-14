import { createStore } from "vuex";

export default createStore({
  state: {
    //logged: secureStorage.getItem("token") !== null
    logged: false
  },
  getters: {},
  mutations: {
    loginSuccess(state) {
      state.logged = true;
    }
  },
  actions: {
    async login({ commit }) {
      await commit("loginSuccess");
    }
  },
  modules: {}
});
