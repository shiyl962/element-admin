<template>
  <transition name="slide-fade">
    <div class="lock-container">
      <div class="form">
        <div class="title">锁屏中...</div>
        <div class="group">
          <el-input
            v-model="value"
            placeholder="请输入锁屏密码"
            type="password"
          ></el-input>
          <el-button type="primary" plain icon="el-icon-unlock"> </el-button>
          <el-tooltip content="退出登录" placement="bottom" effect="light">
            <el-button type="primary" plain icon="el-icon-switch-button">
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      value: "",
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
.lock-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}
.form {
  width: 400px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff;
}
.title {
  line-height: 60px;
  font-size: 24px;
}
.group {
  display: flex;
}
.group .el-button {
  margin-left: -1px;
  border-radius: 0;
}
.group >>> .el-input__inner {
  border-radius: 0;
}

.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 2s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-100%);
}
</style>
