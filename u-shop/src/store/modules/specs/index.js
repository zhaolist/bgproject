//引入接口模块
import { getSpecsList, getSpecsCount } from "../../../util/axios";
//封装模块的所有核心属性
const state = {
  specsList: [],
  size: 2, //条数
  page: 1, // 页码
  countNum: 0 //总条数
};

const getters = {
  //管理员列表
  getSpecsList(state) {
    return state.specsList;
  },
  //条数，当前页面渲染个数
  getSpecsSize(state) {
    return state.size;
  },
  //总条数
  getCountNum(state) {
    return state.countNum;
  }
};

const mutations = {
  REQ_SPECSLIST(state, payload) {
    state.specsList = payload;
  },
  //总条数
  REQ_COUNT(state, payload) {
    state.countNum = payload;
  },
  //修改页码
  CHANGE_PAGE(state, payload) {
    state.page = payload;
  }
};

const actions = {
  //封装一个获取管理员列表的行动
  getSpecsListAction(payload) {
    getSpecsList({
      size: payload.state.size,
      page: payload.state.page
    }).then(res => {
      if (res.data.code === 200) {
        let list = res.data.list ? res.data.list : [];
        payload.commit("REQ_SPECSLIST", res.data.list);

        if (payload.state.page != 1 && list.length == 0) {
          payload.dispatch("changePageAction", payload.state.page - 1);
          return;
        }
      }
    });
  },
  //封装一个获取总条数的行动
  getCountAction(payload) {
    getSpecsCount().then(res => {
      if (res.data.code === 200) {
        payload.commit("REQ_COUNT", res.data.list[0].total);
      }
    });
  },
  //封装一个修改page行动
  changePageAction(context, payload) {
    context.commit("CHANGE_PAGE", payload);
    context.dispatch("getSpecsListAction");
  }
};

//导出这个模块

export default {
  state,
  getters,
  mutations,
  actions,
  //命名空间
  namespaced: true
};
