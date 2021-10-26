<template>
  <img :src="formData" alt="" class="box-image" @click="onClick"/>
</template>
<script lang="ts">
import { defineComponent, reactive, watch ,computed, toRefs} from "@vue/composition-api";

export default defineComponent({
  name: "BoxImage",
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || "#",
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    const currentOption = computed(() => {
      let oo = {
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
      ...toRefs(thatData),
      currentOption,
      onClick
    };
  },
});
</script>
<style lang="scss">
.box-image {
  width: 100%;
  height: 100%;
}
</style>
