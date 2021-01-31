// 引入接口文件
import { getMenuList } from "../../../util/axios";

const state = {
  menuList: []
};
const getters = {
  getMenuList(state) {
    return state.menuList;
  }
};
const mutations = {
  REQ_MENULIST(state, padload) {
    state.menuList = padload;
  }
};
const actions = {
  // 获取菜单列表的行动
  getMenuListAction({ commit }) {
    getMenuList().then(res => {
      console.log(res);
      if (res.data.code === 200) {
        // this.menuList = res.data.list;
        commit("REQ_MENULIST", res.data.list);
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
