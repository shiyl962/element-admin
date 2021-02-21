<template>
  <div class="container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <draggable
        v-model="tabsItem"
        v-bind="options"
        group="people"
        @start="drag = true"
        @end="drag = false"
        tag="span"
      >
        <transition-group tag="span" name="flip-list">
          <router-link
            v-for="item in tabsItem"
            :key="item.title"
            ref="tag"
            class="tabs-item"
            :to="item.to"
            @contextmenu.prevent.native="openMenu(item, $event)"
          >
            {{ item.title }}
            <i
              class="el-icon-close"
              v-if="!item.affix"
              @click.prevent.stop="delTabs(item)"
            ></i>
          </router-link>
        </transition-group>
      </draggable>
    </scroll-pane>
    <ul
      v-show="contextmenu.visible"
      :style="{ left: contextmenu.actuallyLeft + 'px' }"
      class="contextmenu"
    >
      <li @click="refresh(contextmenu.item)">刷新</li>
      <li v-if="!contextmenu.item.affix" @click="delTabs(contextmenu.item)">
        关闭
      </li>
      <li @click="closeOthers(contextmenu.item)">关闭其他</li>
      <li @click="closeAll(contextmenu.item)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ScrollPane from "./ScrollPane";

// import throttle from "throttle-debounce/throttle";
//可以检测dom元素改变的插件
var elementResizeDetectorMaker = require("element-resize-detector");
export default {
  components: {
    draggable,
    ScrollPane,
  },
  data() {
    return {
      options: {
        animation: 300, //拖动过程中的延时动画
        forceFallback: false, //是否显示原生的html5的拖放
        ghostClass: "ghost-class", //拖动项的类名
        scroll: true, //当排序的容器是个可滚动的区域，拖放可以引起区域滚动
        scrollSensitivity: 100, //就是鼠标靠近边缘多远开始滚动默认30
        scrollSpeed: 500, //滚动速度，单位应该是:像素/秒
      },
      contextmenu: {
        visible: false,
        item: {}, //当前操作的tabs
        theoryLeft: 0, //理论上的left
        actuallyLeft: 0, //实际上的left
      },
      erdUltraFast: elementResizeDetectorMaker({
        strategy: "scroll", //<- For ultra performance.
      }),
    };
  },
  mounted() {
    this.$store.commit("addTabs", this.$route);
  },
  methods: {
    moveToCurrentTag() {
      this.$nextTick(() => {
        const tags = this.$refs.tag || [];
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveCenter(tag);
            break;
          }
        }
      });
    },
    //tabs点击右键执行的函数
    openMenu(item, event) {
      this.contextmenu.item = item;
      this.contextmenu.theoryLeft =
        event.toElement.offsetLeft + event.toElement.offsetWidth / 2 + 15;
      this.onResize();
      this.contextmenu.visible = true;
    },
    //关闭右键菜单
    closeMenu() {
      this.contextmenu.visible = false;
    },
    //计算右键菜单的实际位置，在浏览器窗口改变时会执行
    onResize() {
      if (this.contextmenu.theoryLeft + 80 > this.$el.clientWidth) {
        this.contextmenu.actuallyLeft = this.$el.clientWidth - 80;
      } else {
        this.contextmenu.actuallyLeft = this.contextmenu.theoryLeft;
      }
    },
    //刷新
    refresh(item) {
      this.$store.commit("delInclude", item.name);
      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + item.to,
        });
      });
    },
    //删除tabs
    delTabs(item) {
      if (item.affix) return;
      this.$store.commit("delTabs", item);
    },
    //关闭其他
    closeOthers(item) {
      this.$store.commit("closeOthers", item);
    },
    //关闭所有
    closeAll() {
      this.$store.commit("emptyTabs"); //清空tabs
    },
  },
  computed: {
    // tabs标签列表
    tabsItem: {
      get() {
        return this.$store.state.layout.tabs;
      },
      set(value) {
        this.$store.commit("replaceTabs", value);
      },
    },
  },
  watch: {
    $route() {
      this.$store.commit("addTabs", this.$route);
      this.moveToCurrentTag();
    },
    "contextmenu.visible": function(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
        this.erdUltraFast.listenTo(this.$el, this.onResize);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
        this.erdUltraFast.removeListener(this.$el, this.onResize);
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  background-color: #dcdfe6;
}
.tabs-item {
  display: inline-block;
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  margin-right: 8px;
  padding: 0 12px;
  border: 1px solid #f2f6fc;
  background-color: #f2f6fc;
  color: #909399;
  cursor: pointer;
}
.tabs-item:hover {
  color: #606266;
  border-color: #fff;
  background-color: #fff;
}
.tabs-item:hover::before {
  background: #2dca7f;
}
.tabs-item i {
  margin-left: 5px;
}

.router-link-active {
  background: #fff;
  border-color: #fff;
  color: #606266;
}
.router-link-active:hover {
  background: #fff;
  border-color: #fff;
  color: #909399;
}
.tabs-item::before {
  content: "";
  background: #dcdfe6;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin: 0 2px;
}
.router-link-active::before {
  content: "";
  background: #2dca7f;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin: 0 2px;
}

.ghost-class {
  opacity: 0;
}
.flip-list-move {
  transition: transform 0.5s;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 0.5s;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.el-icon-close {
  border-radius: 50%;
  font-size: 12px;
}
.el-icon-close:hover {
  background-color: #c0c4cc;
  color: #fff;
}
.contextmenu {
  width: 80px;
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  top: 30px;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
</style>
