<template>
  <el-row class="box-search card" :span="24">
    <el-col
      :span="24"
      class="box-search__item"
      v-for="(column, index) in options.columns"
      :key="index"
    >
      <p class="box-search__title">{{ column.label }}:</p>
      <div class="box-search__content">
        <span
          :class="['box-search__tags',{'box-search__tags--active':getActive(column,item_child)}]"
          v-for="(item_child, index_child) in column.dataSource"
          :key="index_child"
          @click="onChange(column, item_child)"
        >
          {{ item_child.label }}
        </span>
      </div>
    </el-col>
  </el-row>
</template>
<script>
const defaultOption = {};

const defaultForm = {};

export default {
  name:"box-search",
  props:["option","data","value"],
  data() {
    return {
      options: {
        columns: [
          {
            label: "地区",
            prop: "area",
            dataSource: [
              {
                label: "北京",
                value: 1,
              },
              {
                label: "上海",
                value: 2,
              },
            ],
          },
          {
            label: "地区",
            prop: "area2",
            dataSource: [
              {
                label: "南京",
                value: 3,
              },
              {
                label: "西安",
                value: 4,
              },
            ],
          },
        ],
      },
      form: {},
    };
  },
  watch:{
     value: {
      handler () {
        this.setVal();
      },
      deep: true
    }
  },
  created(){
    this.setVal();
  },
  methods: {
    setVal () {
      Object.keys(this.value).forEach(ele => {
        this.$set(this.form, ele, this.value[ele]);
      });
    },
    onChange(column, item) {
      this.form[column.prop] = item.value;
      this.$emit("change", this.form);
      this.$emit("input", this.form);
      this.$message.success(JSON.stringify(this.form));
    },
    getActive(column, item) {
      console.log(column, item);
      console.log(this.form[column.prop], item.value);
      return this.form[column.prop] === item.value;
    },
  },
};
</script>

<style lang="scss">
.card {
  margin-top: 20px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.box-search {
  padding: 0 20px;
  &__item {
    padding: 20px 0 10px 0;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px dashed #e8e8e8;
    &:last-child {
      border-bottom: none;
    }
  }
  &__tags {
    padding: 0 12px;
    margin-right: 24px;
    margin-bottom: 12px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      color: #1890ff;
    }
    &--active {
      color: #fff;
      background-color: #1890ff;
      border-radius: 5px;
      &:hover {
        opacity: 0.85;
        color: #fff;
      }
    }
    display: inline-block;
  }
  &__title {
    margin: 0;
    padding: 0 20px 0 20px;
    width: 120px;
    font-size: 14px;
    text-align: right;
    display: inline-block;
    box-sizing: border-box;
  }
  &__content {
    width: calc(100% - 190px);
    display: inline-block;
    .el-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>