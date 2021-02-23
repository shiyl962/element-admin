<template>
  <div>
    <el-alert
      v-for="i in 100"
      :key="i"
      title="滑动页面即可看到右下方的按钮"
      type="success"
    >
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "Menu1",
};
</script>

<style scoped></style>
