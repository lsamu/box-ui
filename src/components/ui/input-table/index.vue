<template>
  <div class="box-input-table">
    <el-input
      :placeholder="currentOption.placeholder"
      :suffix-icon="showTree ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
      @click.native="deptogglePanel($event)"
      v-model="currentValue[currentOption.displayText]"
      readonly="readonly"
    >
    </el-input>
    <box-dialog-datagrid
      :option="currentDataGrid"
      :data="data"
      ref="boxDialogDataGrid"
    ></box-dialog-datagrid>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
} from "@vue/composition-api";

export default defineComponent({
  name: "InputTable",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: {},
      showTree: false,
    });

    //当前上下选项
    const currentOption = computed(() => {
      let defaultOption = {};
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    //当前表格选项
    const currentDataGrid:any = function () {
      const defaultDataGridOption = {
        title: "请根据条件进行筛选.",
        isAdd: false,
        placeholder: "双击数据行进行选择!",
        isOP: false,
        onRowDbClick: onRowDbClick,
        displayText: "label",
        columns:[]
      };

      let oo = Object.assign(defaultDataGridOption, currentOption.value || {});
      return oo;
    };
    //当前表格列
    const currentDataGridColumns = function () {
      let oo = Object.assign([], currentDataGrid.value.columns || []);
      return oo;
    };

    //当前选择的值
    const currentValue = function () {
      let defaultValue = {};
      let oo = Object.assign(defaultValue, props.value || {});
      return oo;
    };

    // 点击input 阻止冒泡 控制table显示隐藏
    const deptogglePanel = function (event) {
      event || (event = window.event);
      event.stopPropagation
        ? event.stopPropagation()
        : (event.cancelBubble = true);
      refDialogDataGrid().open();
    };

    const refDialogDataGrid = function () {
      return that.$refs["boxDialogDataGrid"] as any;
    };

    const onRowDbClick = function (row) {
      refDialogDataGrid().close();
      context.emit("input", row);
    };

    return {
      ...toRefs(thatData),
      currentOption,
      currentDataGrid,
      currentDataGridColumns,
      currentValue,
      deptogglePanel,
      refDialogDataGrid,
      onRowDbClick
    };
  },
});
/*

  public showTree = false;
 
 
}*/
</script>
<style lang="less">
.box-input-table {
  .tree {
    position: absolute;
    top: 40px;
    left: -1px;
    z-index: 5000;
    width: 100%;
    overflow: auto;
    max-height: 400px;
    .el-table {
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    .el-table /deep/ td {
      padding: 4px 0;
    }
  }
}
</style>
