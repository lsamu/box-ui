<template>
  <div class="navbar">
    <i
      class="show-collapse"
      :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleCollapse"
    ></i>
    <breadcrumd class="breadcrumd-container" />
    <el-dropdown class="show-submenu" trigger="click" @command="handleRouter">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-link
            href="#"
            target="_blank"
            :underline="false"
            >项目地址</el-link
          >
        </el-dropdown-item>
        <template v-for="itemMenu in topMenu">
          <el-dropdown-item
            :key="itemMenu.path"
            :command="itemMenu.path"
            :divided="itemMenu.path === '/login' ? true : false"
          >
            {{ itemMenu.label }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
} from "@vue/composition-api";
import Breadcrumd from "./breadcrumb.vue";

export default defineComponent({
  components: {
    Breadcrumd,
  },
  setup(props,context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      isCollapse: false,
      topMenu: [
        {
          label: "退出",
          path: "/login",
        },
      ],
    });

    /**
     * 处理侧边栏显隐
     */
    const handleCollapse = function () {
      thatData.isCollapse = !thatData.isCollapse;
      context.emit("checkCollapse",thatData.isCollapse)
    };
    /**
     * 处理下拉菜单路由跳转
     */
    const handleRouter = function (path) {
      that.$router.push({ path });
    };

    return {
      ...toRefs(thatData),
      handleCollapse,
      handleRouter,
    };
  },
});
</script>

<style lang="scss">
.navbar {
  position: relative;
  background: #fff;
  width: 100%;
  box-shadow: 1px 1px #f2f2f2;
  .show-collapse {
    padding: 15px;
    font-size: 20px;
    cursor: pointer;
  }
  .show-submenu {
    position: absolute;
    right: 32px;
    top: 20px;
    bottom: 0;
    cursor: pointer;
  }
  .el-dropdown-menu__item--divided {
    margin-top: 0;
  }
}
</style>
