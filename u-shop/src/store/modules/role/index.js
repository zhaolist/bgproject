// 引入接口文件
import { getRoleList } from "../../../util/axios";

const state = {
  roleList: []
};
const getters = {
  getRoleList(state) {
    return state.roleList;
  }
};
const mutations = {
  REQ_ROLELIST(state, padload) {
    state.roleList = padload;
  }
};
const actions = {
  // 获取角色列表行动
  getRoleListAction({ commit }) {
    getRoleList().then(res => {
      //   console.log(res, "角色列表");
      if (res.data.code === 200) {
        commit("REQ_ROLELIST", res.data.list);
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
