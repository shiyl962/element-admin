<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <router-link :to="{ path: item.path }">{{
          item.meta.title
        }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: [],
    };
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>

<style scoped>
.app-breadcrumb {
  line-height: 48px;
  padding-left: 8px;
  font-size: 14px;
}
.app-breadcrumb .el-breadcrumb__inner a {
  font-weight: 400;
}
.app-breadcrumb .el-breadcrumb__inner a {
  color: #68728c;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
