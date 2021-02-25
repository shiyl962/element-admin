// 系统内置页面，正式使用时也不应该被删除
const builtPage = [
  {
    path: "/index",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    meta: {}, // 必须有这个空对象
  },
  {
    // 菜单管理
    path: "/permis/menu",
    name: "Menu",
    component: () =>
      import(/* webpackChunkName: "menu" */ "@/views/permis/Menu.vue"),
    meta: {},
  },
  {
    // 角色管理
    path: "/permis/role",
    name: "Role",
    component: () =>
      import(/* webpackChunkName: "role" */ "@/views/permis/Role.vue"),
    meta: {},
  },
  {
    // 用户管理
    path: "/permis/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "@/views/permis/Account.vue"),
    meta: {},
  },
  {
    path: "/icon",
    name: "Icon",
    component: () => import(/* webpackChunkName: "icon" */ "@/views/icon.vue"),
    meta: {},
  },
  {
    path: "/401",
    name: "Err401", // 如果不需要tab则可以删除此属性
    component: () => import(/* webpackChunkName: "401" */ "@/views/401.vue"),
    meta: { title: "401" },
  },
  {
    path: "/404",
    name: "Err404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    meta: { title: "404" },
  },
  {
    path: "/redirect/:path*",
    name: "redirect",
    component: () =>
      import(/* webpackChunkName: "redirect" */ "@/views/Redirect.vue"),
    meta: {},
  },
];

// 业务页面，正式使用时应该被重置
const view = [
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/pages/About.vue"),
    meta: {},
  },
  {
    path: "/menu1",
    name: "Menu1",
    component: () => import(/* webpackChunkName: "menu" */ "@/pages/Menu1.vue"),
    meta: {},
  },
  {
    path: "/menu2",
    name: "Menu2",
    component: () => import(/* webpackChunkName: "menu" */ "@/pages/Menu2.vue"),
    meta: {},
  },
  {
    path: "/menu3",
    name: "Menu3",
    component: () => import(/* webpackChunkName: "menu" */ "@/pages/Menu3.vue"),
    meta: {},
  },
];

export default [...builtPage, ...view];
