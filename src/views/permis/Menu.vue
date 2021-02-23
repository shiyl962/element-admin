<template>
  <div>
    <el-table :data="filterTableData" border stripe style="width: 100%">
      <div slot="append" class="tab-footer">
        <el-button
          @click="addMenuItem"
          type="primary"
          icon="el-icon-document-add"
          >新 增</el-button
        >
      </div>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column label="菜单名称">
        <TableEditItem
          :ref="'rowTitle' + scope.$index"
          slot-scope="scope"
          :edit="scope.row.edit"
          v-model="scope.row.title"
          placeholder="菜单名"
        ></TableEditItem>
      </el-table-column>
      <el-table-column label="路径">
        <TableEditItem
          :ref="'rowPath' + scope.$index"
          slot-scope="scope"
          :edit="scope.row.edit"
          v-model="scope.row.path"
          placeholder="路径"
        ></TableEditItem>
      </el-table-column>
      <el-table-column label="图标">
        <TableEditItem
          :ref="'rowIcon' + scope.$index"
          slot-scope="scope"
          type="icon"
          :edit="scope.row.edit"
          v-model="scope.row.icon"
          placeholder="图标"
        ></TableEditItem>
      </el-table-column>

      <el-table-column label="操作">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <div class="box-flex" slot="header" slot-scope="scope">
          <el-input
            v-model="searchValue"
            clearable
            placeholder="输入关键字搜索"
          />
        </div>
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-button @click="submit(scope)" size="small" type="primary">
              保存
            </el-button>
            <el-button @click="editCancel(scope)" size="small">取消</el-button>
          </template>
          <el-button
            v-else
            @click="scope.row.edit = true"
            size="small"
            type="primary"
            plain
          >
            编辑
          </el-button>
          <el-button v-if="!scope.row.isAdd" type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TableEditItem from "@/components/TableEditItem";
export default {
  name: "Menu",
  components: { TableEditItem },
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
  created() {
    this.tableData.forEach((item) => {
      this.$set(item, "edit", false); // 使 edit 能被vue检测
    });
  },
  methods: {
    // 新增
    addMenuItem() {
      this.tableData.push({
        title: "",
        path: "",
        icon: "",
        edit: true,
        isAdd: true,
      });
    },
    // 取消编辑
    editCancel(scope) {
      if (scope.row.isAdd) {
        this.tableData.splice(scope.$index, 1);
        return;
      }
      scope.row.edit = false;
      scope.row.title = this.$refs[`rowTitle${scope.$index}`].initValue;
      scope.row.path = this.$refs[`rowPath${scope.$index}`].initValue;
      scope.row.icon = this.$refs[`rowIcon${scope.$index}`].initValue;
    },
    // 保存
    submit(scope) {
      console.log(scope);
    },
  },
};
</script>

<style scoped>
.tab-footer {
  padding: 20px;
  text-align: right;
}
</style>
