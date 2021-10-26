<template>
  <div class="box-particles"></div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  reactive,
} from "@vue/composition-api";
import CanvasNest from 'canvas-nest.js';

export default defineComponent({
  name: "Particles",
  components: {
  },
  props:["option","data","value"],
  setup(props,context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      cn: null,
    });

    const currentOption = computed(()=>{
      const defaultOption ={

      }
      let oo = Object.assign(defaultOption,props.option||{})
      return oo
    });

    onMounted(()=>{
      thatData.cn = new CanvasNest(that.$el, currentOption.value)
    })

    onUnmounted(()=>{
       thatData.cn.destroy()
    })

  },
});
</script>

<style lang="scss" scoped>
.box-particles {
  //   background-image: url(/static/img/sky.871d198.jpg);
  // display: block;
  background-size: cover;
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;

  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -2;
  opacity: 0.7;
}
</style>
