import router from "@/router";
import store from "@/store";
import { getMenuList } from "@/api/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style

// 获取后端路由表
const setMenulist = async () => {
  const { data } = await getMenuList();
  store.commit("setMenuList", data.data);
};

/**判断前端模拟的登录状态 */
import { validation } from "@/mock-login.js";
if (!validation()) {
  router.push("/login");
}

// 全局路由守卫
// 用于判断权限
router.beforeEach(async (to, from, next) => {
  // 小屏下路由切换时收起侧边栏
  if (store.state.facility.screenWidth < 1200) {
    store.commit("setCollapse", true);
  }

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
          NProgress.done();
          next();
        } else {
          NProgress.done();
          next("/401"); // 无权限
        }
      }
    } else {
      NProgress.done();
      next("/login");
    }
  } else {
    NProgress.done();
    next(); // 不需要权限验证的页面
  }
});
