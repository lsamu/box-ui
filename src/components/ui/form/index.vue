<template>
  <div class="box-form">
    <el-form
      ref="refForm"
      size="small"
      :label-width="currentOption.labelWidth + 'px'"
      :label-position="currentOption.labelPosition"
      :rules="currentRules"
      :model="formData"
      @submit.native.prevent
    >
      <el-row :gutter="currentOption.gutter">
        <el-col
          :span="getSpan(item.span)"
          v-for="(item, index) in currentItems"
          :key="index"
          :ref="'ref-col-' + item.prop"
        >
          <el-form-item
            :label="getLabel(item.label)"
            :prop="item.prop"
            :class="{ labelHidden: (item.label || '') == '' ? true : false }"
          >
            <!-- 工具提示 -->
            <span slot="label">
              {{ getLabel(item.label) }}
              <el-tooltip
                v-if="item.tip"
                :content="item.tip"
                placement="top-start"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
            <template v-if="item.type == 'tabs' || item.type == 'group'" >
              <component
                :is="getComponent(item.type)"
                v-model="formData"
                :ref="'ref-item-' + item.prop"
                :option="item"
                :data="item.data"
              >
              </component>
            </template>
            <template v-else>
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
            </template>
          </el-form-item>
        </el-col>
        <el-col
          :span="getSpan(24)"
          :style="'text-align:' + currentOption.footer.location"
          v-if="currentOption.footer.visable"
        >
          <el-button
            type="primary"
            @click="onSubmit"
            icon="el-icon-check"
            v-if="currentOption.isSubmit"
            >{{ currentOption.submitText }}</el-button
          >
          <el-button
            @click="reset"
            icon="el-icon-delete"
            v-if="currentOption.isReset"
            >重置</el-button
          >

          <el-button
            :type="button.type"
            :icon="button.icon"
            @click="button.onClick"
            v-for="(button, indexButton) in currentOption.footer.buttons"
            :key="indexButton"
          >
            {{ button.label }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  nextTick,
  watch,
  getCurrentInstance,
  watchEffect,
  reactive,
  onMounted,
  toRefs,
} from "@vue/composition-api";
import Enumerable from "linq";
import merge from "deepmerge";

const defaultOption = {
  width: 500,
  labelWidth: 100,
  labelPosition: "right", //left right top
  isSubmit: true,
  isReset: true,
  isDetail: false,
  submitText: "提交",
  resetText: "重置",
  hasFooter: false,
  isEditing: false, //是否编辑中
  inline: false,
  gutter: 2,
  items: [],
  footer: {
    visable: false,
    location: "center",
    buttons: [],
  },
};

export default defineComponent({
  name: "Form",
  props: ["option", "value"],
  setup(props, context) {
    let xx = getCurrentInstance();
    let that: any = xx.proxy;

    const thatData = reactive({
      formData: props.value || {},
      formDataReset: props.value || {},
    });

    //操作选项
    let refOption = ref(props.option);

    const currentOption = computed({
      get: () => {
        let oo = merge(defaultOption, refOption.value || {});
        return oo;
      },
      set: (val) => {
        refOption.value = val;
      },
    });

    //当前表达式验证
    const currentRules = computed(() => {
      const defaultRule = {};
      let rules: any = {};
      for (const item of currentOption.value.items) {
        if (item.rules != null) {
          rules[item.prop] = item.rules;
        }
      }
      return rules;
    });

    //当前数据项
    const currentItems = computed(() => {
      let newItems = Enumerable.from(currentOption.value.items).where((p) => {
        return !((p as any).hidden || false);
      });
      //处理默认值 formData大于控件内value的设置
      return newItems.toArray();
    });

    //获取默认值
    const currentDefaultValues = computed(() => {
      let oo: any = {};
      Enumerable.from(currentItems.value).forEach((item: any) => {
        let valueObj = (item as any).value;
        if (valueObj && item["prop"]) {
          oo[item["prop"]] = valueObj;
        }
      });
      return oo;
    });

    //清楚验证
    const clearValidate = async function () {
      await nextTick(() => {
        refForm().clearValidate();
      });
    };

    //重置
    const reset = async function () {
      nextTick(() => {
        thatData.formData = Object.assign({}, thatData.formDataReset || {});
      });
    };

    //设置选项
    const setOption = function (name: any, val: any) {
      let tmp: any = {};
      tmp[name] = val;
      currentOption.value = Object.assign(currentOption.value, tmp || {});
    };

    //设置表单
    const setFormData = function (val: any) {
      clearValidate();
      thatData.formData = Object.assign({}, val || {});
      thatData.formDataReset = Object.assign({}, val || {});
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

    //获取标签
    const getLabel = function (label: any) {
      if (label != null && label != "") {
        return label + ":";
      }
      return null;
    };

    //获取组件
    const getComponent = function (type: any) {
      //获取组件名称
      let resultName = type;
      if (
        type == null ||
        type == "input" ||
        type == "textarea" ||
        type == "password" ||
        type == "number"
      ) {
        resultName = "input";
      }
      return "box-" + resultName;
    };

    //组件实例
    const refForm = function () {
      return that.$refs["refForm"] as any;
    };

    const refItem = function (prop: any) {
      return that.$refs["ref-item-" + prop] as any;
    };

    //列实例
    const refCol = function (ele: any) {
      return that.$refs["ref-col-" + ele] as any;
    };

    //提交
    const onSubmit = async function () {
      let isPass = true;
      //需要递归执行 只要有错误就返回
      for (const item of currentItems.value as any) {
        if (item.type == "tabs" || item.type == "group") {
          let flag = await refItem(item.prop).validate();
          if (!flag) {
            isPass = false;
          }
        }
        continue;
      }
      if (!isPass) {
        //通知提示
        console.log("error child submit!!");
        return;
      }
      refForm()["validate"](async (valid: any) => {
        if (valid) {
          context.emit("submit", thatData.formData);
          context.emit("onSubmit", thatData.formData);
          if (currentOption.value.onSubmit != null) {
            await currentOption.value.onSubmit(thatData.formData);
          }
        } else {
          //通知提示
          console.log("error submit!!");
          return false;
        }
      });
    };

    //格式化
    const toFormat = function (val: any, option: any) {
      return val;
    };

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    watch(
      () => props.value,
      (n, o) => {
        thatData.formData = n || {};
      }
    );

    onMounted(() => {
      thatData.formData = Object.assign(
        currentDefaultValues.value,
        thatData.formData
      );
    });

    return {
      ...toRefs(thatData),
      currentOption,
      currentRules,
      currentItems,
      clearValidate,
      getSpan,
      getButtons,
      getLabel,
      getComponent,
      onSubmit,
      reset,
      setFormData,
      setOption,
      toFormat,
      refForm,
      refItem,
      refCol
    };
  },
});
</script>
<style lang="scss">
.box-form {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  .labelHidden {
    margin-left: 1px;
    > .el-form-item__content {
      margin-left: 1px !important;
    }
  }
}
</style>
