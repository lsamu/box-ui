<template>
  <div class="box-group">
    <el-collapse :value="1" v-for="(item, index) in currentItems" :key="index">
      <el-collapse-item :title="item.caption" :name="1">
        <div
          slot="title"
          style="
            height: inherit;
            font-size: 16px;
            width: 100%;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            padding-left: 10px;
          "
        >
          {{ item.caption }}
        </div>
        <box-form
          :option="item"
          :ref="'form-' + index"
          v-model="formData"
        ></box-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watchEffect,
  watch,
  toRefs,
} from "@vue/composition-api";

export default defineComponent({
  name: "Group",
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption: any = computed(() => {
      const defaultOption = {
        caption: "默认分组",
        items: [],
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentItems = computed(() => {
      let oo = Object.assign([], currentOption.value.items || []);
      return oo;
    });

    const refForm = (index) => {
      return null;
    };

    const validate = async () => {
      return false;
    };

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    watch(
      () => props.value,
      (n, o) => {
        thatData.formData = n || {};
      }
    );

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
.box-group {
  .el-collapse,
  .el-collapse-item__wrap {
    border-color: #fff;
  }
  .el-collapse-item__header {
    height: inherit;
    border: none;
  }
  .el-collapse-item__content {
    padding-bottom: 0px;
    padding: 10px;
  }
  &--arrow {
    .el-collapse-item__arrow {
      display: none;
    }
  }
  &--header {
    .el-collapse-item__header {
      display: none;
    }
  }
  .el-collapse-item__arrow {
    margin-top: -25px;
  }
  &--collapse {
    .el-collapse-item__arrow,
    .el-collapse-item__header {
      display: flex !important;
    }
  }
  &--card {
    padding: 0 20px;
    &:last-child {
      margin-bottom: 50px;
    }
  }
  &__item {
    margin-bottom: 10px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    border-radius: 5px;
    box-sizing: border-box;
    &:last-child {
      border-bottom: none;
    }
  }

  &__header {
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  &__icon {
    margin-right: 8px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }
  &__title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
