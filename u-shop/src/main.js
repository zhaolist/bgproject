// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";

import "./assets/css/reset.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.prototype.$imgUrl = "http://localhost:3000";
// 全局组件
import vcom from "./common";
for (let i in vcom) {
  Vue.component(i, vcom[i]);
}

Vue.config.productionTip = false;

/* eslint-disable no-new  */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
