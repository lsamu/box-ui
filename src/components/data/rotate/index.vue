<template>
  <div class="box-data-rotate">
    <el-row :span="24">
      <el-col
        :md="currentOption.span"
        :xs="24"
        :sm="12"
        v-for="(item, index) in currentData"
        :key="index"
      >
        <div class="item" :style="{ backgroundColor: item.color }">
          <div class="item-box">
            <box-count-up class="item-count" :end="item.count"></box-count-up>
            <span class="item-title">{{ item.title }}</span>
            <i class="item-icon" :class="item.icon"></i>
          </div>
          <a
            :href="item.href ? item.href : 'javascript:void(0);'"
            @click="item.click ? item.click(item) : ''"
          >
            <p class="item-more">更多<i class="el-icon-arrow-right"></i></p>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Rotate",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      let oo = {
        span: 8,
      };
      return oo;
    });

    const currentData = computed(() => {
      let oo = [
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          count: "150",
          title: "新订单",
          icon: "el-icon-warning",
          color: "rgb(49, 180, 141)",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          count: "53%",
          title: "跳出率",
          icon: "el-icon-view",
          color: "#00a65a",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          count: "44",
          title: "用户注册数",
          icon: "el-icon-setting",
          color: "#f39c12",
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
