<template>
  <div class="box-panel">
    <split-panel
      :min-percent="currentOption.min"
      :max-percent="currentOption.max"
      :default-percent="currentOption.default"
      :split="currentOption.split"
    >
      <template slot="paneL">
        <slot name="A"></slot>
      </template>
      <template slot="paneR">
        <slot name="B"></slot>
      </template>
    </split-panel>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "@vue/composition-api";
import Enumerable from "linq";
import SplitPanel from "vue-splitpane";

export default defineComponent({
  name: "Panel",
  components: {
    SplitPanel,
  },
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: [],
    });

    const currentOption = computed(() => {
      const defaultOption = {
        min: 10,
        max: 90,
        default: 20,
        split: "vertical", //horizontal  vertical
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    return {
      ...toRefs(thatData),
      currentOption,
    };
  },
});
</script>
<style lang="scss">
.box-panel {
  height: 100vh;
  min-height: 100vh;
  &__left {
    padding: 5px;
  }
  &__right {
    padding: 5px;
  }
}
</style>
