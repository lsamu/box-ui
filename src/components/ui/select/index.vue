<template>
  <div class="box-select">
    <el-select
      v-model="formData"
      :placeholder="currentOption.placeholder"
      @focus="handleFocus"
      @blur="handleBlur"
      @click.native="handleClick"
      @change="handleChange"
      :clearable="currentOption.clearable"
    >
      <el-option
        :label="item.label"
        :value="item.value"
        v-for="(item, index) in dataSource"
        :key="index"
      ></el-option>
    </el-select>
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
  onMounted,
} from "@vue/composition-api";
import Enumerable from "linq";
import Axios from "axios";

export default defineComponent({
  name: "Select",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value,
      dataType: "array",
      dataSource: [],
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        handleChange(n);
      }
    );

    const currentOption = computed(() => {
      const defaultOption = {};
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const initData = async function () {
      const data = props.data || props.option["data"] || [];

      //判断data类型
      if (isArray(data)) {
        thatData.dataType = "array";
        thatData.dataSource = data;
      } else if (typeof data == "string") {
        thatData.dataType = "json";
      } else if (typeof data == "function") {
        thatData.dataType = "function";
        let ret = await data();
        thatData.dataSource = ret;
      } else if (typeof data == "object") {
        thatData.dataType = "object";
        if (data.methed == "post") {
          let ret = await Axios.post(data.url, data.data, {
            headers: data.headers,
          });
          thatData.dataSource = ret["data"];
        }
      } else {
        thatData.dataType = "array";
        thatData.dataSource = [];
      }
    };

    const isArray = function (object) {
      return (
        object &&
        typeof object === "object" &&
        typeof object.length === "number" &&
        typeof object.splice === "function" &&
        !object.propertyIsEnumerable("length")
      );
    };

    const handleFocus = function () { };
    const handleBlur = function () { };
    const handleClick = function () { };

    const handleChange = async function (value) {
      context.emit("input", value);
      context.emit("change", value);
      if (
        currentOption.value != null &&
        typeof (currentOption.value as any).onChange == "function"
      ) {
        await (currentOption.value as any).onChange(value);
      }
    };

    const setOption = function (name, val) {
      that.$set(this.currentOption, name, val);
      that.$forceUpdate();
    };

    onMounted(() => {
      initData();
    });

    return {
      ...toRefs(thatData),
      currentOption,
      initData,
      isArray,
      handleFocus,
      handleBlur,
      handleClick,
      handleChange,
      setOption,
    };
  },
});
</script>
<style lang="scss" scoped>
.box-select {
  display: inline-block;
  position: relative;
}
</style>
