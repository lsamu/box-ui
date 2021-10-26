<template>
  <div class="box-check-block">
    <span
      :class="'box-check-block__tag ' + currentActive(item)"
      v-for="(item, index) in currentOption.items"
      :key="index"
      @click="onSelected(item)"
    >
      {{ item.label }}
    </span>
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
import Enumerable from "linq";

export default defineComponent({
  name: "CheckBlock",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      selectedItems: [],
    });

    const currentOption = computed(() => {
      const defaultOption = {
        multiple: true,
      };
      const defaultItems = [
        {
          label: "北京",
          value: 1,
        },
        {
          label: "上海",
          value: 2,
        },
      ];
      let oo = Object.assign(defaultOption, props.option || {});
      oo["items"] = Object.assign(defaultItems, oo["items"] || []);
      return oo;
    });

    // @Watch("selectedItems")
    // public watchSelectedItems(n:any, o:any) {
    //   let returnInput:any = this.selectedItems;
    //   if (!this.currentOption.multiple) {
    //     let len = this.selectedItems.length;
    //     returnInput = null;
    //     if (len > 0) {
    //       returnInput = this.selectedItems[0];
    //     }
    //   }
    //   this.$emit("input", returnInput);
    // }

    //激活项
    const currentActive = function (item: any) {
      const mm = Enumerable.from(thatData.selectedItems).firstOrDefault(
        (p) => p == item.value
      );
      if (mm != null) {
        return "box-check-block__tag--active";
      }
      return "";
    };

    //选择项
    const onSelected = function (item: any) {
      let len = thatData.selectedItems.length;
      if (!currentOption.value.multiple && len >= 1) {
        thatData.selectedItems.splice(0, len);
        thatData.selectedItems.push(item.value);
        return;
      }
      const mm = Enumerable.from(thatData.selectedItems).firstOrDefault(
        (p) => p == item.value
      );
      if (mm != null) {
        thatData.selectedItems = thatData.selectedItems.filter(
          (item) => item !== mm
        );
      } else {
        thatData.selectedItems.push(item.value);
      }
    };

    return {
      ...toRefs(thatData),
      currentActive,
      currentOption,
      onSelected,
    };
  },
});
</script>
<style lang="scss">
.box-check-block {
  display: inline-block;
  &__tag {
    padding: 0 12px;
    margin-right: 24px;
    margin-bottom: 12px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    white-space: nowrap;
    display: inline-block;
  }
  &__tag--active {
    color: #fff;
    background-color: #1890ff;
    border-radius: 5px;
  }
}
</style>
