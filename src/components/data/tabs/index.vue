<template>
  <div class="box-data-tabs">
    <el-row :span="24">
      <el-col
        :md="currentOption.span"
        :xs="24"
        :sm="12"
        v-for="(item, index) in currentData"
        :key="index"
      >
        <div class="item" :style="{ background: item.color }">
          <a
            :href="item.href ? item.href : 'javascript:void(0);'"
            @click="item.click ? item.click(item) : ''"
            :target="item.target"
          >
            <div class="item-header">
              <p>{{ item.title }}</p>
              <span>{{ item.subtitle }}</span>
            </div>
            <div class="item-body">
              <box-count-up class="h2" :end="item.count"></box-count-up>
            </div>
            <div class="item-footer">
              <span>{{ item.allcount }}</span>
              <p>{{ item.text }}</p>
            </div>
            <p class="item-tip">{{ item.key }}</p>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Tabs",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      let oo = {};
      return oo;
    });

    const currentData = computed(() => {
      let oo = [
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "分类统计",
          subtitle: "实时",
          count: 7993,
          allcount: 10222,
          text: "当前分类总记录数",
          color: "rgb(27, 201, 142)",
          key: "类",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "附件统计",
          subtitle: "实时",
          count: 3112,
          allcount: 10222,
          text: "当前上传的附件数",
          color: "rgb(230, 71, 88)",
          key: "附",
        },
        {
          click: function (item) {
            alert(JSON.stringify(item));
          },
          title: "文章统计",
          subtitle: "实时",
          count: 908,
          allcount: 10222,
          text: "评论次数",
          color: "rgb(178, 159, 255)",
          key: "评",
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
