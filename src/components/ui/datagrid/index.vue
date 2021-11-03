<template>
  <div class="box-datagrid">
    <box-form-search
      ref="mySearch"
      :option="currentSearchOption"
      @submit="onSearch"
      v-if="currentSearch.visible"
    ></box-form-search>
    <div class="box-datagrid__toolbar" v-if="currentOption.toolbar.visible">
      <div class="box-datagrid__toolbar__left">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="onNew"
          v-if="currentOption.hasAdd"
        >{{ currentOption.addText }}</el-button>
        <slot name="toolbar_left"></slot>
        <!-- 动态组件 -->
        <div
          style="margin: 5px; display: inline-block; position: relative"
          v-for="(item, index) in currentLeftItems"
          :key="index"
        >
          <component :is="getComponent(item.type)" :option="item" :data="item.data"></component>
        </div>
      </div>
      <div class="box-datagrid__toolbar__right">
        <!-- 动态组件 -->
        <div
          style="margin: 5px; display: inline-block; position: relative"
          v-for="(item, index) in currentRightItems"
          :key="index"
        >
          <component :is="getComponent(item.type)" :option="item" :data="item.data"></component>
        </div>
        <el-tooltip placement="top" effect="dark" content="刷新" v-if="currentOption.isRefresh">
          <el-button icon="el-icon-refresh" size="small" @click="onRefresh"></el-button>
        </el-tooltip>
        <el-tooltip placement="top" effect="dark" content="导出Excel" v-if="currentOption.isExcel">
          <el-button icon="el-icon-download" size="small"></el-button>
        </el-tooltip>

        <el-tooltip effect="dark" :content="'搜索'" placement="top">
          <el-button size="mini" circle icon="el-icon-search" @click="handleToggleSearch" />
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新" placement="top">
          <el-button size="mini" circle icon="el-icon-refresh" @click="handleDataRefresh" />
        </el-tooltip>
        <el-tooltip placement="top" effect="dark" content="导出Excel">
          <el-button icon="el-icon-download" circle size="small" @click="handleExportData"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="显隐列" placement="top">
          <el-popover placement="bottom-end" width="150" trigger="click">
            <el-button
              size="small"
              circle
              icon="el-icon-menu"
              slot="reference"
              style="margin-left: 10px"
            ></el-button>
            <el-checkbox v-model="allChecked" @change="handleCheckedTableColumnsChangeAll">全选</el-checkbox>
            <el-checkbox
              v-for="(item, index) in currentColumns"
              :key="index"
              v-model="item.hidden"
              @change="handleCheckedTableColumnsChange(item)"
            >{{ item.label }}</el-checkbox>
          </el-popover>
        </el-tooltip>
        <slot name="toolbar_right"></slot>
      </div>
    </div>
    <div
      class="box-datagrid__pager"
      v-if="
        currentOption.page.visible &&
        (currentOption.page.location == 'top' ||
          currentOption.page.location == 'both')
      "
    >
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentOption.page.pageIndex"
        :page-sizes="currentOption.page.pageSizes"
        :page-size="currentOption.page.pageSize"
        :layout="currentOption.page.layout"
        :total="currentOption.page.total"
      ></el-pagination>
    </div>
    <div class="box-datagrid__table">
      <el-table
        ref="myTable"
        stripe
        border
        highlight-current-row
        :show-summary="currentOption.summary"
        :data="dataSource"
        v-loading="currentOption.loading"
        @row-dblclick="onRowDbClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" v-if="currentOption.selection"></el-table-column>
        <el-table-column type="index" width="55" label="编号" v-if="currentOption.index"></el-table-column>

        <!-- 多级表头 不是很完美 后面找到再替换吧 -->
        <!-- <template v-for="(column, index) in currentColumns"> -->
        <!-- <el-table-column
            :key="index"
            :label="column.label"
            :header-align="column.headerAlign"
            :width="column.width"
            v-if="column.type == 'column'"
          >
            <template v-for="(column, index) in column.columns">
              <el-table-column
                :type="column.type"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :sortable="column.sortable"
                :key="index"
                :formatter="toFormat"
                :header-align="column.headerAlign"
                :align="column.align"
              >
                <template #default="scope">
                  <template
                    v-if="
                      (column.edit != null && column.edit) ||
                      (column.editorOption != null &&
                        column.editorOption.enable == true)
                    "
                  >
                    <component
                      :is="getComponent(column.type)"
                      v-model="scope.row[column.prop]"
                      :ref="'ref-col-' + column.prop"
                      :option="column.option"
                      :data="column.option.data"
                    ></component>
                  </template>
                  <template v-else>
                    <box-html
                      :value="
                        renderColumn(column, scope.row[column.prop], scope.row)
                      "
                    ></box-html>
                  </template>
                </template>
              </el-table-column>
            </template>
        </el-table-column>-->
        <el-table-column
          :key="index"
          :type="column.type"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
          :formatter="toFormat"
          :header-align="column.headerAlign"
          :align="column.align"
          v-for="(column, index) in currentColumns"
        >
          <template #default="scope">
            <template
              v-if="
                (column.edit != null && column.edit) ||
                (column.editorOption != null &&
                  column.editorOption.enable == true)
              "
            >
              <component
                :is="getComponent(column.type)"
                v-model="scope.row[column.prop]"
                :ref="'ref-col-' + column.prop"
                :option="column.option"
                :data="column.option.data"
              ></component>
            </template>
            <template v-else>
              <box-html :value="renderColumn(column, scope.row[column.prop], scope.row)"></box-html>
            </template>
          </template>
        </el-table-column>
        <!-- </template> -->

        <el-table-column
          label="操作"
          :width="currentOption.opWidth"
          header-align="center"
          align="center"
          :fixed="currentOption.OP.fixed"
          v-if="currentOption.columnOperate.visible"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="onEdit(scope.row)"
              v-if="currentOption.isEdit"
            >编辑</el-button>
            <slot name="menu" :row="scope.row"></slot>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="onDelete(scope.row)"
              v-if="currentOption.isDel"
            >删除</el-button>
            <component
              :is="getComponent(item.type)"
              v-for="(item, index) in currentOption.columnOperate.items"
              :key="index"
              :option="item"
              :data="scope.row"
            ></component>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="box-datagrid__pager"
      v-if="
        currentOption.page.visible &&
        (currentOption.page.location == 'buttom' ||
          currentOption.page.location == 'both')
      "
    >
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentOption.page.pageIndex"
        :page-sizes="currentOption.page.pageSizes"
        :page-size="currentOption.page.pageSize"
        :layout="currentOption.page.layout"
        :total="currentOption.page.total"
      ></el-pagination>
    </div>
    <box-dialog-form
      ref="myDialog"
      :option="{ drawer: currentOption.drawer, form: currentFormOption }"
    ></box-dialog-form>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
  watch,
  nextTick,
  reactive,
  toRefs,
} from "@vue/composition-api";
import Enumerable from "linq";
import Search from "./search.vue";
import ToolBar from "./toolbar.vue";
import Pager from "./page.vue";
import axios from "axios";
import merge from "deepmerge";

export default defineComponent({
  name: "Datagrid",
  components: {
    "box-form-search": Search,
    "box-datagrid-toolbar": ToolBar,
    "box-datagrid-pager": Pager,
  },
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      dataSource: [],
      dataType: "array",
      formData: {},
      selectItems: [],
      allChecked: false,
      checkedItems: []
    });

    const currentOption: any = computed(() => {
      const defaultOption = {
        preset: "page", //simple page
        summary: false,
        loading: false,
        addText: "新增",
        editText: "编辑",
        isAdd: true,
        isEdit: true,
        isDel: true,
        isRefresh: false,
        isExcel: false,
        opWidth: 180,
        isOP: true,
        drawer: false,
        selection: false,
        index: false,
        form: null, //自定义表单
        OP: {
          fixed: null,
        },
        data: null, //数据
        toolbar: {
          visible: false,
          hasAdd: true,
          addText: "新增",
          items: [],
        }, //工具条
        columnChooser: {
          enabled: false,
        }, //列功能操作
        columnOperate: {
          visible: false,
        }, //
        export: {
          enabled: false,
          hasSelected: false,
        }, //导出数据
        page: {
          visible: false,
          location: "buttom", //top buttom  both
        }, //分页
        search: {
          visible: true,
        },
        onSubmit: (ret: any) => { },
        onEdit: (ret: any) => { },
        onDel: (ret: any) => { },
      };

      const defaultPage = {
        total: 0,
        pageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 50, 100, 500],
        layout: "total, sizes, prev, pager, next, jumper",
      };

      if (props.option && props.option["preset"] == "simple") {
        defaultOption.columnOperate.visible = false;
        defaultOption.page.visible = false;
        defaultOption.toolbar.visible = false;
      } else {
        defaultOption.columnOperate.visible = true;
        defaultOption.page.visible = true;
        defaultOption.toolbar.visible = true;
      }

      let oo = merge(defaultOption, props.option || {});

      oo["page"] = merge(defaultPage, oo["page"] || {});
      oo["columns"] = merge([], oo["columns"] || []);
      return oo;
    });

    const currentColumns: any = computed(() => {
      const defaultOption = {
        option: {}, //表单组件属性
        editorOption: {}, //编辑组件属性
      };
      let columns = [];
      for (const col of currentOption.value.columns) {
        if (col.hidden) {
          continue;
        }
        columns.push(col);
      }
      return columns;
    });

    const currentFormOption: any = computed(() => {
      let formItems = [];
      //自定义
      if (currentOption.value.form != null) {
        return Object.assign(
          { onSubmit: currentOption.value.onSubmit },
          currentOption.value.form || {}
        );
      } else {
        for (const col of currentOption.value.columns) {
          if (col.type == "index" || col.type == "selection") {
            continue;
          }
          let form = true;
          if (col.form == undefined) {
            form = true;
          }
          if (typeof col.form == "boolean") {
            form = col.form;
          }
          if (!form) {
            continue;
          }

          if (col.type != "column") {
            let itemDeault = Object.assign(
              {},
              {
                enable: true,
                type: col.type || "input",
                label: col.label,
                prop: col.prop,
                value: col.value || null,
                format: (data: any) => { },
              } || {}
            );
            let item = Object.assign(itemDeault, col.option || {});
            formItems.push(item);
          } else {
            for (const cc of col.columns) {
              let itemDeault = Object.assign(
                {},
                {
                  enable: true,
                  type: cc.type || "input",
                  label: cc.label,
                  prop: cc.prop,
                  value: cc.value || null,
                  format: (data: any) => { },
                } || {}
              );
              let item = Object.assign(itemDeault, cc.option || {});
              formItems.push(item);
            }
          }
        }
      }
      const defaultFormOption = {
        labelWidth: 100,
        isSubmit: true,
        isReset: true,
        formData: {},
        items: [],
        onSubmit: currentOption.value.onSubmit,
      };
      let oo = Object.assign(defaultFormOption, { items: formItems } || {});
      return oo;
    });

    //搜索表单
    const currentSearchOption: any = computed(() => {
      const defaultFormOption = {
        labelWidth: 80,
        isSubmit: true,
        isReset: true,
        inline: true,
        submitText: "搜索",
        items: [],
      };
      let formItems = [];
      if (
        currentOption.value.search != null &&
        currentOption.value.search.items != null
      ) {
        return Object.assign(
          defaultFormOption,
          { items: currentOption.value.search.items } || {}
        );
      }

      for (const col of currentOption.value.columns) {
        let search = {
          rule: true,
        };
        if (typeof col.search == "object") {
          search = Object.assign(search, col.search || {});
        } else if (typeof col.search == "boolean") {
        } else {
          continue;
        }
        //排除系统的prop
        if (col.type == "index" || col.type == "selection") {
          continue;
        }
        let itemDeault = Object.assign(
          {},
          {
            type: col.type || "input",
            label: col.label,
            prop: col.prop,
          } || {}
        );
        let item = Object.assign(itemDeault, col.option || {});
        //移除验证
        if (!search.rule) {
          item["rules"] = [];
        }
        formItems.push(item);
      }

      let oo = Object.assign(defaultFormOption, { items: formItems } || {});
      return oo;
    });

    //搜索项
    const currentSearchCount: any = computed(() => {
      return currentSearchOption.value.items.length;
    });

    //获取工具条
    const currentToolBar: any = computed(() => {
      let widgets: any = [];
      const defaultWidget = {
        widget: "button",
        option: {},
        location: "left", // left center right
      };
      return widgets;
    });

    const currentSearch: any = computed(() => {
      const defaultOption = {
        visible: true,
        count: currentSearchCount.value,
      };
      let oo = Object.assign(defaultOption, currentOption.value.search);
      return oo;
    });

    const currentLeftItems: any = computed(() => {
      let aa: any = [];
      for (const item of currentOption.value.toolbar.items as any) {
        if (item.location == null || item.location == "before") {
          aa.push(item);
        }
      }
      return aa;
    });

    const currentRightItems: any = computed(() => {
      let aa = [];
      for (const item of currentOption.value.toolbar.items as any) {
        if (item.location == "after") {
          aa.push(item);
        }
      }
      return aa;
    });

    const refDialog = function () {
      return root.refs["myDialog"] as any;
    };

    const refSearch = function () {
      return root.refs["mySearch"] as any;
    };

    const refTable = function () {
      return root.refs["myTable"] as any;
    };

    const refPager = function () {
      return root.refs["myPager"] as any;
    };

    const rowEditOption = function (item: any, row: any) {
      if (item["onClick"]) {
        item["onClick"] = item["onClick"](row);
      }
      if (item["onChange"]) {
        item["onChange"] = item["onChange"](row);
      }
      return item;
    };

    const onNew = function () {
      refDialog().setOption("title", currentOption.value.addText);
      refDialog().open();
      nextTick(async () => {
        refDialog().refForm().clearValidate();
        refDialog().refForm().reset();
        refDialog()
          .refForm()
          .setFormData(thatData.formData || {});
        if (currentOption.value.onEdit != null) {
          await currentOption.value.onEdit("add", {});
        }
      });
    };

    //编辑
    const onEdit = function (row = {}) {
      refDialog().setOption("title", currentOption.value.editText);
      refDialog().open();
      nextTick(async () => {
        refDialog().refForm().clearValidate();
        refDialog().refForm().reset();
        refDialog().refForm().setFormData({});
        refDialog().refForm().setFormData(row);
        if (currentOption.value.onEdit != null) {
          await currentOption.value.onEdit("edit", row);
        }
      });
    };

    //删除
    const onDelete = function (row = {}) {
      root.proxy
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          if (currentOption.value.onDel != null) {
            currentOption.value.onDel(row);
          }
          context.emit("on-delete");
        })
        .catch(() => { });
    };

    //获取组件
    const getComponent = function (type) {
      //获取组件名称
      let resultName = type;
      if (type == "input" || type == "textarea") {
        resultName = "input";
      }
      return "box-" + resultName;
    };

    const handleToggleSearch = function () {
      currentSearch.value.visible = !currentSearch.value.visible;
      that.$forceUpdate();
    };

    const handleDataRefresh = function () {
      thatData.dataSource = [];
      nextTick(async () => {
        await loadData();
      });
    };

    //导出数据
    const handleExportData = function () { };

    //控制显示列
    const handleCheckedTableColumnsChange = function (item) {
      //控制列显示
      let aa: any = Enumerable.from(currentColumns.value).firstOrDefault(
        (p) => p["prop"] == item.prop
      );
      aa.hidden = !aa.hidden;
      that.$forceUpdate();
    };

    const handleCheckedTableColumnsChangeAll = function () {
      if (thatData.allChecked) {
        // Enumerable.from(currentColumns.value).forEach((p) => {
        //   p["hidden"] = false;
        // });
        for (let index = 0; index < currentColumns.value.length; index++) {
          const element = currentColumns.value[index];
          element["hidden"] = false;
        }
      } else {
        // Enumerable.from(currentColumns.value).forEach((p) => {
        //   p["hidden"] = true;
        // });
        for (let index = 0; index < currentColumns.value.length; index++) {
          const element = currentColumns.value[index];
          element["hidden"] = true;
        }
      }
    };

    const onRowDbClick = function (row: any) {
      if (currentOption.value.onRowDbClick != null) {
        currentOption.value.onRowDbClick(row);
      }
    };

    const onRefresh = function () {
      loadData();
    };

    const refresh = function () {
      loadData();
    };

    const handleSelectionChange = function (vals) {
      thatData.selectItems = vals;
    };

    const handleSizeChange = function (val: any) {
      currentOption.value.page.pageSize = val;
      currentOption.value.page.pageIndex = 1;
      loadData();
    };

    const handleCurrentChange = function (val: any) {
      currentOption.value.page.pageIndex = val;
      loadData();
    };

    const toFormat = function (
      row: any,
      column: any,
      cellValue: any,
      index: any
    ) {
      let tempVal = cellValue;
      let ff = Enumerable.from(
        currentOption.value.columns as any
      ).firstOrDefault((p) => {
        return (p as any).prop == column.property;
      });
      if (ff && typeof (ff as any).formatter == "function") {
        tempVal = (ff as any).formatter(row, column, cellValue, index);
      } else {
        let aa = ff as any;
        //获取数据
        if (aa.option != undefined && aa.option.data != undefined) {
          let bb = Enumerable.from(aa.option.data).firstOrDefault(
            (p) => p.value == tempVal
          );
          if (bb != null) {
            tempVal = (bb as any).label;
          }
        }
      }
      return tempVal;
    };

    //渲染表格列
    const renderColumn = function (column: any, value: any, row: any) {
      if (value == null && column.prop.indexOf(".") > -1) {
        value = eval("row." + column.prop);
      }
      if (value == null) {
        return "";
      }
      if (column.template != null) {
        return column.template(column, value, row);
      }
      //是否渲染选项数据
      if (column.option && column.option.data && isArray(column.option.data)) {
        try {
          let ret = Enumerable.from(column.option.data)
            .where((p: any) => p.value == value)
            .first() as any;
          return ret.label;
        } catch (error) {
          return value;
        }
      }
      return value;
    };

    const isArray = function (object: any) {
      return (
        object &&
        typeof object === "object" &&
        typeof object.length === "number" &&
        typeof object.splice === "function" &&
        !object.propertyIsEnumerable("length")
      );
    };
    //初始化数据
    const loadData = async function (form: any = null) {
      currentOption.value.loading = true;
      currentOption.value.page.pageIndex =
        currentOption.value.page.pageIndex || 1;
      if (isArray(props.data)) {
        thatData.dataType = "array";
        thatData.dataSource = props.data;
      } else if (typeof props.data == "string") {
        thatData.dataType = "json";
      } else if (typeof props.data == "function") {
        thatData.dataType = "function";
        let ret = await props.data(currentOption.value.page, form || {});
        thatData.dataSource = ret["data"] || [];
        currentOption.value.page.total = ret["totalCount"] || ret["total"];
      } else if (typeof props.data == "object") {
        let httpOption = props.data;
        let ret;
        if (httpOption.methed == "get") {
          ret = await axios.get(httpOption.url);
        } else if (httpOption.methed == "post") {
          ret = await axios.post(httpOption.url, httpOption.params);
        }
        let dd = ret.data;
        if (httpOption.onHandler) {
          dd = await httpOption.onHandler(ret.data);
        }
        thatData.dataType = "object";
        thatData.dataSource = dd;
      }
      currentOption.value.loading = false;
    };

    const onFormSubmit = (form: any) => {
      let flag = currentOption.value.onSubmit(form);
      if (flag) {
        refDialog().setOption("visible", false);
      }
    };

    //搜索
    const onSearch = async function (form: any) {
      loadData(form);
    };

    //更新选项
    const setOption = function (name: any, value: any) {
      currentOption.value[name] = value;
    };

    const getSelectItems = function () {
      return thatData.selectItems;
    };

    const setFormData = function (formData1) {
      thatData.formData = formData1;
    };

    onMounted(async () => {
      await loadData();
    });

    watch(
      () => props.data,
      async (n, o) => {
        await loadData();
      }
    );

    return {
      ...toRefs(thatData),
      currentOption,
      currentColumns,
      currentFormOption,
      currentSearchCount,
      currentSearch,
      currentToolBar,
      onNew,
      onEdit,
      onDelete,
      getComponent,
      handleToggleSearch,
      handleDataRefresh,
      handleExportData,
      onRowDbClick,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      onRefresh,
      refresh,
      onFormSubmit,
      onSearch,
      setOption,
      getSelectItems,
      setFormData,
      handleCheckedTableColumnsChange,
      handleCheckedTableColumnsChangeAll,
      toFormat,
      renderColumn,
      rowEditOption,
      currentLeftItems,
      currentRightItems,
      currentSearchOption,
    };
  },
});
</script>
<style lang="scss">
.box-datagrid {
  &__search {
    padding: 5px;
  }
  table {
    border-collapse: collapse;
    margin: 0 0;
  }
  &__toolbar {
    padding: 5px 0 5px 0;
    overflow: hidden;
    &__left {
      float: left;
    }
    &__right {
      float: right;
    }
  }
  &__table {
  }
  &__pager {
    padding: 20px 0;
  }
}
</style>
