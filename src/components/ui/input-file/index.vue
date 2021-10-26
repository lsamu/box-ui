<template>
  <div class="box-input-image">
    <el-input
      :placeholder="currentOption.placeholder"
      v-model="text"
      :readonly="true"
      @change="handleChange"
      :clearable="true"
    >
      <template slot="append">
        <el-button @click="handleSelect">选择文件</el-button>
      </template>
    </el-input>
    <box-dialog ref="refDialog" :option="currentDialogOption">
      <box-file-manager :option="currentFileManagerOption"></box-file-manager>
    </box-dialog>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
} from "@vue/composition-api";

export default defineComponent({
  name: "InputFile",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    let text = ref("");
    let refDialog = ref(null);

    const currentOption = computed(() => {
      const defaultOption = {
        placeholder: "请选择一个文件或者输入远程文件地址.",
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentDialogOption = computed(() => {
      const defaultOption = {
        title:"文件管理"
      };
      return defaultOption;
    });

    const currentFileManagerOption = computed(() => {
      const defaultOption = {};
      return defaultOption;
    });

    const handleSelect = function () {
      refDialog.value.open();
    };

    const handleChange = function () {};

    return {
      text,
      refDialog,
      currentOption,
      currentDialogOption,
      currentFileManagerOption,
      handleSelect,
      handleChange,
    };
  },
});
</script>
