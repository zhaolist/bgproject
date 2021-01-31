// 引入接口文件
import { getMemberList } from "../../../util/axios";

const state = {
  memberList: []
};
const getters = {
  getMemberList(state) {
    return state.memberList;
  }
};
const mutations = {
  REQ_MEMBERLIST(state, padload) {
    state.memberList = padload;
  }
};
const actions = {
  // 获取菜单列表的行动
  getMemberListAction({ commit }) {
    getMemberList().then(res => {
      // console.log(res);
      if (res.data.code === 200) {
        // this.menuList = res.data.list;
        commit("REQ_MEMBERLIST", res.data.list);
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
