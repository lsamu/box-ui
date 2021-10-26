<template>
  <div class="main-view">
    <div class="side-bar" :style="{ width: isCollapse ? '64px' : '200px' }">
      <sidebar :isCollapse="isCollapse" :routerPath="routerPath" />
    </div>
    <div
      class="container"
      :style="{
        width: isCollapse ? 'calc(100% - 64px)' : 'calc(100% - 200px)',
      }"
    >
      <div class="container-header">
        <navbar @checkCollapse="checkCollapse" />
        <tags @switchPage="switchPage" />
      </div>
      <div class="container-router">
        <transition name="slide-fade">
          <div class="container-content">
            <router-view />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import sidebar from "./sidebar.vue";
import navbar from "./navbar.vue";
import tags from "./tags.vue";

export default defineComponent({
  components: {
    sidebar,
    navbar,
    tags,
  },
  setup(props, context) {
    const thatData = reactive({
      isCollapse: false,
      routerPath: "",
    });

    const checkCollapse = function (res) {
      thatData.isCollapse = res;
    };

    const switchPage = function (path) {
      thatData.routerPath = path;
    };

    return {
      ...toRefs(thatData),
      checkCollapse,
      switchPage,
    };
  },
});
</script>
<style lang="scss">
.main-view {
  height: 100vh;
  display: flex;
  background: #eff5fd;
  box-sizing: border-box;
  .side-bar {
    height: 100%;
    transition: width 0.2s linear;
  }
  .container {
    transition: width 0.2s linear;
    .container-header {
      height: 80px;
    }
    .container-router {
      padding: 16px;
      height: calc(100% - 112px);
      overflow-x: hidden;
      .container-content {
        background-color: white;
        padding:5px;
        .el-aside {
          padding: 0;
        }
        .el-main {
          padding: 0;
        }
      }
    }
  }
}
</style>
