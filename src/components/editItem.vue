<template>
  <div
    :class="{
      'check-item': options.rules && options.rules.length,
      'is-error': isError,
    }"
  >
    <el-select
      v-if="options.type === 'select'"
      v-model="modelValue"
      :placeholder="options.placeholder || '请选择'"
      :clearable="options.clearable"
    >
      <el-option
        v-for="i in options.options"
        :key="i.value"
        :label="i.label"
        :value="i.value"
      >
      </el-option>
    </el-select>
    <el-input
      v-else
      v-model="modelValue"
      :placeholder="options.placeholder || '请输入内容'"
      :clearable="options.clearable"
    ></el-input>
    <div v-if="isError" class="item-error">{{ message }}</div>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isError: false,
      message: "",
      initValue: this.value,
    };
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    // 字段验证
    validateRow() {
      // 没有规则时直接返回成功
      if (!(this.options.rules && this.options.rules.length)) {
        return new Promise((resolve) => {
          resolve(true);
        });
      }

      return new Promise((resolve, reject) => {
        const descriptor = { value: this.options.rules };
        const validator = new Schema(descriptor);
        validator.validate({ value: this.value }, (errors) => {
          if (errors) {
            this.isError = true;
            this.message = errors[0].message;
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    },
    // 取消编辑
    cancelEdit() {
      this.$emit("input", this.initValue);
    },
  },
};
</script>

<style scoped>
.check-item {
  position: relative;
}
.is-error >>> .el-input__inner {
  border-color: #f56c6c;
}
.item-error {
  line-height: 16px;
  font-size: 12px;
  color: #f56c6c;
}
</style>
