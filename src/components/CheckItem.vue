<template>
  <div :class="{ 'check-item': rules.length, 'is-error': isError }">
    <slot />
    <div v-if="isError" class="item-error">{{ message }}</div>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isError: false,
      message: "",
    };
  },
  methods: {
    validateRow() {
      // 没有规则时直接返回成功
      if (!(this.rules && this.rules.length)) {
        return new Promise((resolve) => {
          resolve(true);
        });
      }

      return new Promise((resolve, reject) => {
        const descriptor = { value: this.rules };
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
