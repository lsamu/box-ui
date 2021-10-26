<template>
  <div class="box-datagrid__toolbar" v-if="currentOption.toolbar.visible">
    <div class="box-datagrid__toolbar__left">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="onNew"
        v-if="currentOption.toolbar.hasAdd"
        >{{ currentOption.toolbar.addText }}</el-button
      >
      <slot name="toolbar_left"></slot>
      <!-- 动态组件 -->
      <div
        style="margin:5px;display: inline-block;position: relative;"
        v-for="(item, index) in currentLeftItems"
        :key="index"
      >
        <component
          :is="getComponent(item.type)"
          :option="item"
          :data="item.data"
        ></component>
      </div>
    </div>
    <div class="box-datagrid__toolbar__right">
      <!-- 动态组件 -->
      <div
        style="margin:5px;display: inline-block;position: relative;"
        v-for="(item, index) in currentRightItems"
        :key="index"
      >
        <component
          :is="getComponent(item.type)"
          :option="item"
          :data="item.data"
        ></component>
      </div>
      <el-tooltip
        effect="dark"
        :content="'搜索'"
        placement="top"
        v-if="currentOption.toolbar.hasSearch"
      >
        <el-button
          size="mini"
          circle
          icon="el-icon-search"
          @click="onToggleSearch"
        />
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="刷新"
        placement="top"
        v-if="currentOption.toolbar.hasRefresh"
      >
        <el-button
          size="mini"
          circle
          icon="el-icon-refresh"
          @click="onDataRefresh"
        />
      </el-tooltip>
      <el-tooltip
        placement="top"
        effect="dark"
        content="导出Excel"
        v-if="currentOption.toolbar.hasExport"
      >
        <el-button
          icon="el-icon-download"
          circle
          size="small"
          @click="onExportData"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="显隐列"
        placement="top"
        v-if="currentOption.toolbar.hasCheckColumn"
      >
        <el-popover placement="bottom-end" width="150" trigger="click">
          <el-button
            size="small"
            circle
            icon="el-icon-menu"
            slot="reference"
            style="margin-left: 10px"
          >
          </el-button>
          <el-checkbox> 全选 </el-checkbox>
          <el-checkbox
            v-for="(item, index) in currentColumns"
            :key="index"
            v-model="item.hidden"
            @change="onColumnsChange(item)"
          >
            {{ item.label }}
          </el-checkbox>
        </el-popover>
      </el-tooltip>
      <slot name="toolbar_right"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from "@vue/composition-api";
import merge from "deepmerge";

const defaultOption = {
  toolbar: {
    hasAdd: false,
    addText: "新增",
    hasSearch: false,
    hasRefresh: false,
    hasExport: false,
    hasCheckColumn: false,
    visible: false,
    items: [],
  },
  columns: [],
};

export default defineComponent({
  props: ["option"],
  setup(props, context) {
    let { option } = reactive(props);

    let tempOption = reactive(option);

    const currentOption = computed(() => {
      let oo = merge(defaultOption, tempOption);
      return oo;
    });

    const currentLeftItems = computed(() => {
      let aa:any = [];
      for (const item of currentOption.value.toolbar.items as any) {
        if (item.location == null || item.location == "before") {
          aa.push(item);
        }
      }
      return aa;
    });

    const currentRightItems = computed(() => {
      let aa = [];
      for (const item of currentOption.value.toolbar.items as any) {
        if (item.location == "after") {
          aa.push(item);
        }
      }
      return aa;
    });

    const getComponent = (type:any) => {
      if (type == null) {
        return "box-input";
      }
      return "box-" + type;
    };

    //控制显示列
    const onColumnsChange = (item:any) => {
      //控制列显示
    };

    //
    const onNew = () => {

    };
    //
    const onRefresh = () => {};
    //
    const onExport = () => {};
    //
    const onToggleSearch = () => {};
    //
    const onDataRefresh = () => {};
    //
    const onExportData = () => {};

    //当前列名
    const currentColumns = computed(() => {
      let columns:any = [];
      for (const col of currentOption.value.columns as any) {
        if (col.hidden) {
          continue;
        }
        columns.push(col);
      }
      return columns;
    });

    return {
      currentOption,
      currentColumns,
      onColumnsChange,
      onNew,
      onRefresh,
      onExport,
      onToggleSearch,
      onDataRefresh,
      onExportData,
      currentLeftItems,
      currentRightItems,
      getComponent,
    };
  },
});
</script>
