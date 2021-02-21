const error = [
  {
    path: "/401",
    component: () => import(/* webpackChunkName: "401" */ "@/views/401.vue"),
    meta: { title: "401", permission: true },
  },
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    meta: { title: "404", permission: true },
  },
];

export default error;
