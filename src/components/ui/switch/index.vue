<template>
  <el-switch v-model="text" @change="handleChange" :active-value="1" :inactive-value="0"></el-switch>
</template>
<script>
/**
 * 对象深拷贝
 */
const deepClone = (data) => {
  var type = getObjType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i] = (() => {
        if (data[i] === 0) {
          return data[i];
        }
        return data[i];
      })();
      if (data[i]) {
        delete data[i].$parent;
      }
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      if (data) {
        delete data.$parent;
      }
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

export default {
  name: "BoxSwitch",
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
  computed: {},
  methods: {
    handleChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>
<style lang="scss">
</style>