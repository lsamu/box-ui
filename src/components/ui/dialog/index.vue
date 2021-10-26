<template>
  <el-dialog
    :title="currentOption.title"
    :visible.sync="currentOption.visible"
    :width="currentOption.width"
    :before-close="handleHide"
    :fullscreen="currentOption.fullscreen"
    append-to-body
    center
    class="box-dialog"
    :destroy-on-close="true"
    @close="onClose"
    :close-on-click-modal="currentOption.closeOnClickModal"
  >
    <template #title>
      <div class="box-dialog__header">
        <span class="el-dialog__title">{{ currentOption.title }}</span>
        <div class="box-dialog__menu">
          <i
            class="el-dialog__close el-icon-full-screen"
            @click="handleFull"
          ></i>
        </div>
      </div>
    </template>

    <template>
      <slot></slot>
    </template>
    <component
      :is="getComponent(currentOption.body.type)"
      :option="currentOption.body"
      :data="currentOption.body.data"
      v-if="currentOption.body"
    ></component>
    <template #footer>
      <div
        class="box-dialog__footer"
        v-if="currentOption.footer.visable"
        :style="'text-align:' + currentOption.footer.location"
      >
        <slot name="footer"></slot>
        <box-button
          v-for="(item, index) in currentOption.footer.buttons"
          :key="index"
          :option="item"
        ></box-button>
        <el-button icon="el-icon-circle-close" @click="close">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
  computed,
} from "@vue/composition-api";
import merge from "deepmerge";

export default defineComponent({
  name: "Dialog",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root?.proxy;

    const currentOption: any = computed(() => {
      const defaultOption = {
        title: "提示",
        visible: false,
        fullscreen: false,
        width: "60%",
        body: null,
        closeOnClickModal: false,
        footer: {
          visable: true,
          location: "right",
          buttons: [],
        },
      };
      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const handleHide = function () {
      that.setOption("visible", false);
    };

    const handleFull = function () {
      setOption("fullscreen", !currentOption.value.fullscreen);
    };

    const setOption = function (name: any, val: any) {
      currentOption.value[name] = val;
      that.$forceUpdate();
    };

    const open = function () {
      setOption("visible", true);
    };

    const close = function () {
      setOption("visible", false);
    };

    const onClose = function () {};

    const getComponent = function (type: string) {
      if (type == "textarea") {
        type = "input";
      }
      return "box-" + type;
    };

    return {
      currentOption,
      handleHide,
      handleFull,
      setOption,
      open,
      close,
      onClose,
      getComponent,
    };
  },
});
</script>
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.box-dialog {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar {
    /*height: calc(100vh - 160px);*/
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 20px;
  }
  .el-dialog__headerbtn {
    top: 23px;
  }
  &__menu {
    margin-top: 6px;
    padding-right: 20px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .box-dialog__menu i {
    color: #909399;
    font-size: 15px;
  }
  &__footer {
    padding: 10px;
    border-top: 1px solid #dcdfe6;
  }
  .el-dialog__footer {
    padding: 10px;
  }
  .el-dialog__header {
    padding: 20px 20px 10px;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>
