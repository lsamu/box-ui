<template>
  <div>
    <el-input
      v-model="text"
      :placeholder="currentOption.placeholder"
      :type="currentOption.type"
      :rows="currentOption.rows"
      @click.native="handleClick"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :disabled="currentOption.disabled"
    ></el-input>
  </div>
</template>
<script>
function bindEvent(safe, name, event) {
  typeof safe[name] === "function" &&
    safe[name]({ value: safe.value, column: safe.column });
  safe.$emit(name, safe.value, event);
}

export default {
  name: "Input",
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
    value(n, o) {
      this.text = n;
    },
  },
  computed: {
    currentOption() {
      const defaultOption = {
        disabled: false,
      };
      let oo = Object.assign(defaultOption, this.option || {});
      return oo;
    },
  },
  methods: {
    handleClick(event) {
      bindEvent(this, "click", event);
    },
    handleFocus(event) {
      bindEvent(this, "focus", event);
    },
    handleBlur(event) {
      bindEvent(this, "blur", event);
    },
    handleChange(value) {
      let result = value;
      this.$emit("input", result);
      this.$emit("change", result);
    },
  },
};
</script>
<style lang="scss"></style>
