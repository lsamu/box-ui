<template>
  <div class="box-sku">
    <sku-form v-model="formData" ref="skuForm1"></sku-form>
    <br />
    <sku-list v-model="formDataList" ref="skuList1"></sku-list>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
  watch,
} from "@vue/composition-api";
import Enumerable from "linq";
import SkuForm from "./form.vue";
import SkuList from "./list.vue";

export default defineComponent({
  name: "Sku",
  components: {
    SkuForm,
    SkuList,
  },
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value || [],
      formDataList: [],
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        let bb = generate(thatData.formData);
        let aa = bb.map((item) => {
          return {
            propertyList: item,
            inventory: 9999,
            discount: 0,
            price: 0,
          };
        });
        //循环现有的规格
        let dd = [];
        Enumerable.from(aa).forEach((p1: any) => {
          let cc = Enumerable.from(thatData.formDataList).firstOrDefault(
            (p2: any) => {
              return equalsObject(p1.propertyList, p2.propertyList);
            }
          );
          if (null != cc) {
            dd.push(cc);
          } else {
            dd.push(p1);
          }
        });
        thatData.formDataList = dd;
      }
    );

    const equalsArray = function (array1, array) {
      if (!array) return false;
      if (array1.length != array.length) return false;
      for (var i = 0, l = array1.length; i < l; i++) {
        if (array1[i] instanceof Array && array[i] instanceof Array) {
          if (!array1[i].equals(array[i])) return false;
        } else if (array1[i] != array[i]) {
          return false;
        }
      }
    };

    const equalsObject = function (object1, object2) {
      for (let propName in object1) {
        if (
          object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)
        ) {
          return false;
        } else if (typeof object1[propName] != typeof object2[propName]) {
          return false;
        }
      }
      for (let propName in object2) {
        if (
          object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)
        ) {
          return false;
        } else if (typeof object1[propName] != typeof object2[propName]) {
          return false;
        }
        if (!object1.hasOwnProperty(propName)) continue;
        if (
          object1[propName] instanceof Array &&
          object2[propName] instanceof Array
        ) {
          if (!object1[propName].equals(object2[propName])) return false;
        } else if (
          object1[propName] instanceof Object &&
          object2[propName] instanceof Object
        ) {
          if (
            JSON.stringify(object1[propName]) !=
            JSON.stringify(object2[propName])
          )
            return false;
        } else if (object1[propName] != object2[propName]) {
          return false;
        }
      }
      return true;
    };

    const specList = function (aa: any) {
      let result = [];
      aa.forEach((item) => {
        item.propertyList.forEach((property) => {
          let target = result.find((spec) => {
            return spec.name === property.name;
          });
          if (!target) {
            result.push({
              name: property.name,
              valueList: [{ name: property.value }],
            });
          } else {
            if (
              !target.valueList.find((value) => value.name === property.value)
            ) {
              target.valueList.push({ name: property.value });
            }
          }
        });
      });
      return result;
    };

    const generate = function (arr) {
      function mix(item1, item2) {
        var arr1 = Array.isArray(item1.valueList) ? item1.valueList : item1;
        var arr2 = item2.valueList;
        var result = [];
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            let item = [];
            if (Array.isArray(arr1[i])) {
              item = item.concat(arr1[i]);
              item.push({
                name: item2.name,
                value: arr2[j].name,
              });
            } else {
              item.push({
                name: item1.name,
                value: arr1[i].name,
              });
              item.push({
                name: item2.name,
                value: arr2[j].name,
              });
            }
            result.push(item);
          }
        }
        return result;
      }
      if (arr.length < 1) {
        return [];
      } else if (arr.length < 2) {
        let result = [];
        let item = arr[0];
        item.valueList.map((value) => {
          result.push([
            {
              name: item.name,
              value: value.name,
            },
          ]);
        });
        return result;
      } else {
        return arr.reduce((acc, item) => {
          return mix(acc, item);
        });
      }
    };

    const refForm = function () {
      return that.$refs["skuForm1"] as any;
    };

    const refList = function () {
      return that.$refs["skuList1"] as any;
    };

    return {
      ...toRefs(thatData),
    };
  },
});
</script>
<style lang="scss">
.box-sku {
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

  .placeholder {
    padding: 0 0 0 0px;
  }
}
</style>
