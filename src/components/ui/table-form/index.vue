<template>
  <div class="box-table-form">
    <el-form ref="form" size="mini" :model="formData" @submit.native.prevent>
      <div class="placeholder">{{ currentOption.placeholder }}</div>
      <el-table
        stripe
        border
        highlight-current-row
        :data="formData.items"
        :key="certinfoKey"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="70"
          v-if="currentOption.index"
        ></el-table-column>
        <el-table-column
          :type="column.type"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
          v-for="(column, index) in currentOption.columns"
          :key="index"
        >
          <template #default="scope">
            <el-form-item :prop="column.prop">
              <component
                :is="getComponent(column.type)"
                :ref="column.prop"
                :option="column.option"
                v-model="formData.items[scope.$index][column.prop]"
              >
              </component>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          v-if="currentOption.hasCreate"
        >
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="handleAdd(scope.row, scope.$index)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-minus"
              circle
              size="mini"
              @click="handleDel(scope.row, scope.$index)"
              v-if="currentClosable"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
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
  nextTick,
} from "@vue/composition-api";
import { MessageBox, Notification } from "element-ui";
import Sortable from "sortablejs";

export default defineComponent({
  name: "TableForm",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: {
        items: (props.value || []).length == 0 ? [{}] : props.value,
      },
      certinfoKey: true,
      closable: true,
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", thatData.formData.items);
      }
    );

    onMounted(() => {
      if (currentOption.value.drag) {
        rowDrop();
      }
    });

    const rowDrop = function () {
      const tbody = document.querySelector(
        ".box-table-form .el-table__body-wrapper tbody"
      );
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = thatData.formData.items.splice(oldIndex, 1)[0];
          thatData.formData.items.splice(newIndex, 0, currRow);
          thatData.certinfoKey = !thatData.certinfoKey;
          nextTick(() => {
            rowDrop();
          });
        },
      });
    };

    const columnDrop = function () {
      // const wrapperTr = document.querySelector(".el-table__header-wrapper tr");
      // Sortable.create(wrapperTr, {
      //   animation: 180,
      //   delay: 0,
      //   onEnd: (evt) => {
      //     const oldItem = this.dropCol[evt.oldIndex];
      //     this.dropCol.splice(evt.oldIndex, 1);
      //     this.dropCol.splice(evt.newIndex, 0, oldItem);
      //   },
      // });
    };

    const currentOption = computed(() => {
      const defaultOption = {
        hasCreate: true,
        index: false,
        count: 0,
        drag: false,
        columns: [],
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentClosable = computed(() => {
      if (thatData.formData.items.length <= 1) {
        return false;
      }
      return true;
    });

    //获取组件
    const getComponent = function (type) {
      let resultName = type;
      if (type == null || type == "input" || type == "textarea") {
        resultName = "input";
      }
      if (type == "select") {
        resultName = "select";
      }
      return "box-" + resultName;
    };

    const handleAdd = function (row, index) {
      if (
        currentOption.value.count != 0 &&
        thatData.formData.items.length >= currentOption.value.count
      ) {
        Notification.error(`超过指定的个数了 ${currentOption.value.count}个.`);
        return;
      }
      thatData.formData.items.push({});
    };

    const handleDel = function (row, index) {
      if (thatData.formData.items.length <= 1) {
        return;
      }
      thatData.formData.items.splice(index, 1);
    };

    return {
      ...toRefs(thatData),
      currentOption,
      getComponent,
      handleAdd,
      handleDel,
      currentClosable,
    };
  },
});
</script>
<style lang="scss">
.box-table-form {
  table {
    border-collapse: collapse;
    margin: 0 0;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

  .placeholder {
    padding: 0 0 0 0px;
  }
}
</style>
