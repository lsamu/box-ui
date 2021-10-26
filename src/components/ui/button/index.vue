<template>
  <div class="box-button">
    <el-button
      :type="currentOption.style"
      :size="currentOption.size"
      :icon="currentOption.icon"
      :plain="currentOption.plain"
      :round="currentOption.round"
      :circle="currentOption.circle"
      @click="onClick"
      >{{ currentOption.text }}</el-button
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Button",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      let oo = {
        style: null,
        text: "按钮",
        onClick: null,
      };
      oo = Object.assign(oo, props.option || {});
      return oo as any;
    });

    const onClick = function () {
      if (currentOption.value.onClick != null) {
        currentOption.value.onClick(this.data);
      }
    };

    return {
      currentOption,
      onClick
    };
  },
});
</script>
<style lang="scss">
.box-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
}
</style>
