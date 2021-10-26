<template>
  <div class="data-box">
    <el-row :span="24">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item,index) in data"
              :key="index">
        <div class="item">
          <a :href="item.href?item.href:'javascript:void(0);'"
             @click="item.click?item.click(item):''"
             :target="item.target">
            <div class="item-icon"
                 :style="{backgroundColor:item.color}">
              <i :class="item.icon"></i>
            </div>
            <div class="item-info">
              <box-count-up :animation="animation"
                             :decimals="decimals"
                             :style="{color:item.color}"
                             class="title"
                             :end="item.count"></box-count-up>
              <div class="info">{{item.title}}</div>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Box",
  data () {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    animation () {
      return this.defaultOption.animation
    },
    decimals () {
      return this.defaultOption.decimals || 0
    },
    span () {
      return this.defaultOption.span || 8;
    },
    data () {
      return this.defaultOption.data || [];
    },
    defaultOption(){
      const defaultOption = {
        span: 6,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "错误日志",
            count: 12332,
            icon: "el-icon-warning",
            color: "rgb(49, 180, 141)",
            href: "https://baidu.com",
            target: "_blank",
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "数据展示",
            count: 33,
            icon: "el-icon-view",
            color: "rgb(56, 161, 242)",
            href: "https://baidu.com",
            target: "_blank",
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "权限管理",
            count: 2223,
            icon: "el-icon-setting",
            color: "rgb(117, 56, 199)",
            href: "https://baidu.com",
            target: "_blank",
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: "权限管理",
            count: 2223,
            icon: "el-icon-setting",
            color: "rgb(117, 56, 199)",
            href: "https://baidu.com",
            target: "_blank",
          },
        ],
      }
      return Object.assign(defaultOption,this.option||{});
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
};
</script>
<style lang="scss">
  .data-box {
    $height: 100px;
    $radius: 5px;
    .item {
        position: relative;
        margin: 0 auto 10px auto;
        width: 96%;
        height: $height;
        overflow: hidden;
        border-radius: $radius;
        box-sizing: border-box;
        &:hover .item-text {
            top: 0;
        }
        a {
            display: flex;
        }
    }
    .item-icon {
        width: 100px;
        height: $height;
        color: #fff;
        text-align: center;
        line-height: $height;
        align-items: center;
        justify-content: center;
        display: flex;
        i {
            font-size: 48px !important;
        }
    }
    .item-info {
        border-radius: 0 $radius $radius 0;
        border: 1px solid #eee;
        border-left: none;
        background-color: #fff;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .title {
            font-size: 30px;
            line-height: 40px;
            text-align: center;
        }
        .info {
            color: #999;
            font-size: 14px;
            text-align: center;
        }
    }
}
</style>