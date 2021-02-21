const view = [
  {
    path: "/index",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    meta: { permission: false },
  },
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

export default view;
