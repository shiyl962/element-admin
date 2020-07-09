<template>
  <div class="aside" :class="{ collapse: isCollapse }">
    <div class="sider-logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="logo" />
        <h1 v-if="!isCollapse">element-admin</h1>
      </router-link>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical"
        background-color="#304156"
        text-color="rgb(191, 203, 217)"
        unique-opened
        :collapse="isCollapse"
        :default-active="activeMenu"
      >
        <MenuItem
          v-for="(route, index) in routeList"
          :key="index"
          :item="route"
        ></MenuItem>
      </el-menu>
    </el-scrollbar>
    <div class="sider-links" @click="setCollapse(!isCollapse)">
      <i
        :class="{
          'el-icon-right': isCollapse,
          'el-icon-back': !isCollapse,
        }"
      ></i>
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  components: { MenuItem },
  computed: {
    //控制侧边栏展开收起状态
    isCollapse() {
      return this.$store.state.layout.isCollapse;
    },
    //获取所有路由表
    routeList() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
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
.aside {
  width: 210px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #304156;
  transition: width 0.5s;
}
.collapse {
  width: 64px;
}
.aside >>> .el-menu {
  border-right: none;
}
.el-menu-vertical {
  text-align: left;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 210px;
}
.aside >>> .el-scrollbar {
  flex: 1 1 0%;
  overflow: hidden auto;
}
.aside >>> .scrollbar-wrapper {
  overflow-x: hidden !important;
}

/* 底部箭头按钮样式 */
.sider-links {
  text-align: center;
  height: 48px;
  border-top: 1px solid #f0f0f0;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
.sider-links:hover {
  color: #409eff;
}
.sider-links i {
  display: inline-block;
  width: 64px;
  line-height: 48px;
  text-align: center;
}

/* logo样式 */
.sider-logo {
  display: flex;
  align-items: center;
  padding: 16px;
  line-height: 32px;
  cursor: pointer;
  transition: padding 0.2s;
  background: hsla(0, 0%, 100%, 0.2);
}
.sider-logo a {
  display: flex;
}
.sider-logo img {
  display: block;
  height: 32px;
  transition: height 0.2s;
}
.sider-logo h1 {
  display: block;
  height: 32px;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.aside >>> .el-menu-item.is-active {
  color: #409eff;
}
</style>
