<template>
  <el-popover
    placement="buttom"
    trigger="manual"
    v-model="thatData.visible"
    ref="popover1"
    class="box-context-menu"
    width="120"
    :style="thatData.style"
  >
    <div
      class="context-menu"
      v-for="(item, index) in thatData.currentItems"
      :key="index"
      @click="handleClick($event, item)"
    >
      {{ item.text }}
    </div>
  </el-popover>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  watch,
} from "@vue/composition-api";
import merge from "deepmerge";

interface ContextMenuItem {
  icon?: string;
  text?: string;
  onClick?: Function;
}

export default defineComponent({
  name: "ContextMenu",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const currentOption = computed(() => {
      const defaultOption = {
        items: [],
      };
      let oo: { items: ContextMenuItem[] } = merge(
        defaultOption,
        props.option || {}
      );
      return oo;
    });

    const currentItems = computed(() => {
      return currentOption.value.items;
    });

    const thatData = reactive({
      visible: false,
      style: {
        display: "none",
        position: "absolute",
        left: "0px",
        top: "0px",
      },
      currentOption,
      currentItems,
      currentItem: null,
      event: null,
    });

    const refMenu = function () {
      return that.$refs["popover1"] as any;
    };

    const eleMenu = function () {
      return refMenu().$el as any;
    };

    const open = function (event, item) {
      thatData.event = event;
      if (!event || event.target == null) {
        console.log("content-menu first menu not event");
        return;
      }
      //没有菜单项
      if (thatData.currentItems == null || thatData.currentItems.length == 0) {
        console.log("context-menu not items");
        return;
      }
      // 阻止右键默认行为
      event.preventDefault();
      thatData.currentItem = item;

      let menu: any = eleMenu();
      let menuHeight = menu.offsetHeight;
      let menuWidth = menu.offsetWidth;

      if (menuHeight < 1 || menuWidth < 1) {
        thatData.style.display = "block";
        menuHeight = menu.offsetHeight;
        menuWidth = menu.offsetWidth;
      }

      if (menuWidth + event.pageX >= window.innerWidth) {
        thatData.style.left = event.pageX - menuWidth + "px";
      } else {
        thatData.style.left = event.pageX + "px";
      }

      if (menuHeight + event.pageY >= window.innerHeight) {
        thatData.style.top = event.pageY - menuHeight + "px";
      } else {
        thatData.style.top = event.pageY + "px";
      }
      thatData.visible = true;
    };

    const close = function () {
      thatData.visible = false;
    };

    const handleClick = function (event, item: ContextMenuItem) {
      thatData.visible = false;
      if (item.onClick != null) {
        item.onClick(event, thatData.currentItem);
      }
    };

    watch(
      () => thatData.visible,
      (value, o) => {
        if (thatData.event.button == 2) {
          if (value) {
            document.body.addEventListener("click", close);
          } else {
            document.body.removeEventListener("click", close);
          }
        }
      }
    );

    return {
      thatData,
      open,
      close,
      handleClick,
    };
  },
});
</script>
<style lang="scss">
.box-context-menu {
  .popover-intree {
    position: absolute;
    ul {
      padding: 3px;
    }
    li {
      list-style: none;
    }
  }
  .context-menu {
    letter-spacing: 1px;
    color: #222;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    color: #000;
    text-align: center;
    &:hover {
      border-radius: 2px;
      background: #409eff;
      color: #fff;
    }
  }
  .el-popover {
    padding: 2px;
    min-width: 20px;
    border: 1px solid #ebeef5;
    border-radius: 0;
    box-shadow: 4px 4px 4px -4px rgb(121, 118, 118);
  }
}
</style>
