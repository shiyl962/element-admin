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
      <Screenfull class="link" />

      <el-dropdown class="dropdown link" trigger="click">
        <span class="el-dropdown-link">
          你好，蔡海<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">项目地址</el-dropdown-item>
          <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import Screenfull from "./Screenfull";
export default {
  components: { Breadcrumb, Screenfull },
  data() {
    return {
      value: "",
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
