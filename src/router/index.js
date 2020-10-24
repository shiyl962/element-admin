import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

/*
对VueRouter原型链上的push、replace方法进行重写
为了解决某些情况下控制台报 ‘Uncaught (in promise) undefined’的问题
参考地址：https://github.com/vuejs/vue-router/issues/2881
*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
/**
 * 所有页面都应该是一级页面，或者说必须直接渲染到layout上，否则没有缓存
 * affix 在tabs中不能被删除，最少且必须有一个
 * hidden 不会出现在侧边栏
 * name 必须与组件name一致，用于路由缓存功能
 */
const routes = [
  {
    path: "/login",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        meta: { title: "首页", icon: "el-icon-s-marketing", affix: true },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/About.vue"),
        meta: { title: "数据看板", icon: "el-icon-s-marketing", affix: false },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    meta: { title: "嵌套路由", icon: "el-icon-s-marketing" },
    children: [
      {
        path: "/menu1",
        name: "Menu1",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/Menu1.vue"),
        meta: { title: "回到顶部", icon: "el-icon-s-marketing" },
      },
      {
        path: "/menu2",
        name: "Menu2",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/Menu2.vue"),
        meta: { title: "换肤预览", icon: "el-icon-s-marketing" },
      },
      {
        path: "/menu3",
        name: "Menu3",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/Menu3.vue"),
        meta: { title: "菜单3", icon: "el-icon-s-marketing" },
      },
    ],
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () =>
          import(/* webpackChunkName: "redirect" */ "@/views/Redirect.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
