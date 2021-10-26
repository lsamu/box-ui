<template>
  <div class="box-container-header-shop">
    <div class="name">{{ admin_name }}</div>
    <div class="head-img">
      <el-dropdown trigger="click" @command="head">
        <span class="el-dropdown-link head-img-click">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">修改密码</el-dropdown-item>
          <el-dropdown-item command="lout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";

export default defineComponent({
  props: ["option"],
  setup(props, context) {
    let data = reactive({
      admin_name: "",
    });
    const head = function (val, b, c) {};
    return {
      ...data,
      head,
    };
  },
});
</script>

<style lang="less">
.box-container-header-shop {
  display: flex;
  justify-content: flex-end;
  line-height: 60px;
  .name {
    padding-right: 20px;
  }

  .head-img img {
    height: 40px;
    width: 40px;
    padding-top: 10px;
  }

  .head-x {
    padding-right: 35px;
    line-height: 60px;
  }

  .head-img-click {
    cursor: pointer;
  }

  .item {
    text-align: center;
    margin-right: 40px;
    height: 28px;
    line-height: 28px;
    margin-top: 15px;
  }

  .name_dai {
    width: 30%;
    text-align: right;
  }

  .num {
    width: 20%;
    margin-left: 40%;
  }

  .wai {
    height: 40px;
  }
}
</style>
