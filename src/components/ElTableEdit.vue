<template>
  <el-table :data="data" v-bind="$attrs">
    <el-table-column
      v-for="item in columns"
      :label="item.title"
      :key="item.key"
    >
      <template slot-scope="scope">
        <!-- 编辑时 -->
        <template v-if="item.edit && scope.row._edit">
          <CheckItem
            v-if="item.type === 'select'"
            :value="scope.row[item.key]"
            :rules="item.rules"
            :ref="'chechItem-' + scope.$index"
          >
            <el-select
              v-model="scope.row[item.key]"
              :placeholder="item.placeholder || '请选择'"
              :clearable="item.clearable"
            >
              <el-option
                v-for="i in item.options"
                :key="i.value"
                :label="i.label"
                :value="i.value"
              >
              </el-option>
            </el-select>
          </CheckItem>

          <CheckItem
            v-else
            :value="scope.row[item.key]"
            :rules="item.rules"
            :ref="'chechItem-' + scope.$index"
          >
            <el-input
              v-model="scope.row[item.key]"
              :placeholder="item.placeholder || '请输入内容'"
              :clearable="item.clearable"
            ></el-input>
          </CheckItem>
        </template>

        <!-- 预览时 -->
        <template v-else>
          <i v-if="item.type === 'icon'" :class="scope.row[item.key]"></i>

          <span v-else-if="item.type === 'select'">
            {{ scope.row[item.key] || selectFilter(item.options) }}
          </span>
          <span v-else>{{ scope.row[item.key] }}</span>
        </template>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template
        v-if="columns.some((item) => item.edit === true)"
        slot-scope="scope"
      >
        <el-button
          v-if="!scope.row._edit"
          @click="editItem(scope.row)"
          size="small"
          type="primary"
          plain
        >
          编辑
        </el-button>
        <template v-else>
          <el-button
            @click="validateRow(scope.row, scope.$index)"
            size="small"
            type="primary"
          >
            保存
          </el-button>
          <el-button size="small" @click="cancelEdit(scope.$index)">
            取消
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { objDeepCopy } from "@/utils/util";
import CheckItem from "@/components/CheckItem";

export default {
  /**
   * 事件
   * @delItem 点击删除时执行 参数：当前row
   */
  components: { CheckItem },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * 是否显示删除按钮
     */
    idDel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableDateCache: objDeepCopy(this.data),
    };
  },
  methods: {
    // 编辑单行
    editItem(row) {
      this.$set(row, "_edit", true);
    },

    // 取消编辑
    cancelEdit($index) {
      this.$set(this.data, $index, this.tableDateCache[$index]);
      this.data.forEach((item, index) => {
        if (index === $index) {
          this.$set(item, "_edit", false);
        }
      });
    },

    // 点击删除按钮
    delItem(row) {
      this.$emit("delItem", row);
    },

    // 点击保存按钮时表单验证
    validateRow(row, index) {
      const promiseList = [];
      this.$refs["chechItem-" + index].forEach((item) => {
        promiseList.push(item.validateRow());
      });
      Promise.all(promiseList)
        .then(() => {
          this.$emit("submitRow", row, true);
        })
        .catch(() => {
          this.$emit("submitRow", row, false);
        });
    },
  },
  filters: {
    selectFilter(value, options) {
      return options.find((item) => item.value === value) || "";
    },
  },
};
</script>
