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
    }
  },
  actions: {
    async login({ commit },user) {
      console.log(user)
      await commit("loginSuccess",user);
    }
  },
  modules: {}
});
