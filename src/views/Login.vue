<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <h1 class="title">Login Form</h1>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          clearable
          show-password
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width:100%"
          >登 陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/mock-login.js";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "password",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    window.addEventListener("keypress", this.onEnter);
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (login(this.form.username, this.form.password)) {
            this.$store.commit("setMenuList", []); // 清空侧边栏菜单
            this.$store.commit("updateLock", null); // 清除锁屏
            this.$router.push("/");
          } else {
            this.$message.error("用户名或密码错误");
          }
        } else {
          this.$message.error("请输入用户名或密码！");
        }
      });
    },
    // 监听回车事件
    onEnter(e) {
      if (e.key === "Enter") {
        this.onSubmit();
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("keypress", this.onEnter);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #2d3a4b;
}
.form {
  width: 100%;
  max-width: 520px;
  color: #fff;
}
.form .title {
  font-size: 36px;
  padding: 12px 0;
}
</style>
