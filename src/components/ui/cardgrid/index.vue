<template>
  <div class="box-cardgrid">
    <el-row :gutter="10">
      <el-col
        v-for="(item, index) in currentColumns"
        :key="index"
        :xs="24"
        :sm="8"
        :md="8"
        :lg="8"
        :xl="4"
      >
        <el-card :body-style="{ padding: '0px' }">
          <slot name="content">
            <img :src="item.img" class="image" />
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
            </div>
          </slot>
        </el-card>
      </el-col>
    </el-row>
    <div class="box-cardgrid__pager" v-if="currentOption.hasPage">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage.pageIndex"
        :page-sizes="currentPage.pageSizes"
        :page-size="currentPage.pageSize"
        :layout="currentPage.layout"
        :total="currentPage.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Cardgrid",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const currentOption = computed(() => {
      const defaultOption = {
        hasPage: true,
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentColumns = computed(() => {
      const defaultColumns = [
        {
          id: 1,
          img: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "我是标题内容111",
          time: new Date(),
        },
        {
          id: 2,
          img: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "我是标题内容222",
          time: new Date(),
        },
        {
          id: 2,
          img: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          title: "我是标题内容222",
          time: new Date(),
        },
      ];
      let oo = Object.assign(defaultColumns, currentOption.value.columns || []);
      return oo;
    });

    const currentPage = computed(() => {
      const defaultPage = {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        pageSizes: [1, 10, 20, 50, 100, 500],
        layout: "total, sizes, prev, pager, next, jumper",
      };
      let oo = Object.assign(defaultPage, currentOption.value.page || {});
      if (false == oo) {
        currentOption.value.hasPage = false;
      }
      return oo;
    });

    //更改页面大小
    const handleSizeChange = function (val: any) {
      currentPage.value.pageSize = val;
      currentPage.value.pageIndex = 1;
    };

    //当前页
    const handleCurrentChange = function (val: any) {
      currentPage.value.pageIndex = val;
    };

    return {
      currentOption,
      currentColumns,
      currentPage,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="scss">
.box-cardgrid {
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
  &__pager {
    padding: 20px 0;
  }
}
</style>
