<template>
  <el-menu
    :default-active="defaultPage"
    :unique-opened="true"
    :collapse="isCollapse"
    class="el-menu-sidebar"
    background-color="#1f2d3d"
    text-color="#fff"
    active-text-color="#1890ff"
    router
  >
    <el-menu-item class="menu-sidebar-head">
      <span slot="title">XXX后台管理系统</span>
    </el-menu-item>
    <template v-for="(menu, index) in sideMenu">
      <el-submenu
        v-if="menu.children && menu.children.length !== 0"
        :index="menu.path"
        :key="index"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.label }}</span>
        </template>
        <el-menu-item
          v-for="(childMenu, index2) in menu.children"
          :key="index2"
          :index="childMenu.path"
        >
          <i :class="childMenu.icon"></i>
          <span slot="title">{{ childMenu.label }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else
        :index="menu.path"
        :key="menu.path"
        @click="activePage(menu)"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "@vue/composition-api";
import Enumerable from "linq";

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    routerPath: {
      type: String,
      default: "/home",
    },
  },
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      defaultPage: "",
      sideMenu: [],
      allOpenPage: [
        // {
        //   icon: "el-icon-document",
        //   label: "首页",
        //   path: "/board/index",
        // },
      ],
    });

    /**
     * 路由跳转, 保存已打开页面到vuex中
     */
    const activePage = function (menu) {
      if (menu.label === "首页") {
        return;
      }
      const index = thatData.allOpenPage.findIndex(
        (item) => item.label === menu.label
      );
      if (-1 === index) {
        thatData.allOpenPage.push(menu);
      }
    };

    const getAllMenu = function () {
      thatData.sideMenu = [];
      let router = that["$menu"].left as {
        href?: string;
        label?: string;
        children?: [];
        meta: any;
      }[];

      Enumerable.from(router)
        .where((p) => {
          return p.href && p.href.indexOf(":") == -1;
        })
        .forEach((p: any) => {
          let aa = {
            icon: p.meta
              ? p.meta.icon
                ? p.meta.icon
                : "el-icon-menu"
              : "el-icon-menu",
            label: p.label,
            path: p.href ? "/" + p.href : "/",
          };
          aa["children"] = [];
          if (p.children != null && p.children.length > 0) {
            Enumerable.from(p.children)
              .where((p1) => {
                return (p1 as any).href.indexOf(":") == -1;
              })
              .forEach((p1: any) => {
                const bb = {
                  icon: p1.meta
                    ? p1.meta.icon
                      ? p1.meta.icon
                      : "el-icon-menu"
                    : "el-icon-menu",
                  label: p1.label,
                  path: p1.href ? "/" + p1.href : "/",
                };
                aa["children"].push(bb);
              });
          }
          thatData.sideMenu.push(aa);
        });
    };

    onMounted(() => {
      getAllMenu();
    });

    watch(
      () => props.routerPath,
      (n, o) => {
        thatData.defaultPage = n;
      },
      { deep: true }
    );

    watch(
      () => that.$route,
      (n, o) => {
        thatData.defaultPage = window.location.hash.replace("#", "");
      }
    );

    onMounted(() => {
      thatData.defaultPage = window.location.hash.replace("#", "");
    });

    return {
      ...toRefs(thatData),
      activePage,
    };
  },
});
</script>

<style lang="scss">
.el-menu-sidebar {
  height: 100%;
  .menu-sidebar-head {
    height: 60px;
    line-height: 60px;
    margin-bottom: 2px;
    &:hover {
      background: transparent;
    }
  }
}
</style>
