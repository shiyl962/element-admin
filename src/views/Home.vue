<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-input v-model="value"></el-input>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      value: "",
    };
  },
};
</script>
