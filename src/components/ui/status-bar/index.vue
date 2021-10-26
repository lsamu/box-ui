onst
<template>
  <div class="box-status-bar">
    <div class="status-item" v-for="(item, index) in currentData" :key="index">
      <component
        :is="getComponent(item.type || 'label')"
        :option="item.option"
      ></component>
    </div>
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

export default defineComponent({
  name: "StatusBar",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value || {},
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    const currentOption = computed(() => {
      let oo = {
        data: [
          {
            type: "label",
            value: "sdf",
          },
          {
            type: "button",
          },
        ],
      };
      return oo;
    });

    const currentData = computed(() => {
      let oo = [];
      oo = Object.assign(oo, currentOption.value.data || []);
      return oo;
    });

    const getComponent = function (type) {
      return "box-" + type;
    };

    return {
      ...toRefs(thatData),
      currentOption,
      currentData,
      getComponent,
    };
  },
});
</script>
<style lang="scss">
.box-status-bar {
  border-style: solid;
  border-width: thin;
  border-color: #d7dde4;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 0px 0px;
  height: 27px;
  /*max-height: 50px;*/
  /*max-width: 800px;*/
  background: rgba(255, 255, 255, 1);
  color: #657180;
  white-space: normal;
  /*overflow: auto;*/
  z-index: 1;
  /*resize: vertical;*/
  transition: height 1s;
  .status-item {
    float: right;
  }
}
</style>
