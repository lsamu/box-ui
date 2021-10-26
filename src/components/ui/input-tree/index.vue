<template>
  <div class="box-input-tree">
    <el-input
      :placeholder="currentOption.placeholder"
      :suffix-icon="showTree ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
      @click.native="deptogglePanel($event)"
      readonly="readonly"
    >
    </el-input>
    <div v-if="showTree" class="tree" ref="tableList">
      <el-tree
        :data="data1"
        :props="defaultProps"
        @node-click="handleNodeClick"
        class="tree-option"
        style="padding: 10px 0"
      ></el-tree>
    </div>
    <box-dialog ref="boxDialog">
      <el-tree
        :data="data1"
        :props="defaultProps"
        @node-click="handleNodeClick"
        class="tree-option"
        style="padding: 10px 0; height: 500px"
      ></el-tree>
    </box-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
  onMounted,
} from "@vue/composition-api";

    const data1 = [
      {
        label: "一级 1",
        children: [
          {
            label: "二级 1-1",
            children: [
              {
                label: "三级 1-1-1",
              },
            ],
          },
        ],
      },
      {
        label: "一级 2",
        children: [
          {
            label: "二级 2-1",
            children: [
              {
                label: "三级 2-1-1",
              },
            ],
          },
          {
            label: "二级 2-2",
            children: [
              {
                label: "三级 2-2-1",
              },
            ],
          },
        ],
      },
      {
        label: "一级 3",
        children: [
          {
            label: "二级 3-1",
            children: [
              {
                label: "三级 3-1-1",
              },
            ],
          },
          {
            label: "二级 3-2",
            children: [
              {
                label: "三级 3-2-1",
              },
            ],
          },
        ],
      },
    ];

export default defineComponent({
  name: "InputTree",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: {},
      showTree: false,
      text: "",
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      data1
    });


    const currentOption = computed(() => {
      let oo = Object.assign({ onChange: (ret) => {} }, props.option || {});
      return oo;
    });

    const boxDialog = function () {
      return that.$refs["boxDialog"] as any;
    };

    const handleChange = function () {};

    const handleNodeClick = function () {};

    // 点击input 阻止冒泡 控制table显示隐藏
    const deptogglePanel = function (event) {
      event || (event = window.event);
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      boxDialog().open();
    };

    const tableShow = function () {
      thatData.showTree = true;
      document.addEventListener("click", tableHideList, false);
    };
    const tableHide = function () {
      thatData.showTree = false;
      document.addEventListener("click", tableHideList, false);
    };

    const tableHideList = function (e) {
      if (
        that.$refs.tableList &&
        !(that.$refs as any).tableList.contains(e.target)
      ) {
        tableHide();
      }
    };

    return {
      ...toRefs(thatData),
      currentOption,
      boxDialog,
      handleChange,
      handleNodeClick,
      deptogglePanel,
      tableShow,
      tableHide,
      tableHideList
    };
  },
});
</script>
<style lang="less">
.box-input-tree {
  .tree {
    position: absolute;
    top: 40px;
    left: -1px;
    z-index: 1000;
    width: 868px;
    overflow: auto;
    max-height: 400px;
    .el-tree {
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    .el-tree /deep/ td {
      padding: 4px 0;
    }
  }
}
</style>
