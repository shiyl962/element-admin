import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

// 将树形数组递归成一维数组
const flattenDeep = (array) => {
  let list = [];
  array.forEach((item) => deep(item));

  function deep(obj) {
    if (obj.children && obj.children.length) {
      obj.children.forEach((item) => deep(item));
    } else {
      list.push(obj);
    }
  }

  return list;
};

// 获取所有路由
let routerList = flattenDeep(router.history.router.options.routes);

// 默认的tabs affix = true
const defaultTabs = [];

// 默认的缓存
const defaultInclude = [];

routerList.forEach((item) => {
  if (item.meta && item.meta.title && item.name && item.meta.affix) {
    defaultTabs.push({
      to: item.path,
      name: item.name,
      title: item.meta.title,
      affix: true,
    });
    defaultInclude.push(item.name);
  }
});

// tabs 改变之后可能需要改变路由
let goRouter = () => {
  let tabs = store.state.layout.tabs;
  router.push(tabs[tabs.length - 1].to);
};

const layout = {
  state: {
    isCollapse: false, //控制侧边栏展开收起状态
    tabs: Array.from(defaultTabs), //tabs列表
    include: Array.from(defaultInclude), //tab缓存
  },
  mutations: {
    setCollapse(state, collapse) {
      state.isCollapse = collapse;
    },

    // 添加缓存
    addInclude(state, name) {
      if (name && !state.include.some((item) => item === name)) {
        state.include.push(name);
      }
    },

    // 删除缓存
    delInclude(state, name) {
      if (!name) return;
      state.include = state.include.filter((item) => item !== name);
    },

    // 恢复默认
    emptyInclude(state) {
      state.include = Array.from(defaultInclude);
    },

    // 添加tabs
    addTabs(state, route) {
      if (route.meta && route.meta.title && route.name) {
        if (!state.tabs.some((item) => item.to === route.fullPath)) {
          let tab = {
            to: route.fullPath,
            name: route.name,
            title: route.meta.title,
          };
          state.tabs.push(tab);
        }
        // 添加缓存
        if (route.name && !state.include.some((item) => item === route.name)) {
          state.include.push(route.name);
        }
      }
    },

    // 删除一个tabs
    delTabs(state, route) {
      if (!route || route.affix) return;
      state.tabs = state.tabs.filter((item) => {
        // 增加容错率 优先使用 路径 匹配 其次使用 name 匹配
        if (item.to !== route.to && item.to !== route.name) {
          return true;
        }
        return false;
      });
      // 删除缓存
      state.include = state.include.filter((item) => item !== route.name);
      goRouter();
    },

    // 删除其他 保留传入的一个
    closeOthers(state, route) {
      if (!route) return;
      if (state.tabs.some((item) => item.affix && item.to === route.to)) {
        state.tabs = Array.from(defaultTabs);
        state.include = Array.from(defaultInclude);
      } else {
        let tabs = Array.from(defaultTabs);
        tabs.push({
          to: route.to,
          name: route.name,
          title: route.title,
        });
        state.tabs = tabs;
        let include = Array.from(defaultInclude);
        include.push(route.name);
        state.include = include;
      }
      goRouter();
    },

    // 清空tabs
    emptyTabs(state) {
      state.tabs = Array.from(defaultTabs);
      state.include = Array.from(defaultInclude);
      goRouter();
    },

    // 替换tabs 用于排序
    replaceTabs(state, tabs) {
      state.tabs = tabs;
    },
  },
};

const store = new Vuex.Store({
  modules: {
    layout,
  },
});
export default store;
