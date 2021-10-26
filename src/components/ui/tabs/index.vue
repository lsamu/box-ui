<template>
  <div class="box-tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="item.caption"
        :name="'tabs_label_' + index.toString()"
        v-for="(item, index) in currentItems"
        :key="index"
      >
        <el-scrollbar>
          <template v-if="item.formData || false">
            <box-form
              :option="item"
              :ref="'form-' + index"
              v-model="item.formData"
            ></box-form>
          </template>
          <template v-else>
            <box-form
              :option="item"
              :ref="'form-' + index"
              v-model="formData"
            ></box-form>
          </template>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  name: "Tabs",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value || {},
      activeName: "tabs_label_0",
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    //选项
    const currentOption = computed(() => {
      const defaultOption = {
        items: [
          {
            caption: "默认标签",
            items: [],
          },
        ],
      };
      let oo = Object.assign(defaultOption, props.option || []);
      return oo;
    });

    //当前项
    const currentItems = computed(() => {
      let oo = Object.assign([], currentOption.value.items || []);
      return oo;
    });

    //表单
    const refForm = function (index) {
      return that.$refs["form-" + index] as any;
    };

    //验证
    const validate = async function () {
      let isPass = true;
      for (let index = 0; index < currentItems.value.length; index++) {
        let itemFormFlag = await refForm(index)[0].validate();
        if (!itemFormFlag) {
          isPass = false;
        }
        continue;
      }
      return isPass;
    };

    return {
      ...toRefs(thatData),
      currentOption,
      currentItems,
      refForm,
      validate,
    };
  },
});
</script>
<style lang="scss">
.box-tabs {
  .el-scrollbar {
    // height: calc(100vh - 200px);
  }
}
</style>
