<template>
  <div class="box-checkbox">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <div style="margin: 15px 0"></div>
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{
        city
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";

export default defineComponent({
  name: "BoxCheckbox",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      checkAll: false,
      checkedCities: props.value ? props.value : [],
      cities: props.data,
      isIndeterminate: true,
    });

    const handleCheckAllChange = function (val: any) {
      thatData.checkedCities = val ? props.data : [];
      thatData.isIndeterminate = false;
      context.emit("input", thatData.checkedCities);
    };

    const handleCheckedCitiesChange = function (value: any) {
      let checkedCount = value.length;
      thatData.checkAll = checkedCount === thatData.cities.length;
      thatData.isIndeterminate =
        checkedCount > 0 && checkedCount < thatData.cities.length;
      context.emit("input", thatData.checkedCities);
    };
    return {
      ...thatData,
      handleCheckAllChange,
      handleCheckedCitiesChange,
    };
  },
});
</script>
<style lang="scss"></style>
