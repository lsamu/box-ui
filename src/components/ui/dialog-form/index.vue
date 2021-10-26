<template>
  <component :is="getComponent()" :option="currentOption" ref="dialog1">
    <box-form
      :option="currentOption.form"
      ref="form1"
      v-model="formData"
    ></box-form>
    <template slot="footer">
      <slot name="toolbar"></slot>
      <el-button type="primary" icon="el-icon-check" @click="onSubmitForm"
        >提交</el-button
      >
      <el-button
        icon="el-icon-delete"
        @click="onResetForm"
        v-if="currentOption.hasReset"
        >重置</el-button
      >
    </template>
  </component>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
} from "@vue/composition-api";

export default defineComponent({
  name: "DialogForm",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: {},
    });

    //当前配置项
    const currentOption = computed(() => {
      const defaultOption = {
        drawer: false,
        hasReset: true,
        form: {
          hasFooter: false,
        },
      };
      let oo = Object.assign(defaultOption, props.option || {});
      oo["form"] = Object.assign({ hasFooter: false }, oo["form"] || {});
      return oo;
    });

    //打开
    const open = function () {
      refDialog().open();
    };

    //关闭
    const close = function () {
      refDialog().close();
    };

    //对话框实例
    const refDialog = function () {
      return that.$refs["dialog1"] as any;
    };

    //表单提交
    const onSubmitForm = function () {
      refForm().onSubmit();
    };

    //重置表单
    const onResetForm = function () {
      refForm().reset();
    };

    //设置
    const setOption = function (key: any, value: any) {
      refDialog().setOption(key, value);
    };

    //表单实例
    const refForm = function () {
      return that.$refs["form1"] as any;
    };

    const getComponent = function () {
      if (this.currentOption.drawer) {
        return "box-drawer";
      }
      return "box-dialog";
    };

    return {
      ...toRefs(thatData),
      currentOption,
      getComponent,
      onSubmitForm,
      onResetForm,
      open,
      close,
      setOption,
      refForm
    };
  },
});
/*

  //表单
  public formData: any = {};

 
}*/
</script>
