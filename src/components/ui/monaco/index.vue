<template>
  <div class="box-monaco-editor">
    <MonacoEditor
      class="editor"
      v-model="formData"
      :language="currentOption.language"
      :style="{ height: height, width: '100%' }"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/composition-api";
import MonacoEditor from "vue-monaco";

const defaultOption = {
  language: "javascript",
  height: 300,
};

export default defineComponent({
  name: "Monaco",
  components: {
    MonacoEditor,
  },
  props: ["option", "data", "value"],
  setup(props, context) {
    let formData = ref(props.value || "");

    const currentOption = computed(() => {
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const height = computed(() => {
      return currentOption.value.height + "px";
    });

    watch(formData, (n, o) => {
      context.emit("input", n);
    });

    watch(
      () => props.value,
      (n, o) => {
        formData.value = n;
      }
    );

    return {
      formData,
      currentOption,
      height,
    };
  },
});
</script>
<style lang="scss">
.box-monaco-editor {
  width: 100%;
  display: block;
  border: 1px solid #eee;
  padding: 5px;
}
</style>
