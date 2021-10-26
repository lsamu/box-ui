<template>
  <div class="tag-router">
    <el-tag
      size="small"
      effect="plain"
      v-for="item in tags"
      :key="item.path"
      :type="item.type"
      :class="item.path === path ? 'active-tag' : ''"
      :closable="item.label === '首页' ? false : true"
      @click="switchPage(item.path)"
      @close="handleClose(item)"
    >
      {{ item.label }}
    </el-tag>
  </div>
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
      path: "/home",
      tags: [
        // {
        //   icon: "el-icon-tickets",
        //   label: "首页",
        //   path: "/home",
        // },
      ],
    });

    /**
     * 切换标签
     */
    const switchPage = function (path) {
      thatData.path = path;
      that.$router.push({ path });
    };
    /**
     * 关闭标签时跳转到前一个页面
     */
    const handleClose = function (tag) {
      let index = thatData.tags.indexOf(tag);
      let preTag = thatData.tags[index - 1];
      thatData.tags.splice(index, 1);
      thatData.path = preTag.path;
      // 如果关闭标签的前一个标签是当前页面则不做跳转
      if (this.path === window.location.hash.replace("#", "")) {
        return;
      }
      that.$router.push(thatData.path);
    };

    watch(
      () => that.$route,
      (n, o) => {
        thatData.path = window.location.hash.replace("#", "");
      }
    );

    onMounted(() => {
      thatData.path = window.location.hash.replace("#", "");
    });

    return {
      ...toRefs(thatData),
      switchPage,
      handleClose,
    };
  },
});
</script>

<style lang="scss">
.tag-router {
  height: 30px;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding-left: 11px;
  padding-right: 16px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  .el-tag--plain {
    color: #495060;
    border: 1px solid #d8dce5;
    margin-top: 3px;
    margin-left: 5px;
  }
  .active-tag {
    background-color: #409eff;
    color: #fff;
    border-color: #409eff;
  }
  .el-tag--plain .el-tag__close {
    color: #fff;
    &:hover {
      background-color: #363636;
    }
  }
}
</style>
