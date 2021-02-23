<template>
  <div>
    <div class="head">
      <el-tabs v-model="active" type="border-card">
        <el-tab-pane label="iconfont" name="first">
          <el-input
            v-model="searchValue"
            suffix-icon="el-icon-search"
            placeholder="在次搜索图标，点击图标可复制"
          ></el-input>
        </el-tab-pane>
        <el-tab-pane label="el-iocn" name="second">
          <el-input
            v-model="searchValue"
            suffix-icon="el-icon-search"
            placeholder="在次搜索图标，点击图标可复制"
          ></el-input>
          <div class="item-box">
            <div
              class="icon-item"
              v-for="item in elIcon.filter(
                (item) =>
                  !searchValue ||
                  item.toLowerCase().includes(searchValue.toLowerCase())
              )"
              :key="item"
            >
              <i :class="item"></i>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import elIconList from "@/assets/js/el-icon";
export default {
  components: {},
  props: {},
  data() {
    return {
      searchValue: "",
      active: "second",
      elIcon: elIconList,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style scoped>
/* .container {
} */

.head .el-input {
  width: 300px;
}
.item-box {
  margin-top: 20px;
  border-radius: 4px;
}
.icon-item {
  display: inline-block;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px solid #eee;
  margin-bottom: -1px;
  margin-right: -1px;
  font-size: 32px;
}
</style>
