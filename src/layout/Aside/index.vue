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
          v-for="(route, index) in menulist"
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
import { debounce } from "throttle-debounce";

// 自适应侧边栏断点，修改时还需要修改对应的css
const minWidth = 1200;

export default {
  components: { MenuItem },
  data() {
    return {
      resizeEnet: debounce(150, false, () => {
        let screenWidth = document.body.clientWidth;
        if (
          this.$store.state.facility.screenWidth >= minWidth &&
          screenWidth < minWidth
        ) {
          // 从大屏切换到小屏
          this.$store.commit("setCollapse", true);
        } else if (
          this.$store.state.facility.screenWidth < minWidth &&
          screenWidth >= minWidth
        ) {
          // 从小屏切换到大屏
          this.$store.commit("setCollapse", false);
        }
        this.$store.commit("setScreenWidth", document.body.clientWidth);
      }),
    };
  },
  computed: {
    //控制侧边栏展开收起状态
    isCollapse() {
      return this.$store.state.layout.isCollapse;
    },
    //获取后端路由表
    menulist() {
      return this.$store.state.layout.menuList;
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
  mounted() {
    if (this.$store.state.facility.screenWidth < minWidth) {
      // 小屏状态下默认收起
      this.$store.commit("setCollapse", true);
    }

    window.addEventListener("resize", this.resizeEnet);
  },
  methods: {
    // 控制侧边栏导航
    setCollapse(collapse) {
      this.$store.commit("setCollapse", collapse);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeEnet);
  },
};
</script>

<style scoped>
.aside {
  width: 210px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
  background-color: #304156;
  transition: width 0.5s;
}
.collapse {
  width: 64px;
}
@media screen and (max-width: 1200px) {
  .aside {
    position: absolute;
    left: 0;
    z-index: 2000;
  }
  .collapse {
    width: 0px;
  }
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
