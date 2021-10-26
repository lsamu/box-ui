<template>
  <div class="box-tree">
    <div class="box-tree__filter" v-if="currentOption.filter" ref="refFilter">
      <el-input
        :placeholder="currentOption.filterText"
        v-model="data.filterValue"
        prefix-icon="el-icon-search"
      >
        <template slot="append">
          <el-tooltip
            class="item"
            effect="dark"
            content="添加一级"
            placement="top"
            slot="acurrentPropsend"
            :disabled="false"
            v-if="currentOption.edit.visible"
          >
            <el-button
              @click="handleRootNodeCreate"
              icon="el-icon-plus"
              v-if="currentOption.addBtn"
            ></el-button>
          </el-tooltip>
        </template>
      </el-input>
    </div>
    <el-tree
      ref="refTree"
      :data="currentData"
      :props="currentOption.props"
      :show-checkbox="currentOption.showCheckbox"
      default-expand-all
      node-key="id"
      :default-checked-keys="data.formData"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeContextMenu"
      @check="handleCheckChange"
      :highlight-current="true"
      :expand-on-click-node="false"
      :filter-node-method="handleFilterNode"
      v-loading="currentOption.loading"
    ></el-tree>
    <box-dialog-form ref="refDialogForm" :option="currentForm">
    </box-dialog-form>
    <box-context-menu
      :option="optionContextMenu"
      ref="refContextMenu"
    ></box-context-menu>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  nextTick,
  watch,
  onMounted,
  getCurrentInstance,
} from "@vue/composition-api";
import Enumerable from "linq";
import merge from "deepmerge";

const defaultOption = {
  loading: false,
  filter: true,
  filterText: "请输入关键词进行过滤。",
  addBtn: true,
  editBtn: true,
  delBtn: true,
  form: null,
  data: null,
  onSelected: null,
  onCreating: null,
  onUpdating: null,
  onSubmit: null,
  onRemove: null,
  showCheckbox: false,
  edit: {
    visible: false,
  },
  props: {
    children: "children",
    label: "label",
  },
};

const defaultData = [
  {
    id: 1,
    label: "一级",
    children: [
      {
        id: 2,
        label: "二级",
        children: [
          {
            id: 3,
            label: "三级",
          },
          {
            id: 4,
            label: "三级2",
          },
        ],
      },
    ],
  },
];

export default defineComponent({
  name: "Tree",
  props: ["option", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const refTree = ref(null);
    const refDialogForm = ref(null);

    let data = ref({
      filterValue: "",
      currentNode: null,
      formData: [],
    });

    let dataType = ref("array");
    let dataSource = ref([]);

    let optionContextMenu = {
      items: [
        {
          text: "新增",
          onClick: (item) => {
            handleNodeCreate();
          },
        },
        {
          text: "修改",
          onClick: (item) => {
            handleNodeUpdate();
          },
        },
        {
          text: "删除",
          onClick: (item) => {
            handleNodeDelete();
          },
        },
      ],
    };

    const currentOption = computed(() => {
      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const currentData = computed(() => {
      let oo = defaultData;
      if (dataSource.value && dataSource.value.length > 0) {
        oo = dataSource.value;
      }
      return oo;
    });

    const currentForm = computed(() => {
      const defaultOption = {
        title: "新增",
        form: {
          onSubmit: async (val) => {
            if (currentOption.value.onSubmit) {
              let ret = await currentOption.value.onSubmit(
                val,
                data.value.currentNode
              );
              if (ret == null) {
                console.log("return is error! is bool.");
                return;
              }
            }
            await handleLoad();
            refDialogForm.value.close();
          },
        },
      };
      let oo = merge(defaultOption, {
        form: currentOption.value.form || {},
      });
      return oo;
    });

    const handleLoad = async function () {
      dataSource.value = [];
      currentOption.value.loading = true;
      let tmpData = currentOption.value.data;
      if (typeof tmpData == "string") {
        dataType.value = "json";
        dataSource.value = [];
      } else if (typeof tmpData == "function") {
        dataType.value = "function";
        dataSource.value = await tmpData();
      } else {
        dataSource.value = tmpData;
      }
      currentOption.value.loading = false;
    };

    const handleFilterNode = (value, data) => {
      return data[currentOption.value.props.label].indexOf(value) !== -1;
    };

    const handleNodeClick = (data1: any) => {
      data.value.currentNode = data1;
      context.emit("onSelected", data1);
      if (currentOption.value.onSelected != null) {
        currentOption.value.onSelected(data1);
      }
    };

    const handleCheckChange = () => {};

    const refContextMenu = function () {
      return that.$refs["refContextMenu"] as any;
    };

    const handleNodeContextMenu = (e, d1) => {
      refContextMenu().open(e, null);
    };

    const handleRootNodeCreate = async () => {
      data.value.currentNode = {};
      handleNodeCreate();
    };

    const handleNodeCreate = async () => {
      refDialogForm.value.open();
      await nextTick(async () => {
        refDialogForm.value.setOption(
          "title",
          "新建-所属父节点-" +
            (data.value.currentNode[currentOption.value.props.label] ||
              "根节点")
        );
        refDialogForm.value.refForm().clearValidate();
        refDialogForm.value.refForm().reset();
        let form = {};
        context.emit(
          "onCreating",
          form,
          data.value.currentNode,
          async (val) => {
            if (val == null) {
              console.log("return is error! is object.");
              return;
            }
          }
        );

        if (currentOption.value.onCreating != null) {
          form = await currentOption.value.onCreating(
            form,
            data.value.currentNode
          );
          if (form == null) {
            console.log("return is error! is object.");
            return;
          }
        }
        refDialogForm.value.refForm().setFormData(form);
      });
    };
    const handleNodeUpdate = async () => {
      refDialogForm.value.open();
      await nextTick(async () => {
        refDialogForm.value.setOption("title", "编辑");
        refDialogForm.value.refForm().clearValidate();
        refDialogForm.value.refForm().reset();
        let form = data.value.currentNode || {};

        context.emit("onUpdating", form, async (val) => {
          if (val == null) {
            console.log("return is error! is object.");
            return;
          }
        });

        if (currentOption.value.onUpdating != null) {
          form = await currentOption.value.onUpdating(form);
          if (form == null) {
            console.log("return is error! is object.");
            return;
          }
        }
        refDialogForm.value.refForm().setFormData(form);
      });
    };

    const handleNodeDelete = async () => {
      await handleLoad();
    };

    const isArray = (object) => {
      return (
        object &&
        typeof object === "object" &&
        typeof object.length === "number" &&
        typeof object.splice === "function" &&
        !object.propertyIsEnumerable("length")
      );
    };

    watch(
      () => data.value.filterValue,
      (n, o) => {
        refTree.value.filter(n);
      }
    );

    watch(
      () => props.option.data,
      async (n, o) => {
        await handleLoad();
      }
    );

    return {
      currentOption,
      currentData,
      currentForm,
      dataSource,
      data,
      refTree,
      refDialogForm,
      handleFilterNode,
      handleNodeClick,
      handleCheckChange,
      handleNodeContextMenu,
      handleRootNodeCreate,
      handleNodeCreate,
      handleNodeUpdate,
      handleNodeDelete,
      optionContextMenu,
    };
  },
});
</script>
<style lang="scss">
.box-tree {
  // position: relative;
  margin: 0 5px;
  border: 1px solid #eee;
  padding: 5px;
  .popover-intree {
    position: absolute;
    ul {
      padding: 3px;
    }
    li {
      list-style: none;
    }
  }
  .context-menu {
    letter-spacing: 1px;
    color: #222;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    color: #000;
    text-align: center;
    &:hover {
      border-radius: 2px;
      background: #409eff;
      color: #fff;
    }
  }
  .el-popover {
    padding: 2px;
    min-width: 20px;
    border: 1px solid #ebeef5;
    border-radius: 0;
    box-shadow: 4px 4px 4px -4px rgb(121, 118, 118);
  }
}
</style>
