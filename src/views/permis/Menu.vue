<template>
  <div>
    <el-table :data="filterTableData" border stripe style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="icon" label="图标"> </el-table-column>

      <el-table-column label="操作">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <div class="box-flex" slot="header" slot-scope="scope">
          <el-button type="primary" icon="el-icon-document-add"
            >新 增</el-button
          >
          <el-input
            v-model="searchValue"
            clearable
            placeholder="输入关键字搜索"
          />
        </div>
        <template>
          <el-button size="small" type="primary" plain>编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      searchValue: "",
      tableData: [
        { title: "首页", path: "/index", icon: "el-icon-s-home" },
        { title: "菜单管理", path: "/permis/menu", icon: "" },
        { title: "角色管理", path: "/permis/role", icon: "" },
        { title: "用户管理", path: "/permis/account", icon: "" },
      ],
    };
  },
  computed: {
    filterTableData() {
      return this.tableData.filter(
        (item) =>
          !this.searchValue ||
          item.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          item.path.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          item.icon.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style scoped>
.box-flex {
  display: flex;
}
.box-flex > .el-button {
  margin-right: 10px;
}
</style>
