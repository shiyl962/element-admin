<template>
  <ElTableEdit
    :data="tableData"
    :columns="columns"
    border
    style="width: 100%"
  />
</template>

<script>
import ElTableEdit from "@/components/ElTableEdit";
export default {
  name: "Account",
  components: { ElTableEdit },
  data() {
    return {
      columns: [
        {
          title: "关联角色",
          key: "roleName",
        },
        {
          title: "用户名",
          key: "userName",
          edit: true,
        },
        {
          title: "用户密码",
          key: "password",
          edit: true,
        },
        {
          title: "姓名",
          key: "name",
          edit: true,
        },
        {
          title: "性别",
          key: "sex",
          type: "select",
          options: [
            {
              label: "未知",
              value: "0",
            },
            {
              label: "男",
              value: "1",
            },
            {
              label: "女",
              value: "2",
            },
          ],
          edit: true,
        },
        {
          title: "联系电话",
          key: "phone",
          edit: true,
        },
        {
          title: "邮箱",
          key: "email",
          edit: true,
        },
      ],
      tableData: [
        {
          id: "11111",
          userName: "admin",
          password: "123456",
          name: "蔡海",
          sex: "男",
          phone: "155********",
          email: "ch155********@163.com",
          roleId: "",
          roleName: "admin",
        },
        {
          id: "22222",
          userName: "admin",
          password: "123456",
          name: "蔡海",
          sex: "男",
          phone: "155********",
          email: "ch155********@163.com",
          roleId: "",
          roleName: "admin",
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 新增用户
    addUserItem() {},
  },
  watch: {},
};
</script>

<style scoped></style>
