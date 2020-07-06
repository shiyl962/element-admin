<template>
  <el-container>
    <Aside />
    <el-container>
      <el-header class="el-header" height="auto">
        <Header />
        <Tabs />
      </el-header>

      <el-main class="main">
        <keep-alive :include="include">
          <router-view />
        </keep-alive>
      </el-main>

      <el-backtop target=".main"></el-backtop>
    </el-container>
  </el-container>
</template>
<script>
import Aside from "./Aside";
import Header from "./Header";
import Tabs from "./Tabs";
export default {
  components: { Aside, Header, Tabs },
  computed: {
    key() {
      return this.$route.path;
    },
    include() {
      return this.$store.state.layout.include;
    },
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
}
.main {
  height: calc(100vh - 100px);
}
</style>
