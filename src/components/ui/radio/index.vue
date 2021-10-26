<template>
  <el-radio-group v-model="text" size="small">
    <el-radio-button
      :label="item.value"
      v-for="(item, index) in option.data"
      :key="index"
      >{{ item.label }}</el-radio-button
    >
  </el-radio-group>
</template>
<script>
export default {
  name: "Radio",
  props: ["option", "data", "value"],
  data() {
    return {
      text: this.value,
    };
  },
  watch: {
    text(n, o) {
      this.handleChange(n);
    },
    value(n,o){
      this.text = n;
    }
  },
  computed: {
    currentOption() {
      let oo = Object.assign({ onChange: (ret) => {} }, this.option || {});
      return oo;
    },
  },
  methods: {
    handleFocus() {},
    handleBlur() {},
    handleClick() {},
    handleChange(value) {
      let result = value;
      this.$emit("input", result);
      this.$emit("change", result);
      this.currentOption.onChange(result);
    },
  },
};
</script>
<style lang="scss">
</style>