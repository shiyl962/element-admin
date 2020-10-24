import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/theme/index.css"; //换肤样式
import "@/assets/style/index.css"; //全局公共样式
import Fragment from "vue-fragment"; // 可产生虚拟根节点

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Fragment.Plugin);

const myVue = new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");

/**
 * 全局导航收尾
 * 判断登陆状态
 *  */
import { validation } from "@/mock-login.js"
router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login') {
    if (validation()) {
      next()
    } else {
      myVue.$confirm('当前登陆状态已过期，你可以选择登出或停留在当前页面！', '提示', {
        confirmButtonText: '登出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next('/login')
      }).catch(() => {
        next(false)
      });
    }
  } else {
    next()
  }
})