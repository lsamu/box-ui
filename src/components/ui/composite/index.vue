<template>
  <div class="box-composite">
    <div
      v-for="(item, index) in data.items"
      :key="index"
      :style="{
        top: item.x + 'px',
        left: item.y + 'px',
        width: item.width + 'px',
        height: item.height + 'px',
      }"
    >
      <component :is="handleComponent(item.type)" :option="item.option"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Composite",
  props: ["option", "value"],
  setup(props, context) {
    const { option, value } = reactive(props);

    let data = ref({
      items: option.items,
    });

    const handleComponent = function (type:any) {
      if (type == null || type == "" || type == "textarea") {
        return "box-input";
      }
      return "box-" + type;
    };

    return {
      data,
      handleComponent,
    };
  },
});
</script>
<style lang="scss">
.box-composite {
  position: relative;
}
</style>
