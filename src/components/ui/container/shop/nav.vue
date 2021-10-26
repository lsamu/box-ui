<template>
  <div class="root">
    <el-menu
      :default-active="Act"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleselect"
    >
      <el-menu-item index="111" disabled>
        <span slot="title"></span>
      </el-menu-item>
      <el-menu-item
        :index="'menu' + index"
        @click="handleMenu(index, menu)"
        v-for="(menu, index) in list"
        :key="index"
        v-if="menu.menu != false"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
} from "@vue/composition-api";

export default defineComponent({
  props: ["list"],
  setup(props, context) {
    const root = getCurrentInstance();
    const router = root.proxy.$router;

    let Act = ref("");

    const handleselect = function (key, keyPath) {
      Act.value = key;
      localStorage.setItem("Act", key);
      localStorage.setItem("act", "1");
    };
    const handleOpen = function (key, keyPath) {};
    const handleClose = function (key, keyPath) {};
    const handleMenu = function (index, menu) {
      context.emit("onSelected", index, menu);
      if (menu.path) {
        router.push({
          path: "/" + menu.path,
        });
      }
    };

    onMounted(() => {
      Act.value = localStorage.getItem("Act");
    });

    return {
      Act,
      handleOpen,
      handleClose,
      handleselect,
      handleMenu,
    };
  },
});
</script>
<style></style>
