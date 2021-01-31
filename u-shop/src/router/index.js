import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
// 把二级路由提出
export const indexRoutes = [
  {
    path: "/goods",
    component: () => import("../views/goods/goods.vue"),
    name: "商品管理"
  },
  {
    path: "/manger",
    component: () => import("../views/manger/manger.vue"),
    name: "管理员管理"
  },
  {
    path: "/menu",
    component: () => import("../views/menu/menu.vue"),
    name: "菜单管理"
  },
  {
    path: "/role",
    component: () => import("../views/role/role.vue"),
    name: "角色管理"
  },
  {
    path: "/sort",
    component: () => import("../views/sort/sort.vue"),
    name: "商品分类"
  },
  {
    path: "/specs",
    component: () => import("../views/specs/specs.vue"),
    name: "商品规格"
  },
  {
    path: "/banner",
    component: () => import("../views/banner/banner.vue"),
    name: "轮播图管理"
  },
  {
    path: "/seck",
    component: () => import("../views/seck/seck.vue"),
    name: "秒杀管理"
  },
  {
    path: "/member",
    component: () => import("../views/member/member.vue"),
    name: "会员管理"
  }
];

const router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pages/login.vue")
    },
    {
      path: "/index",
      component: () => import("../pages/index.vue"),
      children: [
        {
          path: "/home",
          component: () => import("../views/home.vue")
        },
        ...indexRoutes,
        {
          path: "",
          redirect: "/home"
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
    return;
  }
  if (sessionStorage.getItem("loginInfo")) {
    next();
    return;
  }
  next("/login");
});

export default router;
