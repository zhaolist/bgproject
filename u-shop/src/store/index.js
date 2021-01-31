import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 引入menu模块
import menu from "./modules/menu";
import role from "./modules/role";
import manger from "./modules/manger";
import cate from "./modules/sort";
import seck from "./modules/seck";
import specs from "./modules/specs";
import goods from "./modules/goods";
import banner from './modules/banner'
import member from "./modules/member"
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    menu,
    role,
    manger,
    cate,
    seck,
    specs,
    goods,banner,member
  }
});
