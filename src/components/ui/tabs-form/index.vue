<template>
  <div class="box-tabs-form">
    <el-form
      ref="form"
      size="mini"
      :model="formData"
      @submit.native.prevent
      label-width="80px"
    >
      <div class="placeholder">{{ currentOption.placeholder }}</div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        :closable="currentClosable"
        addable
        @edit="handleTabsEdit"
        :key="certinfoKey"
      >
        <el-tab-pane
          :label="item[currentOption.caption]"
          :name="indexItem.toString()"
          v-for="(item, indexItem) in formData.items"
          :key="indexItem"
        >
          <el-form-item
            :prop="column.prop"
            :label="getLabel(column.label)"
            v-for="(column, index) in currentOption.columns"
            :key="index"
          >
            <component
              :is="getComponent(column.type)"
              :ref="column.prop"
              :option="column.option"
              v-model="item[column.prop]"
            >
            </component>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  computed,
  onMounted,
  nextTick,
} from "@vue/composition-api";
import Sortable from "sortablejs";

export default defineComponent({
  name: "TabsForm",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const defaultTab = (index) => {
      let tab = {};
      tab[currentOption.value.caption] = "选项卡" + index.toString();
      return tab;
    };

    const thatData = reactive({
      formData: {
        items: (props.value || []).length == 0 ? [defaultTab(0)] : props.value,
      },
      activeName: "0",
      certinfoKey: true,
      closable: true,
    });

    console.log(thatData.formData.items);

    const handleClick = function (tab, event) {
      thatData.activeName = tab.name;
    };

    const currentOption = computed(() => {
      const defaultOption = {
        hasCreate: true,
        index: false,
        count: 0,
        drag: false,
        caption: "title",
        columns: [],
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentClosable = computed(() => {
      if (thatData.formData.items.length <= 1) {
        return false;
      }
      return true;
    });

    //获取组件
    const getComponent = function (type) {
      let resultName = type;
      if (type == null || type == "input" || type == "textarea") {
        resultName = "input";
      }
      if (type == "select") {
        resultName = "select";
      }
      return "box-" + resultName;
    };

    //获取标签
    const getLabel = function (label: any) {
      if (label != null && label != "") {
        return label + ":";
      }
      return null;
    };

    const handleTabsEdit = function (targetName, action) {
      if (action == "add") {
        let tab = {};
        tab[currentOption.value.caption] = defaultTab(
          thatData.formData.items.length + 1
        );
        thatData.formData.items.push(tab);
      }
      if (action == "remove") {
        if (thatData.formData.items.length <= 1) {
          return;
        }
        thatData.formData.items.splice(targetName, 1);
      }
    };

    const rowDrop = function () {
      const tbody = document.querySelector(".box-tabs-form .el-tabs__nav");
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          if (newIndex == oldIndex) return;
          //elementUI tabs 需要减去一个数组 原因是有个element不是 同一级对象
          newIndex = newIndex - 1;
          oldIndex = oldIndex - 1;
          const currRow = thatData.formData.items.splice(oldIndex, 1)[0];
          thatData.formData.items.splice(newIndex, 0, currRow);
          thatData.certinfoKey = !thatData.certinfoKey;
          nextTick(() => {
            rowDrop();
          });
        },
      });
    };

    onMounted(() => {
      rowDrop();
    });

    return {
      ...toRefs(thatData),
      handleClick,
      currentOption,
      getComponent,
      getLabel,
      handleTabsEdit,
      currentClosable,
    };
  },
});
</script>
<style lang="scss">
.box-tabs-form {
}
</style>
