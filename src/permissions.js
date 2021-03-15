import Vue from "vue";
import router from "@/router";
import store from "@/store";
import { getMenuList } from "@/api/login";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style

// 获取后端路由表
const setMenulist = async () => {
  try {
    const { data } = await getMenuList();
    await store.commit("setMenuList", data.data || []);
  } catch (error) {
    await store.commit("setMenuList", []);
  }
};

// 全局路由守卫
// 用于判断权限
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (typeof to.meta.permission === "boolean") {
    if (store.state.layout.menuList.length <= 0) {
      await setMenulist();
    }
    if (to.meta.permission) {
      next();
      NProgress.done();
    } else {
      next("/401"); // 无权限
      NProgress.done();
    }
  } else {
    next(); // 不需要权限验证的页面
    NProgress.done();
  }
});

router.beforeEach((to, from, next) => {
  // 小屏下路由切换时收起侧边栏
  if (store.state.facility.screenWidth < 1200) {
    store.commit("setCollapse", true);
  }

  /**
   * 处理携带参数的路由
   * 如果当前页面tab已存在，但是参数不一样的话会删除缓存再进入
   * 只处理了通过query传参，其他的最好不要使用
   */
  const found = store.state.layout.tabs.find((item) => item.path === to.path);
  if (found && found.to !== to.fullPath) {
    store.commit("setRedirectName", to.name);
    Vue.nextTick(() => {
      next();
      store.commit("setRedirectName", "");
      NProgress.done();
    });
  } else {
    next();
    NProgress.done();
  }
});

router.afterEach((to) => {
  if (to.path.slice(0, 9) !== "/redirect") {
    NProgress.done();
  }
});
