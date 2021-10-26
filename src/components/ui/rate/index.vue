<template>
  <el-rate v-model="text"
           style="margin-top:10px"
           @change="handleChange"
           @click.native="handleClick"
           :max="max"
           :readonly="readonly"
           :texts="texts"
           :show-text="showText"
           :icon-classes="iconClasses"
           :void-icon-class="voidIconClass"
           :disabled="disabled"
           :colors="colors"></el-rate>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  name: "Rate",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({

    });

    return {
      ...toRefs(thatData)
    }
  },
})
</script>