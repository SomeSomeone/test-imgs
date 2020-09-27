import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import AuthStore from "@/store/AuthStore";
import ImageStore from "@/store/ImageStore";
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    AuthStore,
    ImageStore
  }
});
