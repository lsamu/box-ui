<template>
  <div class="box-data-pay">
    <el-row :span="24">
      <el-col
        :md="currentOption.span"
        :xs="24"
        :sm="12"
        v-for="(item, index) in currentData"
        :key="index"
      >
        <div class="item">
          <div class="top" :style="{ backgroundColor: item.color }"></div>
          <div class="header">
            <p class="title">{{ item.title }}</p>
            <img :src="item.src" alt class="img" />
            <template v-if="item.subtitle">
              <p class="subtitle" :style="{ color: item.color }">
                {{ item.subtitle }}
              </p>
            </template>
            <template v-if="item.money || item.dismoney">
              <p class="money" :style="{ color: item.color }">
                <span>¥</span>
                <box-count-up class="b" :end="item.dismoney"></box-count-up>
                <s>{{ item.money }}</s>
                <em>{{ item.tip }}</em>
              </p>
            </template>
            <div class="line"></div>
            <a
              class="btn"
              :href="item.href ? item.href : 'javascript:void(0);'"
              @click="item.click ? item.click(item) : ''"
              :style="{ backgroundColor: item.color }"
              >{{ item.subtext }}</a
            >
          </div>
          <div class="list">
            <div
              class="list-item"
              v-for="(citem, cindex) in item.list"
              :key="cindex"
            >
              <i
                class="list-item-icon list-item--check"
                :style="{ color: item.color }"
                v-if="citem.check"
                >√</i
              >
              <i class="list-item-icon list-item--no" v-else>x</i>
              <a :href="citem.href ? citem.href : 'javascript:void(0);'">
                <el-tooltip
                  effect="dark"
                  :disabled="!citem.tip"
                  placement="top"
                >
                  <div slot="content" v-html="citem.tip"></div>
                  <span :class="{ 'list-item--link': citem.href }">{{
                    citem.title
                  }}</span>
                </el-tooltip>
              </a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Pay",
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
          title: "后台模版",
          src: "images/vip1.png",
          money: "999999",
          dismoney: "999999",
          tip: "/永久",
          color: "#808695",
          subtext: "购买",
          click: function (item) {
            alert(JSON.stringify(item));
          },
          list: [
            {
              title: "面向全屏幕尺寸的响应式适配能力",
              check: true,
              tip: `<h2 > 后台管理模版 - <small>点击红色字体即可预览</small></h2> <br />
                1.用户名登录/验证码登录/第三方登陆(QQ, 微信)/人脸识别/多种登录方式。 <br /> <br />
                2.全新的前端错误日志监控机制 <br /> <br />
                3.灵活的10 + 多款主题自由配置<br /><br />
                4.路由权限、菜单权限、登录权限 <br /> <br />
                5.前端路由动态服务端加载和无限极动态路由加载。 <br /> <br />
                6.模块的可拆卸化, 达到开箱即用 <br /> <br />`,
            },
            {
              title: "支持IE9+等系列浏览器",
              check: true,
            },
            {
              title: "全新的前端错误日志监控机制",
              check: true,
            },
            {
              title: "基于最新的底层开发",
              check: true,
            },
            {
              title: "前端路由动态服务端加载",
              check: true,
            },
            {
              title: "灵活的多款主题自由配置",
              check: true,
            },
            {
              title: "模块的可拆卸化,达到开箱即用",
              check: true,
            },
            {
              title: "免费的私人git私服",
              check: true,
            },
            {
              title: "专属会员群",
              check: true,
            },
            {
              title: "前端最新干货分享",
              check: true,
            },
          ],
        },
        {
          title: "源码",
          src: "images/vip2.png",
          color: "#ffa820",
          money: "999999999",
          dismoney: "999999",
          tip: "/永久",
          subtext: "购买",
          click: function (item) {
            alert(JSON.stringify(item));
          },
          list: [
            {
              title: "一键集成表格的导出excel,打印,等功能",
              check: true,
            },
            {
              title: "底层代码可重用轻松对接多个UI框架",
              check: true,
            },
            {
              title: "底层更加完善的开发错误调试机制",
              check: true,
            },
            {
              title: "一套代码多个终端自适应",
              check: true,
            },
            {
              title: "一键集成表格的导出excel，打印，等常用功能",
              check: true,
            },
            {
              title: "表格的批量操作,表单的级联操作更加便捷",
              check: true,
            },
            {
              title: "新增大量常用组件（搜索，选项卡）",
              check: true,
            },
            {
              title: "新增大量全新可配置的骚属性",
              check: true,
            },
            {
              title: "丰富的数据展示模版组件包",
              check: true,
            },
            {
              title: "专属的开发者文档，助你快速掌握",
              check: true,
            },
          ],
        },
        {
          title: "全家桶",
          src: "images/vip3.png",
          color: "#ef4868",
          money: "999999",
          dismoney: "999999",
          tip: "/永久",
          subtext: "购买",
          click: function (item) {
            alert(JSON.stringify(item));
          },
          list: [
            {
              title: "授权商业化开发,永久更新授权使用",
              check: true,
            },
            {
              title: "后期更新和新产品将全部免费",
              check: true,
            },
            {
              title: "提供远程技术支持和问题解答",
              check: true,
            },
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
<style lang="scss">
.box-data-pay {
  .item {
    margin: 0 auto;
    padding-bottom: 16px;
    width: 80%;
    position: relative;
    border-radius: 4px;
    background-color: #fff;
    min-height: 670px;
    box-shadow: 1px 2px 10px #eee;
  }
  .top {
    width: 100%;
    height: 6px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px 4px 0 0;
  }
  .header {
    margin-bottom: 40px;
    text-align: center;
  }
  .title {
    text-align: center;
    padding: 20px 0 10px;
    font-size: 20px;
    font-weight: 200;
  }
  .money {
    span {
      margin-right: 5px;
      font-size: 14px;
    }
    .b {
      margin-right: 2px;
      font-size: 20px;
      font-weight: bold;
    }
    s {
      margin-right: 3px;
      font-size: 12px;
    }
    em {
      font-size: 14px;
      font-style: normal;
    }
  }
  .img {
    width: 50px;
  }
  .line {
    width: 60%;
    height: 1px;
    background: hsla(0, 0%, 59%, 0.1);
    margin: 20px auto;
  }
  .btn {
    display: block;
    width: 120px;
    height: 32px;
    line-height: 32px;
    margin: 0 auto;
    text-align: center;
    border-radius: 32px;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
  }
  .list {
    &-item {
      list-style: none;
      padding-left: 20px;
      margin-bottom: 12px;
      color: #666;
      font-size: 14px;
      a {
        color: #666;
      }
      &-icon {
        color: #515a6e;
        margin-right: 8px;
      }
      &--link {
        font-size: 12px;
        color: #2d8cf0;
      }
      &--no {
        color: #c5c8ce;
        & + span {
          color: #c5c8ce;
        }
      }
    }
  }
}
</style>
