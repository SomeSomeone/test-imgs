import ImageService from "@/store/modules/ImageService";

const state = {
  list: [],
  pageCount: 1,
  item: {}
};
const getters = {
  getList(state) {
    return state.list;
  },
  getPageCount(state) {
    return state.pageCount;
  },
  getItem(state) {
    return state.item;
  }
};
const mutations = {
  setList(state, list) {
    state.list = list;
  },
  setPageCount(state, pageCount) {
    state.pageCount = pageCount;
  },
  setItem(state, item) {
    state.item = item;
  }
};
const actions = {
  getList({ commit }, params) {
    debugger;
    return ImageService.getList(params).then(({ list, pageCount }) => {
      commit("setList", list);
      commit("setPageCount", pageCount);
    });
  },
  getItem({ commit }, params) {
    return ImageService.getItem(params).then(item => {
      debugger;
      commit("setItem", item);
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
