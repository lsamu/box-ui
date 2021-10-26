<template>
  <div class="box-toolstrip">
    <el-tooltip
      content="字体变小"
      placement="right"
      v-for="(item, index) of 10"
      :key="index"
    >
      <div class="cell">
        <i class="el-icon-delete"></i>
        <!--        <h5 class="text">删除</h5>-->
      </div>
    </el-tooltip>
    <!--    <el-tooltip content="复制" placement="right">-->
    <!--      <div class="cell">-->
    <!--        <i class="el-icon-edit"></i>-->
    <!--      </div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="删除" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-share"></i></div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="字体增大" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-delete"></i></div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="字体增大" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-delete"></i></div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="字体加粗" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-delete"></i></div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="图层上移" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-delete"></i></div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="图层下移" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-delete"></i></div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="图层置顶" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-delete"></i></div>-->
    <!--    </el-tooltip>-->
    <!--    <el-tooltip content="图层置底" placement="right">-->
    <!--      <div class="cell"><i class="el-icon-delete"></i></div>-->
    <!--    </el-tooltip>-->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Toolstrip",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      const defaultOption = {};
      let oo = Object.assign(defaultOption, props.value || {});
      return oo;
    });
  },
});
</script>
<style lang="scss">
.box-toolstrip {
  display: block;
  width: 45px;
  opacity: 1;
  background: #fff;
  color: #333;
  text-align: center;
  padding: 0 5px;

  &__menu-item {
    padding: 10px;
    cursor: pointer;
  }
  .div + .div {
    margin-left: 0px;
  }
  .cell {
    padding: 10px 4px;
  }
  i {
    font-size: 18px;
    color: #666;
  }

  &.horizontal {
    display: flex;
    width: max-content;
    .cell {
      padding: 15px;
      .text {
        margin: 0;
        padding-top: 5px;
        font-size: 12px;
        color: #666;
      }
      &:hover {
        background: #f1f1f1;
        cursor: pointer;
      }
    }
  }
}
</style>
