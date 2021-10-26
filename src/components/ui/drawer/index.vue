<template>
  <el-drawer
    :title="currentOption.title"
    :visible.sync="currentOption.visible"
    :size="currentOption.size || '70%'"
    :before-close="hide"
    :fullscreen="currentOption.fullscreen"
    append-to-body
    center
    class="box-drawer"
    :destroy-on-close="true"
  >
    <div slot="title" class="box-drawer__header">
      <span class="el-drawer__title">{{ currentOption.title }}</span>
      <div class="box-dialog__menu" style="padding-right: 0px">
        <i class="el-dialog__close el-icon-full-screen" @click="full"></i>
      </div>
    </div>
    <el-container>
      <el-main style="height: 88vh">
        <slot></slot>
      </el-main>
      <el-footer>
        <div class="box-drawer__footer">
          <slot name="footer"></slot></div
      ></el-footer>
    </el-container>
  </el-drawer>
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
  name: "Drawer",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      tempOption: {} as any,
    });

    const currentOption = computed(() => {
      const defaultOption = {
        title: "提示",
        visible: false,
        fullscreen: false,
      };
      thatData.tempOption = Object.assign(defaultOption, props.option || {});
      return thatData.tempOption;
    });

    const hide = function () {
      this.setOption("visible", false);
    };

    const full = function () {
      setOption("fullscreen", !thatData.tempOption.fullscreen);
      currentOption["size"] = thatData.tempOption.fullscreen ? "100%" : "70%";
    };

    const setOption = function (name: any, val: any) {
      that.$set(this.tempOption, name, val);
    };

    const open = function () {
      setOption("visible", true);
    };

    const close = function () {
      setOption("visible", false);
    };

    const styleName = function () {
      return {
        height: dialogHeight,
        overflow: "hidden",
      };
    };

    const dialogHeight = function () {
      return "calc(100% - 100px)";
    };

    return {
      ...toRefs(thatData),
      currentOption,
      open,
      hide,
      full,
      setOption,
      close,
      styleName,
      dialogHeight
    };
  },
});
</script>
<style lang="scss">
.box-drawer {
  .el-scrollbar {
    // height: calc(100vh - 160px);
  }
  // .el-scrollbar__wrap {
  //   overflow-x: hidden;
  // }
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
    padding-right: 20px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }

  &__footer {
    padding: 10px;
    text-align: right;
    border-top: 1px solid #dcdfe6;
  }
  .el-dialog__footer {
    padding: 10px;
  }

  // .el-container {
  //   /*设置内部填充为0，几个布局元素之间没有间距*/
  //   padding: 0px;
  //   /*外部间距也是如此设置*/
  //   margin: 0px;
  //   /*统一设置高度为100%*/
  //   height: 100%;
  // }
  .box-dialog__menu i {
    color: #909399;
    font-size: 15px;
  }
  .el-drawer__header {
    margin-bottom: 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>
