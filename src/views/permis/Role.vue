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
          <el-button
            size="small"
            @click="groupDialog.visible = true"
            type="primary"
          >
            菜单分组
          </el-button>
          <el-button type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialog.roleId ? '编辑' : '新增角色'"
      :visible.sync="dialog.visible"
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
          <div v-for="item in pages" :key="item.pageId">
            <el-checkbox v-model="item.isAdd" style="width:100px"
              >{{ item.title }}
            </el-checkbox>
            <el-checkbox v-model="item.permission" :disabled="!item.isAdd"
              >permission</el-checkbox
            >
            <el-checkbox v-model="item.hidden" :disabled="!item.isAdd">
              hidden
            </el-checkbox>
            <el-checkbox v-model="item.affix" :disabled="!item.isAdd">
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

    <el-dialog
      class="my-dialog"
      title="分组设置"
      :visible.sync="groupDialog.visible"
    >
      <div style="padding:10px">
        <el-button size="mini" type="primary" plain icon="el-icon-plus"
          >新增分组</el-button
        >
      </div>
      <div></div>
      <el-tree
        :data="groupDialog.treeData"
        node-key="id"
        draggable
        :allow-drop="allowDrop"
        :expand-on-click-node="false"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <div class="custom-tree-node-item">
            <template v-if="data.children && data.edit">
              <EditItem
                :ref="'edit-icon-' + data.id"
                v-model="data.icon"
                :options="{
                  type: 'icon',
                  clearable: true,
                }"
                :hidden-message="true"
                size="mini"
                style="margin-right:10px"
              ></EditItem>
              <EditItem
                :ref="'edit-title-' + data.id"
                v-model="data.title"
                :options="{ clearable: true, rules: titleRules }"
                :hidden-message="true"
                size="mini"
              ></EditItem>
            </template>

            <template v-else>
              <div style="margin-right:10px">
                <i :class="data.icon"></i>
              </div>
              <div>{{ data.title }}</div>
            </template>
          </div>

          <div v-if="data.children">
            <template v-if="data.edit">
              <el-button @click="submitItem(data)" type="text" size="mini">
                保存
              </el-button>
              <el-button @click="closeEditItem(data)" type="text" size="mini">
                取消
              </el-button>
            </template>
            <el-button
              v-else
              type="text"
              size="mini"
              @click.stop="editTreeItem(data)"
            >
              编辑
            </el-button>

            <el-button type="text" size="mini" style="color:#F56C6C">
              删除
            </el-button>
          </div>
        </div>
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="groupDialog.visible = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" size="small">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditItem from "@/components/ElTableEdit/EditItem";
export default {
  name: "Role",
  components: { EditItem },
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
      groupDialog: {
        visible: false,
        roleId: "", // 编辑时
        treeData: [
          {
            id: "1",
            path: "/index",
            title: "首页",
            icon: "el-icon-s-home",
            affix: true,
          },
          {
            id: "2",
            title: "权限管理",
            icon: "el-icon-s-tools",
            children: [
              {
                id: "2-1",
                path: "/permis/menu",
                title: "菜单管理",
              },
              {
                id: "2-2",
                path: "/permis/role",
                title: "角色管理",
              },
              {
                id: "2-3",
                path: "/permis/account",
                title: "用户管理",
              },
            ],
          },
          {
            id: "3",
            path: "/icon",
            title: "图标",
            icon: "el-icon-s-opportunity",
          },
          {
            id: "4",
            path: "/about",
            title: "数据看板",
            icon: "el-icon-s-marketing",
          },
          {
            id: "5",
            title: "嵌套路由",
            icon: "el-icon-finished",
            children: [
              {
                id: "5-1",
                hidden: true,
                path: "/menu1",
                title: "回到顶部",
                icon: "el-icon-caret-top",
              },
              {
                id: "5-2",
                path: "/menu2",
                title: "换肤预览",
                icon: "el-icon-s-marketing",
              },
              {
                id: "5-3",
                path: "/menu3",
                title: "无权限",
                icon: "el-icon-s-marketing",
                permission: false,
              },
            ],
          },
        ],
      },
      titleRules: [
        { required: true, message: "请输入菜单名称" },
        {
          min: 2,
          max: 5,
          message: "长度在 2 到 5 个字符",
        },
      ],
    };
  },
  created() {
    this.getPagesList();
  },
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
        this.$set(item, "isAdd", false);
        this.$set(item, "permission", false);
        this.$set(item, "hidden", false);
        this.$set(item, "affix", false);
      });
      this.$refs.form && this.$refs.form.resetFields();
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
          this.$set(item, "isAdd", true);
          this.$set(item, "permission", found.permission || false); // 如果有权限必须返回true
          this.$set(item, "hidden", found.hidden || false);
          this.$set(item, "affix", found.affix || false);
        } else {
          this.$set(item, "isAdd", false);
          this.$set(item, "permission", false);
          this.$set(item, "hidden", false);
          this.$set(item, "affix", false);
        }
      });
      this.$refs.form && this.$refs.form.resetFields();
      this.dialog.visible = true;
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = Object.assign(
            { roleId: this.dialog.roleId },
            this.dialog.form
          );
          data.role = this.pages.filter((item) => item.isAdd);
          console.log(data);
        }
      });
    },

    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.path) {
        return type !== "inner";
      } else {
        return true;
      }
    },
    // 编辑分组
    editTreeItem(data) {
      this.$set(data, "edit", true);
    },
    // 取消编辑分组
    closeEditItem(data) {
      this.$set(data, "edit", false);
      this.$set(data, "icon", this.$refs["edit-icon-" + data.id].initValue);
      this.$set(data, "title", this.$refs["edit-title-" + data.id].initValue);
    },
    submitItem(data) {
      this.$refs["edit-title-" + data.id]
        .validateRow()
        .then(() => {
          console.log("校验通过");
        })
        .catch((errors) => {
          this.$message.error(errors[0].message);
        });
    },
  },
};
</script>

<style scoped>
.my-dialog >>> .el-dialog__body {
  padding: 0 20px;
}
.el-tree >>> .el-tree-node__content {
  height: 36px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node-item {
  display: flex;
}
</style>
