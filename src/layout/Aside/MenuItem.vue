// 递归组件，用于渲染导航菜单
<template>
  <fragment v-if="!item.hidden">
    <template v-if="item.children">
      <el-submenu v-if="item.children.length > 1" index="/">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <MenuItem
          v-for="route in item.children"
          :key="route.path"
          :item="route"
        ></MenuItem>
      </el-submenu>

      <MenuItem
        v-else
        :key="item.children[0].path"
        :item="item.children[0]"
      ></MenuItem>
    </template>

    <template v-else>
      <el-menu-item :index="item.path" @click="goRouter(item.path)">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goRouter(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.router-link {
  display: inline-block;
  width: 100%;
  overflow: hidden;
}

.router-link-active {
  text-decoration: none;
}
</style>
