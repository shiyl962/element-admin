<template>
  <div class="header">
    <div class="menu" @click="setCollapse(!isCollapse)">
      <i
        :class="{
          'el-icon-s-unfold': isCollapse,
          'el-icon-s-fold': !isCollapse,
        }"
      ></i>
    </div>
    <Breadcrumb />
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
export default {
  components: { Breadcrumb },
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
  display: flex;
  align-items: center;
}
.menu {
  padding: 0 20px;
  line-height: 60px;
  font-size: 24px;
  cursor: pointer;
}
</style>
