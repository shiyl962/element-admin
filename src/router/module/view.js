// 系统内置页面，正式使用时也不应该被删除
const builtPage = [
  {
    path: "/index",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    meta: { permission: false },
  },
  {
    // 菜单管理
    path: "/permis/menu",
    name: "Menu",
    component: () =>
      import(/* webpackChunkName: "menu" */ "@/views/permis/Menu.vue"),
    meta: { permission: false },
  },
  {
    // 角色管理
    path: "/permis/role",
    name: "Role",
    component: () =>
      import(/* webpackChunkName: "role" */ "@/views/permis/Role.vue"),
    meta: { permission: false },
  },
  {
    // 用户管理
    path: "/permis/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "@/views/permis/Account.vue"),
    meta: { permission: false },
  },
  {
    path: "/icon",
    name: "icon",
    component: () => import(/* webpackChunkName: "icon" */ "@/views/icon.vue"),
    meta: { permission: false },
  },
];

// 业务页面，正式使用时应该被重置
const view = [
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    meta: { permission: false },
  },
  {
    path: "/menu1",
    name: "Menu1",
    component: () => import(/* webpackChunkName: "menu" */ "@/views/Menu1.vue"),
    meta: { permission: false },
  },
  {
    path: "/menu2",
    name: "Menu2",
    component: () => import(/* webpackChunkName: "menu" */ "@/views/Menu2.vue"),
    meta: { permission: false },
  },
  {
    path: "/menu3",
    name: "Menu3",
    component: () => import(/* webpackChunkName: "menu" */ "@/views/Menu3.vue"),
    meta: {
      permission: false,
    },
  },
];

export default [...builtPage, ...view];
