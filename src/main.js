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

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
