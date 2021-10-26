<template>
  <el-breadcrumb class="nav-breadcrumd" separator="/">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <transition name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="`${index}${item.path}`"
      >
        <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition>
  </el-breadcrumb>
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

export default defineComponent({
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({
      levelList: [],
    });

    onMounted(() => {
      getBreadcrumb();
    });

    const getBreadcrumb = function () {
      const matched = that.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      thatData.levelList = matched.filter(
        (item) => item.meta && item.meta.title !== "首页"
      );
    };

    const handleLink = function (item) {};

    watch(
      () => that.$route,
      (n, o) => {
        getBreadcrumb();
      }
    );

    return {
      ...toRefs(thatData),
      getBreadcrumb,
      handleLink,
    };
  },
});
</script>

<style lang="scss">
.nav-breadcrumd {
  display: inline-block;
  margin-left: 8px;
}
</style>
