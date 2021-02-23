<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-checkbox-group :value="scope.row.role">
            <el-checkbox
              v-for="item in pages"
              :key="item.pageId"
              :label="item.pageId"
            >
              {{ item.title }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="Id" align="center" width="220">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
        width="220"
      >
      </el-table-column>
      <el-table-column prop="description" label="备注"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot="header">
          <el-button
            @click="dialog.visible = true"
            size="small"
            type="primary"
            icon="el-icon-document-add"
            >新 增</el-button
          >
        </template>
        <template>
          <el-button size="small" type="primary">
            编辑权限
          </el-button>
          <el-button size="small" type="primary">
            分组
          </el-button>
          <el-button type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增or编辑" :visible.sync="dialog.visible">
      <el-form label-width="80px" ref="form" :model="dialog.form">
        <el-form-item label="角色名称">
          <el-input v-model="dialog.form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="dialog.form.description"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="页面权限">
          <el-checkbox-group v-model="dialog.form.role">
            <el-checkbox
              v-for="item in pages"
              :key="item.pageId"
              :label="item.pageId"
            >
              {{ item.title }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      pages: [
        {
          pageId: "1",
          title: "首页",
        },
        {
          pageId: "2",
          title: "菜单管理",
        },
        {
          pageId: "3",
          title: "角色管理",
        },
        {
          pageId: "4",
          title: "用户管理",
        },
        {
          pageId: "5",
          title: "图标",
        },
      ], // 所有页面
      tableData: [
        {
          roleId: "0",
          roleName: "admin",
          description:
            "当前账号相当于admin，这些全是admin下的子角色，admin 就是超级管理员，系统应该自己初始化，不需要创建，也不能被修改",
          role: ["1", "2", "3", "4", "5"],
        },
        {
          roleId: "1",
          roleName: "开发人员",
          description: "开发人员也可以拥有全部权限",
          role: ["1", "2", "3", "4", "5"],
        },
        {
          roleId: "2",
          roleName: "管理员",
          description: "角色管理和用户管理的权限应该保持一致",
          role: ["1", "3", "4", "5"],
        },
        {
          roleId: "3",
          roleName: "管理员2",
          description:
            "每个角色只能操作自己创建的子角色，并且只能分配自己拥有权限的页面",
          role: [],
        },
      ],
      dialog: {
        visible: false,
        form: {
          roleName: "",
          description: "",
          role: [],
        },
        rules: {},
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style scoped></style>
