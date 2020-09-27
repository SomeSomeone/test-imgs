import AuthService from "@/store/modules/AuthService";

const state = {
  token: ""
};
const getters = {
  getToken(state) {
    return state.token;
  }
};
const mutations = {
  setToken(state, token) {
    debugger;
    state.token = token;
    AuthService.setToken(token);
  }
};
const actions = {
  authorize({ commit }) {
    return AuthService.authRequest().then(token => {
      debugger;
      commit("setToken", token);
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
