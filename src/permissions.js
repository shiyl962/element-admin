import Vue from "vue";
import router from "@/router";
import store from "@/store";
import { getMenuList } from "@/api/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style

// 获取后端路由表
const setMenulist = async () => {
  try {
    const { data } = await getMenuList();
    store.commit("setMenuList", data.data);
  } catch (error) {
    NProgress.done();
  }
};

/**判断前端模拟的登录状态 正式使用时直接删除*/
import { validation } from "@/mock-login.js";
if (!validation()) {
  router.push("/login");
}

// 全局路由守卫
// 用于判断权限
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (typeof to.meta.permission === "boolean") {
    // 判断前端模拟的登录状态
    // 正式使用时应去掉这一层判断，
    // 很多人喜欢用cookie是否存在来判断是否登录我觉得是不合理的，我认为应该在axios拦截器里做判断
    if (validation()) {
      const menuList = store.state.layout.menuList;
      if (menuList.length <= 0) {
        await setMenulist();
        next({ path: to.fullPath, replace: true }); //重新进入此路由，replace设置为true之后浏览器不会有多余的历史记录
      } else {
        if (to.meta.permission) {
          next();
          NProgress.done();
        } else {
          next("/401"); // 无权限
          NProgress.done();
        }
      }
    } else {
      store.commit("setMenuList", []);
      next("/login");
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
