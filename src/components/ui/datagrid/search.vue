<template>
  <div class="box-form-search">
    <el-form
      :inline="true"
      ref="form"
      size="small"
      :rules="currentRules"
      :model="formData"
      @submit.native.prevent
    >
      <el-form-item
        :label="getLabel(item.label)"
        :prop="item.prop"
        v-for="(item, index) in currentItems"
        :key="index"
      >
        <component
          :is="getComponent(item.type)"
          v-model="formData[item.prop]"
          :ref="'ref-item-' + item.prop"
          :option="item"
          :data="item.data"
          v-if="!currentOption.isDetail"
        >
        </component>
        <div v-else>{{ toFormat(formData[item.prop], item) }}</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="normal" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
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
  nextTick,
} from "@vue/composition-api";
import Enumerable from "linq";

export default defineComponent({
  name: "box-form-search",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: Object.assign({}, props.value || {}),
      resetForm: Object.assign({}, props.value || {}),
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", thatData.formData);
      }
    );

    //选项
    const currentOption = computed(() => {
      //选项
      const defaultOption = {
        width: 500,
        labelWidth: 180,
        isSubmit: true,
        isReset: true,
        isDetail: false,
        submitText: "提交",
        resetText: "重置",
        hasFooter: true,
        isEditing: false, //是否编辑中
        inline: false,
        gutter: 0,
        items: [],
      };
      //清空验证
      clearValidate();
      //复制数据 清除隐藏的字段
      let oo = Object.assign(defaultOption, props.option || {});
      //处理子项 主要是可以自定义组件
      return oo;
    });

    //验证
    const currentRules = computed(() => {
      const defaultRule = {};
      let rules: any = {};
      for (const item of currentOption.value.items) {
        if (item.rules != undefined) {
          rules[item.prop] = item.rules;
        }
      }
      return rules;
    });

    //当前组件项
    const currentItems:any = computed(() => {
      let newItems = Enumerable.from(currentOption.value.items).where((p) => {
        return true; // !((p as any).hidden || false);
      });
      //处理默认值 formData大于控件内value的设置
      return newItems.toArray();
    });

    //获取组件
    const getComponent = function (type: any) {
      //获取组件名称
      let resultName = type;
      if (type == null || type == "input" || type == "textarea") {
        resultName = "input";
      }
      return "box-" + resultName;
    };

    //提交
    const onSubmit = function () {
      (that.$refs as any)["form"]["validate"](async (valid: any) => {
        if (valid) {
          that.$emit("submit", thatData.formData);
          if (currentOption.value.onSubmit != null) {
            await currentOption.value.onSubmit(thatData.formData);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    //重置
    const reset = function () {
      nextTick(() => {
        thatData.formData = Object.assign({}, thatData.resetForm || {});
        refForm().resetFields();
      });
    };

    //清楚验证
    const clearValidate = function () {
      nextTick(() => {
        refForm().clearValidate();
      });
    };

    //设置选项
    const setOption = function (name: any, val: any) {
      that.$set(currentOption.value, name, val);
    };

    const setFormData = function (val: any) {
      thatData.formData = Object.assign({}, val || {});
      thatData.resetForm = Object.assign({}, val || {});
    };

    //获取显示的列数
    const getSpan = function (defaultSpan: any) {
      if (currentOption.value.inline) {
        return 6;
      }
      return defaultSpan;
    };

    //实现显示按钮
    const getButtons = function () {
      if (!currentOption.value.hasFooter) {
        return false;
      }
      if (!currentItems.value || currentItems.value.length == 0) {
        return false;
      }
      return true;
    };

    const toFormat = function (val: any, option: any) {
      return val;
    };

    //组件实例
    const refForm = function (): any {
      return that.$refs["form"] as any;
    };

    //项实例
    const refItem = function (ele: any) {
      if (that.$refs["ref-item-" + ele]) {
        return (that.$refs as any)["ref-item-" + ele][0] as any;
      }
      return null;
    };

    //列实例
    const refCol = function (ele: any) {
      if (that.$refs["ref-col-" + ele]) {
        return (that.$refs as any)["ref-col-" + ele][0] as any;
      }
      return null;
    };

    const getLabel = function (label: any) {
      if (label != null) {
        return label + ":";
      }
      return null;
    };

    return {
      ...toRefs(thatData),
      currentOption,
      currentRules,
      getLabel,
      getSpan,
      refForm,
      refItem,
      refCol,
      getComponent,
      currentItems,
      toFormat,
      onSubmit,
      reset
    };
  },
});
/*
}*/
</script>
<style lang="scss">
.box-form-search {
}
</style>
