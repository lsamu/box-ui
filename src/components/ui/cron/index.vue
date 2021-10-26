<template>
  <div class="box-cron">
    <el-popover v-model="cronPopover">
      <cron @change="changeCron" @close="cronPopover = false" i18n="cn"></cron>
      <el-input
        slot="reference"
        @click="cronPopover = true"
        v-model="cron"
        placeholder="请输入定时策略"
      ></el-input>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "@vue/composition-api";

export default defineComponent({
  name: "Cron",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      cronPopover: false,
      cron: props.value || "",
    });

    const currentOption = computed(() => {
      let oo = {};
      oo = Object.assign(oo, props.option || {});
      return oo;
    });

    const changeCron = function (val: any) {
      thatData.cron = val;
    };

    return {
      ...toRefs(thatData),
      currentOption,
      changeCron
    }
  },
});
</script>
<style lang="scss" scoped>
.box-cascader {
}
</style>
