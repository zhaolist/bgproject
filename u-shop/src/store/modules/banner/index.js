// 引入接口文件
import { getBannerList } from "../../../util/axios";

const state = {
  bannerList: []
};
const getters = {
  getBannerList(state) {
    return state.bannerList;
  }
};
const mutations = {
  REQ_BANNERLIST(state, padload) {
    state.bannerList = padload;
  }
};
const actions = {
  // 获取菜单列表的行动
  getBannerListAction({ commit }) {
    getBannerList().then(res => {
      // console.log(res);
      if (res.data.code === 200) {
     
        commit("REQ_BANNERLIST", res.data.list);
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
