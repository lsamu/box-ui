<template>
  <div class="data-icons">
    <el-row :span="24">
      <template v-for="(item, index) in currentData">
        <el-col :xs="12" :sm="6" :md="currentOption.span" :key="index">
          <div class="item">
            <a
              :href="item.href ? item.href : 'javascript:void(0);'"
              @click="item.click ? item.click(item) : ''"
              :target="item.target"
            >
              <div class="item-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="item-info">
                <span>{{ item.title }}</span>
                <box-count-up class="count" :end="item.count"></box-count-up>
              </div>
            </a>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Icons",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      let oo = {
        span: 4,
      };
      return oo;
    });

    const currentData = computed(() => {
      let oo = [
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "今日注册",
          count: 12678,
          icon: "el-icon-tickets",
          href: "#",
          target: "_blank",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "今日登录",
          count: 22139,
          icon: "el-icon-success",
          href: "#",
          target: "_blank",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "今日订阅",
          count: 35623,
          icon: "el-icon-info",
          href: "#",
          target: "_blank",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "今日评论",
          count: 16826,
          icon: "el-icon-message",
          href: "#",
          target: "_blank",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "今日评论",
          count: 16826,
          icon: "el-icon-message",
          href: "#",
          target: "_blank",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "今日评论",
          count: 16826,
          icon: "el-icon-message",
          href: "#",
          target: "_blank",
        },
      ];
      return oo;
    });

    return {
      currentOption,
      currentData,
    };
  },
});
</script>
