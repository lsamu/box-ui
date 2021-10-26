<template>
  <el-submenu
    :index="'menu' + hashCode(JSON.stringify(data))"
    @click="handleSelectd(0, data)"
  >
    <template slot="title">
      <i :class="data.icon"></i>
      {{ data.label }}
    </template>
    <template v-for="item in data.children">
      <child v-if="item.children" :data="item" :key="item.label" />
      <el-menu-item
        v-else
        :index="'menu' + hashCode(JSON.stringify(item))"
        :key="item.label"
        @click="handleSelectd(0, item)"
      >
        <i :class="item.icon"></i>
        {{ item.label }}
      </el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "child",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    hashCode: function(str) {
      let hash = 0;
      if (str.length == 0) return hash;
      for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    },
    handleSelectd(index, menu) {
      this.$emit("onSelected", index, menu);
    },
  },
};
</script>
