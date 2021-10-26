<template>
  <div class="box--data-article">
    <div class="box-article__header">
      <div
        class="box-article__title"
        v-if="currentData.title"
        v-text="currentData.title"
      ></div>
      <small
        class="box-article__meta"
        v-if="currentData.meta"
        v-text="currentData.meta"
      ></small>
    </div>
    <div
      class="box-article__lead"
      v-text="currentData.lead"
      v-if="currentData.lead"
    ></div>
    <div
      class="box-article__body"
      v-if="currentData.body"
      v-html="currentData.body"
    ></div>
  </div>
</template>
<script>
const propsDefault = {
  title: "title",
  meta: "meta",
  lead: "lead",
  body: "body",
};
export default {
  name: "Article",
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    currentOption() {
      let list = Object.assign(propsDefault, this.option || {});
      return list;
    },
    currentData() {
      let list = Object.assign(propsDefault, this.data || {});
      return list;
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.box-data-article {
  &__title {
    margin-bottom: 15px;
    font-size: 32px;
    line-height: 32px;
    font-weight: 400;
  }
  &__meta {
    display: block;
    margin-bottom: 20px;
    font-size: 12px;
    color: #999;
  }
  &__lead {
    color: #666;
    font-size: 14px;
    line-height: 22px;
    border: 1px solid #dedede;
    border-radius: 2px;
    background: #f9f9f9;
    padding: 10px;
  }
  &__body {
    padding-top: 10px;
    background: #fff;
    font-family: Segoe UI, Lucida Grande, Helvetica, Arial, Microsoft YaHei,
      FreeSans, Arimo, Droid Sans, wenquanyi micro hei, Hiragino Sans GB,
      Hiragino Sans GB W3, FontAwesome, sans-serif;
    color: #333;
    font-size: 14px;
  }
  blockquote {
    margin: 0;
    font-family: Georgia, Times New Roman, Times, Kai, Kaiti SC, KaiTi, BiauKai,
      FontAwesome, serif;
    padding: 1px 0 1px 15px;
    border-left: 4px solid #ddd;
  }
}
</style>