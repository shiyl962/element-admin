<template>
  <div>
    <div class="head">
      <el-input
        v-model="searchValue"
        clearable
        placeholder="输入关键字查询"
        prefix-icon="el-icon-search"
        class="input-item"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-document-add">新增</el-button>
    </div>
    <ElTableEdit
      :data="filterTableData"
      :columns="columns"
      border
      stripe
      style="width: 100%"
      @submitRow="submit"
    >
      <template v-slot:column-actions="{ row, $index }">
        <el-button @click="delItem(row, $index)" type="danger" size="small">
          删除
        </el-button>
      </template>
    </ElTableEdit>
  </div>
</template>

<script>
import ElTableEdit from "@/components/ElTableEdit";
export default {
  name: "Menu",
  components: { ElTableEdit },
  data() {
    return {
      searchValue: "",
      columns: [
        {
          title: "菜单名",
          key: "title",
          edit: true,
          rules: [
            { required: true, message: "请输入菜单名称" },
            {
              min: 2,
              max: 5,
              message: "长度在 2 到 5 个字符",
            },
          ],
          clearable: true,
        },
        {
          title: "路径",
          key: "path",
          edit: true,
          rules: [{ required: true, message: "请输入菜单路径" }],
          clearable: true,
        },
        {
          title: "图标",
          key: "icon",
          type: "icon",
          edit: true,
          rules: [],
          clearable: true,
        },
      ],
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
  methods: {
    // 新增
    addMenuItem() {},
    // 保存
    submit(row, valid) {
      console.log(row);
      console.log(valid);
      if (valid) {
        this.$set(row, "_edit", false);
      }
    },
    // 删除
    delItem(row, index) {
      console.log(row);
      console.log(index);
    },
  },
};
</script>

<style scoped>
.head {
  margin-bottom: 20px;
}
.input-item {
  width: 400px;
  margin-right: 10px;
}
.tab-footer {
  padding: 20px;
  text-align: right;
}
</style>
