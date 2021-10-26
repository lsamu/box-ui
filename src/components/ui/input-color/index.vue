<template>
  <div class="box-input-color">
    <el-input
      :placeholder="currentOption.placeholder"
      v-model="text"
      :readonly="true"
      @change="handleChange"
      :clearable="true"
    >
      <template slot="append">
        <el-color-picker
          size="mini"
          v-model="text"
          show-alpha
          @change="handleChange"
          :predefine="predefineColors"
        ></el-color-picker>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "InputColor",
  props: ["option", "data", "value"],
  data() {
    return {
      text: this.value,
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
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
      const defaultOption ={
        placeholder:"请选择颜色."
      }
      let oo = Object.assign(defaultOption, this.option || {});
      return oo;
    },
  },
  methods: {
    handleChange(value) {
      let result = value;
      this.$emit("input", result);
      this.$emit("change", result);
    },
  },
};
</script>