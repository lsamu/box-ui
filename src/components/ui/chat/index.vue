<template>
  <div class="box-chat">
    <div class="header"></div>
    <div class="content">
      <div class="content-main">
        <div
          class="content-main-item"
          v-for="(item, index) in []"
          :key="index"
        ></div>
      </div>
    </div>
    <div class="footer">
      <div class="tools">
        <i class="el-icon-picture-outline"></i>
        <i class="el-icon-picture-outline"></i>
        <i class="el-icon-picture-outline"></i>
      </div>
      <div class="msg">
        <textarea
          class="msg-input"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div class="msg-submit">
          <el-dropdown split-button type="primary" @click="handleClick">
            发送
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  name: "Chat",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption = computed(() => {
      let oo = {};

      return oo;
    });

    const handleClick = function () {};

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", thatData.formData);
      },
      { deep: true }
    );

    watch(
      () => props.value,
      (n, o) => {
        thatData.formData = props.value || {};
      }
    );
    return {
      ...thatData,
      currentOption,
      handleClick,
    };
  },
});
</script>
<style lang="scss">
.box-chat {
  .header {
    background-color: #409eff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 15px 12px;
    margin: 0 auto;
    vertical-align: middle;
  }
  .content {
    .content-main {
      height: calc(100% - 200px);
      padding: 15px 15px 20px;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      .content-main-item {
        position: relative;
        font-size: 0;
        margin-bottom: 10px;
        padding-left: 60px;
        min-height: 68px;
      }
    }
  }
  .footer {
    -webkit-box-shadow: 0 -1px 0 0 rgb(0 0 0 / 4%), 0 -2px 0 0 rgb(0 0 0 / 1%);
    box-shadow: 0 -1px 0 0 rgb(0 0 0 / 4%), 0 -2px 0 0 rgb(0 0 0 / 1%);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .tools {
      padding: 8px 10px 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      i {
        margin-right: 12px;
        font-size: 20px;
        color: #888a91;
      }
    }
    .msg {
      padding: 10px;
      height: auto;
      overflow: hidden;
      .msg-input {
        display: block;
        width: 100%;
        height: 60px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        resize: none;
        outline: 0;
        background-color: #fff;
        border: 0;
        word-break: break-all;
        font-size: 13px;
        line-height: 17px;
        -webkit-appearance: none;
      }
      .msg-submit {
        float: right;
        display: block;
        outline: 0;
        cursor: pointer;
        text-align: center;
      }
    }
  }
}
</style>
