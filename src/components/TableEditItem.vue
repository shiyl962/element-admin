<template>
  <div>
    <el-input
      v-if="edit"
      v-model="valueCopy"
      :clearable="clearable"
      :placeholder="placeholder"
    />
    <template v-else>
      <span v-if="type === 'string'">{{ valueCopy }}</span>
      <i v-if="type === 'icon'" :class="valueCopy"></i>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["string", "icon", "select"].indexOf(value) !== -1;
      },
      default: "string",
    },
    edit: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: [Array, Object],
      default: () => {},
    },
  },
  data() {
    return {
      initValue: "", // value的初始值，用于取消编辑时恢复数据
    };
  },
  computed: {
    valueCopy: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  created() {
    this.initValue = this.value;
  },
  methods: {},
};
</script>
