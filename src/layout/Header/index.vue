<template>
  <div class="header">
    <div>
      <div class="link" @click="setCollapse(!isCollapse)">
        <i
          :class="{
            'el-icon-s-unfold': isCollapse,
            'el-icon-s-fold': !isCollapse,
          }"
        ></i>
      </div>
      <Breadcrumb />
    </div>
    <div>
      <el-tooltip
        class="link"
        style="height:60px"
        effect="dark"
        content="换肤"
        placement="bottom"
      >
        <el-switch
          active-color="#0a0a0a"
          inactive-color="#409EFF"
          v-model="value"
        >
        </el-switch>
      </el-tooltip>

      <div class="link">
        <i class="el-icon-lock"></i>
      </div>

      <Screenfull class="link" />

      <el-dropdown
        class="dropdown link"
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          你好，蔡海<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">项目地址</el-dropdown-item>
          <el-dropdown-item command="c" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import Screenfull from "./Screenfull";
import { uplogin } from "@/mock-login.js"; // 模拟登陆模块
export default {
  components: { Breadcrumb, Screenfull },
  data() {
    return {
      value: false,
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.layout.isCollapse;
    },
  },
  methods: {
    // 控制侧边栏导航
    setCollapse(collapse) {
      this.$store.commit("setCollapse", collapse);
    },
    toggleClass(element, className) {
      if (!element || !className) {
        return;
      }
      let classString = element.className;
      const nameIndex = classString.indexOf(className);
      if (nameIndex === -1) {
        classString += "" + className;
      } else {
        classString =
          classString.substr(0, nameIndex) +
          classString.substr(nameIndex + className.length);
      }
      element.className = classString;
    },
    // 下拉菜单事件处理
    handleCommand(command) {
      let handle = {
        b: () => {
          window.open("https://github.com/caihai123/element-admin");
        },
        // 登出
        c: () => {
          uplogin();
          this.$store.commit("setMenuList", []);
          this.$router.push("/login");
        },
      };
      handle[command] && handle[command]();
    },
  },
  watch: {
    value() {
      this.toggleClass(document.body, "custom-theme");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header > div {
  display: flex;
  align-items: center;
}
.link {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  line-height: 60px;
  font-size: 24px;
  cursor: pointer;
}
.link:hover {
  background: rgba(0, 0, 0, 0.025);
}
.dropdown {
  font-size: 14px;
}
</style>
