<template>
  <div class="box-sku-from">
    <el-form ref="form" size="small" :model="formData" @submit.native.prevent>
      <el-table stripe border highlight-current-row :data="currentValue.items">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="70"
        ></el-table-column>
        <el-table-column label="规格名称">
          <template slot-scope="scope">
            <el-form-item>
              <el-input
                v-model="formData.items[scope.$index].name"
                size="mini"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="规格值(文字、图片地址)">
          <template slot-scope="scope">
            <el-row
              v-for="(item, index) in formData.items[scope.$index].valueList"
              :key="index"
            >
              <el-col :span="20">
                <el-form-item>
                  <el-input
                    v-model="item.name"
                    size="mini"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="4">
                <el-button
                  v-if="index == 0"
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  size="mini"
                  @click="onAddValue(scope.row, scope.$index, index)"
                ></el-button>
                <el-button
                  v-else
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  size="mini"
                  @click="onDelValue(scope.row, scope.$index, index)"
                ></el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="70">
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index == 0"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="onAdd(scope.row, scope.$index)"
            ></el-button>
            <el-button
              v-else
              type="danger"
              icon="el-icon-minus"
              circle
              size="mini"
              @click="onDel(scope.row, scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  watch,
  toRefs
} from "@vue/composition-api";

export default defineComponent({
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: { items: [] },
    });

    const currentValue = computed((): any => {
      let aa = Object.assign(thatData.formData || {}, {
        items: props.value || [],
      });
      if (aa.items.length == 0) {
        aa.items.push({
          name: "规格",
          valueList: [
            {
              name: "规格值",
            },
          ],
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
    //#endregion

    //#region  规格详细列表
    //添加规格
    const onAdd = function (row, index) {
      thatData.formData.items.push({
        name: "规格",
        valueList: [
          {
            name: "规格值" + index,
          },
        ],
      });
    };

    //删除规格
    const onDel = function (row, index) {
      thatData.formData.items.splice(index, 1);
    };

    //添加值
    const onAddValue = function (row, index, indexValue) {
      thatData.formData.items[index].valueList.push({
        name: "规格值" + index,
      });
    };

    //删除值
    const onDelValue = function (row, index, indexValue) {
      thatData.formData.items[index].valueList.splice(indexValue, 1);
    };

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", thatData.formData.items);
      },
      { deep: true }
    );

    return {
      ...toRefs(thatData),
      currentValue,
      currentOption,
      onAdd,
      onDel,
      onAddValue,
      onDelValue,
    };
  },
});
</script>
<style lang="scss">
.box-sku-from {
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

  .placeholder {
    padding: 0 0 0 0px;
  }
}
</style>
