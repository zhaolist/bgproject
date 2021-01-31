// 引入接口文件
import { getSeckList } from "../../../util/axios";

const state = {
  seckList: []
};
const getters = {
  getSeckList(state) {
    return state.seckList;
  }
};
const mutations = {
  REQ_SECKLIST(state, padload) {
    state.seckList = padload;
  }
};
const actions = {
  // 获取菜单列表的行动
  getSeckListAction({ commit }) {
    getSeckList().then(res => {
      // console.log(res);
      if (res.data.code === 200) {
        // this.menuList = res.data.list;
        commit("REQ_SECKLIST", res.data.list);
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
