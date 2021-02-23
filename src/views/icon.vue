<template>
  <el-tabs v-model="active" type="border-card">
    <el-tab-pane label="iconfont" name="first">
      <el-input
        v-model="searchValue"
        suffix-icon="el-icon-search"
        placeholder="在次搜索图标，点击图标可复制"
        style="width: 300px"
      ></el-input>
    </el-tab-pane>
    <el-tab-pane label="el-iocn" name="second">
      <el-input
        v-model="searchValue"
        suffix-icon="el-icon-search"
        placeholder="在次搜索图标，点击图标可复制"
        style="width: 300px"
      ></el-input>
      <div class="item-box">
        <div
          @click="handleClipboard(item, $event)"
          class="icon-item"
          v-for="item in elIcon.filter(
            (item) =>
              !searchValue ||
              item.toLowerCase().includes(searchValue.toLowerCase())
          )"
          :key="item"
        >
          <i :class="item"></i>
          <span>{{ item }}</span>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import elIconList from "@/assets/js/el-icon";
import clipboard from "@/utils/clipboard";
export default {
  data() {
    return {
      searchValue: "",
      active: "second",
      elIcon: elIconList,
    };
  },
  methods: {
    handleClipboard(text, event) {
      clipboard(text, event);
    },
  },
};
</script>

<style scoped>
.item-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  margin-top: 20px;
  border-radius: 4px;
  border-top: 1px solid #eee;
}
.icon-item {
  height: 120px;
  padding: 0 10px;
  line-height: 120px;
  text-align: center;
  border: 1px solid #eee;
  margin-top: -1px;
  margin-right: -1px;
  cursor: pointer;
}
.icon-item:hover {
  color: #409eff;
}
.icon-item i {
  display: block;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
}
.icon-item span {
  display: block;
  height: 40px;
  line-height: 20px;
}
</style>
