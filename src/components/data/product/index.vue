<template>
  <div class="box-data-product">
    <el-row :span="24">
      <el-col
        :md="currentOption.span"
        :xs="24"
        :sm="12"
        v-for="(item, index) in currentData"
        :key="index"
      >
        <div class="item">
          <a :href="item.href">
            <div class="item-header">
              <img :src="item.src" alt="" />
            </div>
            <div class="item-content">
              <span>{{ item.title }}</span>
              <p>{{ item.content }}</p>
            </div>
            <div class="item-footer">
              <div class="time">
                <span>{{ item.time }}</span>
              </div>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Product",
  props: ["option", "data"],
  computed: {
    currentOption() {
      const defaultOption = {
        span: 6,
      };
      let list = Object.assign(defaultOption, this.option || {});
      return list;
    },
    currentData() {
      let list = Object.assign([], this.data || []);
      return list;
    },
  },
};
</script>
<style lang="scss">
.box-data-product {
  $height: 340px;
  .item {
    position: relative;
    height: $height;
    margin: 10px 5px;
    margin-bottom: 50px;
    border-radius: 5px;
    border:1px solid #ccc;
    &-header {
      img {
        width: 100%;
        height: $height * 0.5;
        border-radius: 5px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &-content {
      padding: 10px 15px;
      color: #333 !important;
      span {
        font-size: 20px;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
      p {
        font-size: 14px;
        height: 60px;
        margin: 6px 0;
        overflow: hidden;
      }
    }
    &-footer {
      padding: 10px 15px;
      position: relative;
      img {
        height: 20px;
        width: 20px;
        border-radius: 50%;
      }
      div {
        display: inline-block;
        ul,
        li {
          padding: 0;
          margin: 0;
          list-style: none;
          display: inline-block;
          border: 2px solid white;
          border-radius: 50%;
          margin-left: -8px;
        }
      }
      div:nth-child(1) {
        font-size: 14px;
        color: #ccc !important;
      }
      div:nth-child(2) {
        position: absolute;
        right: 15px;
      }
    }
  }
}
</style>