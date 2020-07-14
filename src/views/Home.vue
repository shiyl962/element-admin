<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-input v-model="value"></el-input>
  </div>
</template>

<script>
// @ is an alias to /src
import { getMenuList } from "@/api/index";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    getMenuList().then((value) => {
      console.log(value.data);
    });
  },
};
</script>
