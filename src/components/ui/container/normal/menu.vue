<template>
  <el-submenu :index="data.route">
    <template slot="title">
      <i :class="item.icon"></i>
      {{ data.name }}
    </template>
    <template v-for="item in data.children">
      <child-menu v-if="item.children" :data="item" :key="item.name" />
      <el-menu-item v-else :index="item.route" :key="item.name">
        <i :class="item.icon"></i>
        {{ item.name }}
      </el-menu-item>
    </template>
  </el-submenu>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: ["data"],
  setup(props, context) {
    return {
      data: props.data || {},
    };
  },
});
</script>
