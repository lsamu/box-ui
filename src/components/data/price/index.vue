<template>
  <div class="data-price">
    <el-row :span="24">
      <template v-for="(item, index) in currentData">
        <el-col :xs="12" :sm="6" :md="currentOption.span" :key="index">
          <div class="item item--active">
            <a
              :href="item.href ? item.href : 'javascript:void(0);'"
              @click="item.click ? item.click(item) : ''"
              :target="item.target"
            >
              <div class="title">
                {{ item.title }}
              </div>
              <div class="body">
                <span class="price">{{ item.price }}</span>
                <span class="append">{{ item.append }}</span>
              </div>
              <div class="list">
                <p v-for="(citem, cindex) in item.list" :key="cindex">
                  {{ citem }}
                </p>
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
  name: "Price",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      let oo = {
        span: 6,
      };
      return oo;
    });

    const currentData = computed(() => {
      let oo = [
        {
          title: "日套餐",
          price: 20,
          append: "1 / 天",
          click: function () {
            alert("弹窗");
          },
          list: [
            "1天的使用时间",
            "支持pc客户端",
            "支持vue的全部体系",
            "一个神奇的框架",
          ],
        },
        {
          title: "周套餐",
          price: 30,
          append: "7 / 天",
          click: function () {
            alert("弹窗");
          },
          list: [
            "1天的使用时间",
            "支持pc客户端",
            "支持vue的全部体系",
            "一个神奇的框架",
          ],
        },
        {
          title: "月套餐",
          price: 40,
          append: "30 / 天",
          click: function () {
            alert("弹窗");
          },
          list: [
            "1天的使用时间",
            "支持pc客户端",
            "支持vue的全部体系",
            "一个神奇的框架",
          ],
        },
        {
          title: "年套餐",
          price: 50,
          append: "360 / 天",
          click: function () {
            alert("弹窗");
          },
          list: [
            "1天的使用时间",
            "支持pc客户端",
            "支持vue的全部体系",
            "一个神奇的框架",
          ],
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
