<template>
  <box-dialog :option="currentOption" ref="dialog1">
    <box-datagrid
      ref="datagrid1"
      :option="currentOption.datagrid"
      :data="data"
    ></box-datagrid>
    <template slot="footer">
      <el-button type="primary" icon="el-icon-close" @click="close"
        >关闭</el-button
      >
    </template>
  </box-dialog>
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
  name: "DialogDatagrid",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: { items: [] },
    });

    //弹窗项
    const currentOption = computed(() => {
      const defaultOption = {};
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    //打开
    const open = function () {
      (that.$refs["dialog1"] as any).open();
    };

    //关闭
    const close = function () {
      refDialog().close();
    };

    const refDialog = function () {
      return that.$refs["dialog1"] as any;
    };

    const refDataGrid = function () {
      return that.$refs["datagrid1"] as any;
    };

    //双击行
    const onRowDbClick = function (row: any, column: any, event: any) {
      close();
    };

    return {
      ...toRefs(thatData),
      currentOption
    };
  },
});
</script>
