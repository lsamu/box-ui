<template>
  <div
    class="box-button-dialog"
    :style="{ height: currentOption.height + 'px' }"
  >
    <box-image
      v-if="currentOption.image"
      style="width: 100%"
      :option="currentOption"
    ></box-image>
    <box-button :option="currentOption" v-else></box-button>
    <box-dialog ref="refDialog" :option="optionDialog"></box-dialog>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  computed,
} from "@vue/composition-api";

export default defineComponent({
  name: "ButtonDialog",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root?.proxy;

    const currentOption = computed(() => {
      const defaultOption ={
        image:false
      }
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const optionDialog = computed(() => {
      let oo = Object.assign({}, currentOption.value.dialog || {});
      return oo;
    });

    const refDialog = function () {
      return that.$refs["refDialog"] as any;
    };

    currentOption.value.onClick = function () {
      refDialog().open();
    };

    return {
      currentOption,
      optionDialog,
      refDialog,
    };
  },
});
</script>
<style lang="scss">
.box-button-dialog {
  display: inline-block;
  width: 100%;
}
</style>
