<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path || item.title"
      >
        <router-link v-if="item.path" :to="{ path: item.path }">
          {{ item.title }}
        </router-link>
        <span v-else>{{ item.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { treeFilter } from "@/utils/util";

export default {
  computed: {
    levelList() {
      const { path } = this.$route;

      const list = treeFilter(
        this.$store.state.layout.menuList,
        (item) => item.path && item.path === path
      );

      return this.treeTOList(list);
    },
  },
  methods: {
    // 将一条枝干的树转成一维数组
    treeTOList(treeList) {
      const list = [];
      while (treeList) {
        let item = treeList[0];
        list.push({
          title: item.title,
          path: item.path,
        });
        treeList = item.children;
      }
      return list;
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
