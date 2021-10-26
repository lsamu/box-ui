<template>
  <div class="box-data-nav">
    <el-row>
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="3">
        <div class="logo">充值管理系统</div>
      </el-col>
      <div :class="menuview">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#409efe"
            text-color="#000"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">
              <a href="#" target="_blank">订单管理</a>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <div class="control">
          <el-button type="primary"> 注册 </el-button>
          <el-button plain> 登录 </el-button>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: ["option"],
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onLogin() {
      //登录
    },
    onReg() {
      //注册
    },
    onCenter() {
      //控制中心
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  background: none;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-input {
  margin: 10px 0px;
}

.box-nav {
  font-family: "Microsoft YaHei UI";
  background: #409efe;
  color: #fff;
  line-height: 60px;
  margin-bottom: 5px;
  a {
    color: #fff;
  }
  .blue {
  }
  .green {
  }
  .yellow {
  }
  .el-button {
    border: 1px solid #fff;
  }
  .logo {
    height: 100%;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 60px;
    line-height: 60px;
    border-bottom: 2px solid transparent;
    color: #fff;
  }
  .control{
     height: 100%;
    text-align: center;
  }
}
</style>