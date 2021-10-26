<template>
  <div class="box-datagrid__pager" v-if="currentOption.visible">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentOption.pageIndex"
      :page-sizes="currentOption.pageSizes"
      :page-size="currentOption.pageSize"
      :layout="currentOption.layout"
      :total="currentOption.total"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  watch,
} from "@vue/composition-api";

import merge from "deepmerge";

const defaultOption = {
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  pageSizes: [10, 20, 50, 100, 500],
  layout: "total, sizes, prev, pager, next, jumper",
};

export default defineComponent({
  props: ["option"],
  setup(props, context) {
    let { option } = reactive(props);

    let tempOption = reactive(option);

    let currentOption = computed(() => {
      let oo = merge(defaultOption, tempOption);
      return oo;
    });

    const handleSizeChange = (val:any) => {
      context.emit("handleSizeChange", val);
    };

    const handleCurrentChange = (val:any) => {
      context.emit("handleCurrentChange", val);
    };

    return {
      currentOption,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="scss"></style>
