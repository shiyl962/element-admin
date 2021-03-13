import Vue from "vue";
import Vuex from "vuex";
import layout from "./module/layout";
import facility from "./module/facility";
import lock from "./module/lock";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    facility,
    lock,
  },
});

export default store;
