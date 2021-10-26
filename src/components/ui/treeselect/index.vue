<template>
  <div class="box-treeselect">
    <treeselect
      v-model="formData"
      :multiple="currentOption.multiple"
      :options="currentOption.data"
      :disable-branch-nodes="false"
      :show-count="true"
      :flatten-search-results="true"
      :normalizer="currentOption.normalizer"
      :placeholder="currentOption.placeholder"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
  watch,
} from "@vue/composition-api";
import Treeselect from "@riophae/vue-treeselect";

import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default defineComponent({
  name: "Treeselect",
  components: { Treeselect },
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value,
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    const handleSelect = function (node, instanceId) {};

    const currentOption = computed(() => {
      const defaultOption = {
        placeholder: "请选择下拉操作!",
        multiple: false,
        node: {
          id: "id",
          label: "label",
          children: "children",
        },
        normalizer: (node) => {
          if (node.children && !node.children.length) {
            delete node["children"];
          }
          return {
            id: node["id"],
            label: node["label"],
            children: node["children"],
          };
        },
        data: [
          {
            id: "1",
            label: "a",
            children: [
              {
                id: "2",
                label: "aa",
              },
              {
                id: "3",
                label: "ab",
              },
            ],
          },
          {
            id: "4",
            label: "b",
          },
          {
            id: "5",
            label: "c",
          },
        ],
      };
      //判断
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    return {
      ...toRefs(thatData),
      currentOption,
      handleSelect,
    };
  },
});
/*

 

}*/
</script>
<style lang="scss">
.box-treeselect {
  width: 220px;
  .vue-treeselect__control {
    height: 32px;
  }
}
</style>
