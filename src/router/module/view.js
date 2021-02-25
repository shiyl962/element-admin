// 系统内置页面，正式使用时也不应该被删除
export default [
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
