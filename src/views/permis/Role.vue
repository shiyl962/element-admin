<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
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
            @click="addOpen"
            size="small"
            type="primary"
            icon="el-icon-document-add"
            >新 增</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button @click="editOpen(scope.row)" size="small" type="primary">
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

    <el-dialog
      title="新增or编辑"
      :visible.sync="dialog.visible"
      destroy-on-close
    >
      <el-form ref="form" :model="dialog.form" label-width="80px">
        <el-form-item
          label="角色名称"
          prop="roleName"
          :rules="[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ]"
        >
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
          <div v-for="item in pages" :key="item.pageId" class="permiss">
            <label class="el-checkbox" style="width:100px">
              {{ item.title }}
            </label>
            <el-checkbox v-model="item.permission">permission</el-checkbox>
            <el-checkbox v-model="item.hidden" :disabled="!item.permission">
              hidden
            </el-checkbox>
            <el-checkbox v-model="item.affix" :disabled="!item.permission">
              affix
            </el-checkbox>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      pages: [],
      tableData: [
        {
          roleId: "0",
          roleName: "admin",
          description:
            "当前账号相当于admin，这些全是admin下的子角色，admin 就是超级管理员，系统应该自己初始化，不需要创建，也不能被修改",
          role: [
            {
              pageId: "1",
              permission: true,
              affix: true,
            },
            {
              pageId: "2",
              permission: true,
            },
            {
              pageId: "3",
              permission: true,
            },
            {
              pageId: "4",
              permission: true,
            },
            {
              pageId: "5",
              permission: true,
            },
          ],
        },
        {
          roleId: "1",
          roleName: "开发人员",
          description: "开发人员也可以拥有全部权限",
          role: [
            {
              pageId: "1",
              permission: true,
              affix: true,
            },
            {
              pageId: "2",
              permission: true,
            },
            {
              pageId: "3",
              permission: true,
            },
            {
              pageId: "4",
              permission: true,
            },
            {
              pageId: "5",
              permission: true,
            },
          ],
        },
        {
          roleId: "2",
          roleName: "管理员",
          description: "角色管理和用户管理的权限应该保持一致",
          role: [
            {
              pageId: "1",
              permission: true,
              affix: true,
            },
            {
              pageId: "3",
              permission: true,
            },
            {
              pageId: "4",
              permission: true,
            },
            {
              pageId: "5",
              permission: true,
            },
          ],
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
        roleId: "", // 编辑时
        form: {
          roleName: "",
          description: "",
        },
      },
    };
  },
  computed: {},
  created() {
    this.getPagesList();
  },
  mounted() {},
  methods: {
    getPagesList() {
      // 获取的有分配权限的所有页面
      const pages = [
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
      ];
      setTimeout(() => {
        this.pages = pages;
        this.pages.forEach((item) => {
          this.$set(item, "permission", false);
          this.$set(item, "hidden", false);
          this.$set(item, "affix", false);
        });
      }, 200);
    },
    // 打开新增弹窗
    addOpen() {
      this.dialog.roleId = "";
      this.dialog.form = {
        roleName: "",
        description: "",
      };
      this.pages.forEach((item) => {
        this.$set(item, "permission", false);
        this.$set(item, "hidden", false);
        this.$set(item, "affix", false);
      });
      this.dialog.visible = true;
    },
    // 打开编辑弹窗
    editOpen(row) {
      this.dialog.roleId = row.roleId;
      this.dialog.form = {
        roleName: row.roleName,
        description: row.description,
      };
      this.pages.forEach((item) => {
        const found = row.role.find((i) => i.pageId === item.pageId);
        if (found) {
          this.$set(item, "permission", found.permission || false); // 如果有权限必须返回true
          this.$set(item, "hidden", found.hidden || false);
          this.$set(item, "affix", found.affix || false);
        } else {
          this.$set(item, "permission", false);
          this.$set(item, "hidden", false);
          this.$set(item, "affix", false);
        }
      });
      this.dialog.visible = true;
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.dialog.form);
          data.role = this.pages.filter((item) => item.permission);
          console.log(data);
        }
      });
    },
  },
};
</script>
