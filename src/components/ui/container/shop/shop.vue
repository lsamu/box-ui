<template>
  <el-container style="width: 100%; margin: 0" class="box-container-shop">
    <el-aside width="100px">
      <Nav :list="list" @onSelected="onSelected"></Nav>
    </el-aside>
    <el-container>
      <el-header style="border-bottom: 1px solid #bebebe">
        <Header :list="list"></Header>
      </el-header>
      <el-main style="background-color: #f5f7f9; margin: 0px; padding: 0px">
        <el-container class="container">
          <el-aside
            width="100px"
            class="not-print bg-white erbian"
            v-if="childrenList && childrenList.length > 0"
          >
            <div class="shop_nav">
              <el-menu :default-active="childAct">
                <template v-for="(item, index) in childrenList">
                  <child
                    :key="index"
                    v-if="item.children && item.children.length > 0"
                    :data="item"
                    @onSelected="onChildSelected"
                  ></child>
                  <el-menu-item
                    v-else
                    :index="'menu' + index"
                    :key="index"
                    @click="onChildSelected(index, item)"
                  >
                    <i :class="item.icon"></i>
                    {{ item.label }}
                  </el-menu-item>
                </template>
              </el-menu>
            </div>
          </el-aside>
          <el-main class="main">
            <router-view />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "@vue/composition-api";
import Header from "./header.vue";
import Nav from "./nav.vue";
import child from "./child.vue";

export default defineComponent({
  components: {
    Nav,
    Header,
    child,
  },
  props: ["option"],
  setup(props, context) {
    const root = getCurrentInstance();
    const router = root.proxy.$router;
    let menu = props.option;
    if (!menu) {
      menu = {
        left: {
          items: [
            {
              label: "登录",
              path: "login/index",
              layout: "#",
              menu: false,
            },
            {
              label: "首页",
            },
            {
              label: "例子",
              children: [
                {
                  label: "列表",
                },
                {
                  label: "详细",
                },
              ],
            },
          ],
        },
        right: {
          items: [
            {
              label: "用户",
              icon: "el-icon-s-home",
              children: [
                {
                  label: "修改密码",
                  popup: "admin/pwd",
                },
                {
                  label: "退出",
                  onClick: () => {
                    alert("退出");
                  },
                },
              ],
            },
          ],
        },
      };
    }

    let list = ref(menu.left.items);
    const childrenList = ref([]);
    let childAct = ref("menu" + 0);

    const onSelected = function (index, menu) {
      childrenList.value = list.value[index].children as any;
      localStorage.setItem("act", JSON.stringify(childrenList.value));
    };

    const onChildSelected = function (index, menu) {
      localStorage.setItem("childAct", index);
      childAct.value = "menu" + index;
      if (menu.path) {
        router.push({
          path: "/" + menu.path,
        });
      }
    };

    onMounted(() => {
      childrenList.value = JSON.parse(localStorage.getItem("act"));
      childAct.value = "menu" + (localStorage.getItem("childAct") || "0");
    });

    return {
      childAct,
      list,
      childrenList,
      onSelected,
      onChildSelected,
    };
  },
});
</script>
<style lang="scss">
.box-container-shop {
  .el-menu {
    border-right: none;
  }
  .el-menu-item {
    font-size: 12px;
  }
  .erbian {
    width: 160px;
    overflow: hidden !important;
  }
  .el-aside {
    background-color: rgb(84, 92, 100);
    min-height: calc(100vh);
  }
  .qaside {
    display: none;
  }
  .bg-white {
    background-color: #fff;
  }

  .container {
    width: 100%;
    margin: 0;
  }
  .H10 {
    height: 10px;
  }
  .top-title {
    line-height: 75px;
    height: 75px;
  }
  .zhang {
    background-color: #fff;
    font-size: 14px;
    padding: 30px 25px 10px;
    margin: 10px 0 0;
    min-height: 500px;
  }
  .t_l {
    text-align: left;
  }
}
</style>
