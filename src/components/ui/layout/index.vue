<template>
  <div class="box-layout">
    <el-row :span="24" :gutter="5">
      <el-col
        :span="getSpan(item.span)"
        v-for="(item, index) in currentItems"
        :key="index"
        :ref="'ref-col-' + item.prop"
      >
        <template v-if="item.card && item.card.enable">
          <el-card :ref="'ref-card-' + item.prop">
            <div slot="header" class="clearfix" v-if="getTitle(item) != ''">
              <span style="font-weight: bold">{{ getTitle(item) }}</span>
              <i
                style="float: right; padding: 3px 0"
                class="el-icon-setting"
                v-if="currentOption.hasSet"
              ></i>
            </div>
            <div>
              <component
                :is="getComponent(item.type)"
                :ref="'ref-item-' + item.prop"
                :option="item"
                :data="item.data"
                style="width: 100%"
              ></component>
            </div>
          </el-card>
        </template>
        <template v-else>
          <div style="box-sizing: border-box; padding: 3px">
            <component
              :is="getComponent(item.type)"
              :ref="'ref-item-' + item.prop"
              :option="item"
              :data="item.data"
              style="width: 100%"
            ></component>
          </div>
        </template>
      </el-col>
    </el-row>
    <box-dialog-form :option="currentDialogFormOption" ref="dialogForm1"></box-dialog-form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
} from "@vue/composition-api";
import Enumerable from "linq";

export default defineComponent({
  name: "Layout",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: {},
    });

    const currentOption = computed(() => {
      const defaultOption = {
        hasSet: false,
        items: [],
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentData = computed(() => {
      let oo = {};
      return oo;
    });

    const currentItems = computed(() => {
      const defaultItems = [];
      let oo = Object.assign(defaultItems, currentOption.value.items || []);
      let aa = [];
      oo = Enumerable.from(oo).forEach((p: any) => {
        const defaultItem = {
          span: 24,
        };
        aa.push(Object.assign(defaultItem, p || {}));
      });
      return aa;
    });

    const currentDialogFormOption = computed(() => {
      let oo = {};
      return oo;
    });

    const getComponent = function (type): string {
      if (type == null || type == "") {
        type = "label";
      }
      return "box-" + type;
    };

    const getSpan = function (defaultSpan) {
      if (defaultSpan == null) {
        return 24;
      }
      return defaultSpan;
    };

    const searchForm = function (search) {
      let oo = Object.assign([], search || []);
      return {
        hasFooter: false,
        inline: true,
        labelWidth: 0,
        gutter: 10,
        items: oo,
      };
    };

    const TitleDesc = function (item) {
      if (item.title || item.desc || item.search) {
        return true;
      }
      return false;
    };

    const getTitle = function (item) {
      let aa = item.card.title || item.title;
      if (aa == null || aa == "") {
        return "";
      }
      return aa;
    };

    const refCol = function (prop: any) {
      return that.$refs["ref-col-" + prop] as any;
    };

    const refItem = function (prop: any) {
      return that.$refs["ref-item-" + prop] as any;
    };

    const refCard = function (prop: any) {
      return that.$refs["ref-card-" + prop] as any;
    };

    return {
      ...toRefs(thatData),
      currentOption,
      currentData,
      currentItems,
      currentDialogFormOption,
      getComponent,
      getSpan,
      searchForm,
      TitleDesc,
      getTitle,
      refCol,
      refItem,
      refCard
    };
  },
});
</script>
<style lang="scss">
.box-layout {
  .el-col {
    padding-top: 2.5px;
  }
}
</style>
