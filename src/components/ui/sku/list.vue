<template>
  <div class="box-sku-list">
    <el-table stripe border highlight-current-row :data="currentValue.items">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="70"
      ></el-table-column>
      <el-table-column
        :label="item.name"
        v-for="(item, index) in currentColumns"
        :key="index"
      >
        <template slot-scope="scope">
          {{ scope.row.propertyList[index].value }}
        </template>
      </el-table-column>
      <el-table-column label="库存" prop="inventory">
        <template slot="header">
          库存<i class="el-icon-edit" title="批量编辑"></i
        ></template>
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.inventory"
            size="mini"
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="折扣" prop="discount">
        <template slot="header">
          折扣价<i class="el-icon-edit" title="批量编辑"></i
        ></template>
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.discount"
            size="mini"
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price">
        <template slot="header">
          标准价<i class="el-icon-edit" title="批量编辑"></i
        ></template>
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.price"
            size="mini"
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="70">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-minus"
            circle
            size="mini"
            @click="onDelSpec(scope.row, scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
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

export default defineComponent({
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: { items: [] },
    });

    const currentValue = computed(() => {
      let aa = Object.assign(thatData.formData || {}, {
        items: props.value || [],
      });
      if (aa.items.length == 0) {
        aa.items.push({
          propertyList: [
            {
              name: "规格",
              value: "规格值",
            },
          ],
          inventory: 9999,
          discount: 0,
          price: 0,
        });
      }
      return aa;
    });

    const currentOption = computed(() => {
      const defaultOption = {
        hasCreate: true,
        columns: [],
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    //获取规格数据列表
    const currentColumns = function () {
      let aa = this.formData.items[0].propertyList;
      return aa;
    };

    const onDelSpec = function (row, index) {};

    return {
      ...toRefs(thatData),
      currentValue,
      currentOption,
      currentColumns,
      onDelSpec,
    };
  },
});
</script>
<style lang="scss">
.box-sku-list {
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

  .placeholder {
    padding: 0 0 0 0px;
  }
}
</style>
