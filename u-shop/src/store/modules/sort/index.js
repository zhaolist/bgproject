// 引入接口文件
import { getCateList } from "../../../util/axios";

const state = {
  cateList: []
};
const getters = {
  getCateList(state) {
    return state.cateList;
  }
};
const mutations = {
  REQ_CATELIST(state, padload) {
    state.cateList = padload;
  }
};
const actions = {
  // 获取菜单列表的行动
  getCateListAction({ commit }) {
    getCateList().then(res => {
      // console.log(res);
      if (res.data.code === 200) {
        // this.menuList = res.data.list;
        commit("REQ_CATELIST", res.data.list);
      }
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
