<template>
  <div>
    <div class="container" :style="{ height: containerHeight + 'px' }">
      <div
        v-for="i in item"
        class="item"
        :key="i[itemkey]"
        :style="{
          width: colsWidth + 'px',
          height: i.itemBoxHeight + 'px',
          left: i.left + 'px',
          top: i.top + 'px',
        }"
      >
        <img :src="i[srcKey]" />
      </div>
    </div>
    <myLoading :show="loading" :height="loadingHeight" />
  </div>
</template>

<script>
var elementResizeDetectorMaker = require("element-resize-detector");
import myLoading from "@/components/my-loading";

export default {
  components: { myLoading },
  props: {
    // 图片路径
    srcKey: {
      type: String,
      default: "imgSrc",
    },
    // 列宽度
    colsWidth: {
      type: Number,
      default: 240,
    },
    // 列表渲染的 key ，默认为 srcKey
    idKey: {
      type: String,
      default: "",
    },
    /**
     * 默认是等所有img预加载完之后再渲染，但是这给用户的体验会很慢，所有我还加了个loading
     * 如果你的数据的顺序不重要，可以设置此参数为true，他会让用户更快看到图片，但是会打乱数据的顺序，同时去掉loading功能
     * 更好的方式是传入的数据中就包含有 itemBoxHeight（图片高度），这样会跳过预加载环节
     *  */
    fastWay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      item: [], // 实际渲染的瀑布流数据
      itemkey: this.idKey || this.srcKey, // 渲染时的key值
      loading: false, // 控制loading状态
      containerHeight: 0, // 父容器的高度
      cols: 0, // 当前最矮的列
      top: 0, // 当前最矮的列的高度
      erdUltraFast: elementResizeDetectorMaker({
        strategy: "scroll", //<- For ultra performance.
      }),
    };
  },
  computed: {
    // loading高度
    loadingHeight() {
      return this.item.length ? "100px" : "500px";
    },
  },
  mounted() {
    // 容器宽度改变时重新布局
    this.erdUltraFast.listenTo(this.$el, this.calcElement);
  },
  methods: {
    // 用来向item中添加数据
    // 现在是先加载完先渲染的逻辑
    addItemData(items) {
      // 出口
      let exit = (i, index) => {
        if (this.fastWay) {
          this.vnodeItem(i, index);
        } else {
          if (index >= items.length) {
            this.loading = false;
            items.forEach((item, index) => {
              this.vnodeItem(item, index + 1);
            });
          }
        }
      };

      let index = 0; // 用来记录已经预加载完成的个数
      items.forEach((i) => {
        if (!this.fastWay) {
          this.loading = true;
        }
        // 如果高度已知，就不需要预加载
        if (i.itemBoxHeight) {
          index++;
          exit(i, index);
        } else {
          let oImg = new Image();
          oImg.src = i[this.srcKey];
          oImg.onload = () => {
            index++;
            i.itemBoxHeight = (oImg.height / oImg.width) * this.colsWidth;
            exit(i, index);
          };
        }
      });
    },
    // 计算单个的位置
    vnodeItem(item, index) {
      let elWidth = this.$el.offsetWidth; // 获取容器的宽度
      let cols = Math.floor(elWidth / this.colsWidth); // 当前容器最多能放几列
      this.containerHeight = 0; // 初始化父容器高度

      if (this.item.length < cols) {
        item.top = 0;
        item.left = ((index - 1) % cols) * this.colsWidth;
        item.cols = index; // 所在的列
      } else {
        for (let i = 1; i <= cols; i++) {
          let colsHeight = 0;
          this.item
            .filter((item) => item.cols === i)
            .forEach((list) => {
              colsHeight += list.itemBoxHeight;
            });

          if (!item.top || colsHeight < item.top) {
            item.top = colsHeight;
            item.left = (i - 1) * this.colsWidth;
            item.cols = i;
          }
        }
      }

      this.item.push(item);
      // 在这里计算父容器的高度
      for (let i = 1; i <= cols; i++) {
        let colsHeight = 0;
        this.item
          .filter((item) => item.cols === i)
          .forEach((list) => {
            colsHeight += list.itemBoxHeight;
          });
        if (!this.containerHeight || this.containerHeight < colsHeight) {
          this.containerHeight = colsHeight;
        }
      }
    },
    // 容器宽度改变时重新布局
    calcElement() {
      let list = Array.from(this.item);
      this.item = [];
      list.forEach((item, index) => {
        item.cols = undefined;
        item.top = undefined;
        item.left = undefined;
        this.vnodeItem(item, index + 1);
      });
    },
  },
  beforeDestroy() {
    this.erdUltraFast.removeListener(this.$el, this.calcElement);
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
.item {
  position: absolute;
  box-sizing: border-box;
  padding: 10px;
  animation: show-card-data-v-ded6b974 0.4s;
  transition: left 0.6s, top 0.6s;
  transition-delay: 0.1s;
}
.item > img {
  width: 100%;
}
@keyframes show-card-data-v-ded6b974 {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
