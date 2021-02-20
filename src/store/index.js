import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

// 将树转成一维数组
const flattenDeep = (array = []) => {
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

// 将路由和后端路由表对应
const mappingRouter = (routerList, menulist) => {
  const find = routerList.find((item) => item.path === "/");

  find.children.forEach((item) => {
    let find = menulist.find((i) => i.path === item.path);
    if (find) {
      find.name = item.name;
      item.meta.title = find.title || item.meta.title || "";
      item.meta.icon = find.icon || item.meta.icon || "";
      item.meta.affix = find.affix || item.meta.affix;
      item.meta.permission = true;
    }
  });
};

let routerList = router.history.router.options.routes; // 前端注册的路由表

let defaultInclude = []; // 默认的缓存

let history = null; // 在tabs改变的时候记录之前的状态

// tabs 改变之后可能需要改变路由
function goRouter() {
  let fullPath = router.currentRoute.fullPath; //获取当前的路由
  let tabs = store.state.layout.tabs;

  // 如果当前路由还在当前的tabs中则不进行任何跳转
  if (tabs.some((item) => item.to === fullPath)) {
    return;
  }

  /**
   * 到这里的时候说明当前路由的tabs已经被删除
   * 跳转到当前tabs的后面一个还存在的tabs的路由
   */
  let index = history.findIndex((item) => item.to === fullPath);
  let len = history.length;
  for (let i = index + 1; i < len; i++) {
    if (tabs.some((item) => item.to === history[i].to)) {
      router.push(history[i].to);
      return;
    }
  }
  /**
   * 走到这里说明当前路由后面的tabs全部被删除或者根本就没有
   */
  router.push(tabs[tabs.length - 1].to);
}

const layout = {
  state: {
    isCollapse: false, //控制侧边栏展开收起状态
    menuList: [], // 侧边栏菜单对应的一维数组
    tabs: [], //tabs列表
    include: [], //tab缓存
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
      state.include = [...defaultInclude];
    },

    // 添加tabs
    addTabs(state, route) {
      history = Array.from(state.tabs);
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
      history = Array.from(state.tabs);
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
      history = [...state.tabs];
      if (!route) return;
      state.tabs = state.tabs.filter(
        (item) => item.affix || item.to === route.to
      );
      state.include = state.tabs.map((item) => item.name);
      goRouter();
    },

    /**
     * 清空tabs
     * 可以理解为恢复默认
     * 但是修改的时候需要保持tabs的顺序
     * */
    emptyTabs(state) {
      history = [...state.tabs];
      state.tabs = state.tabs.filter((item) => item.affix);
      state.include = [...defaultInclude];
      goRouter();
    },

    // 替换tabs 用于排序
    replaceTabs(state, tabs) {
      state.tabs = tabs;
    },

    setMenuList(state, list) {
      state.menuList = Array.from(list);

      mappingRouter(routerList, flattenDeep(list));

      state.tabs = [];
      state.include = [];
      defaultInclude = [];

      list.forEach((item) => {
        if (item.title && item.name && item.affix) {
          state.tabs.push({
            to: item.path,
            name: item.name,
            title: item.title,
            affix: true,
          });
          state.include.push(item.name);
          defaultInclude.push(item.name);
        }
      });
    },
  },
};

// 设备信息
const facility = {
  state: {
    screenWidth: document.body.clientWidth,
  },
  mutations: {
    setScreenWidth(state, width) {
      state.screenWidth = width;
    },
  },
};

const store = new Vuex.Store({
  modules: {
    layout,
    facility,
  },
});

export default store;
