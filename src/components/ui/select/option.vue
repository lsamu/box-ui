<template>
  <box-form :option="currentOption" v-model="formData"></box-form>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  name: "Select",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption = computed(() => {
      let oo = {
        labelWidth: 5,
        hasFooter: false,
        items: [
          {
            type: "tabs",
            items: [
              {
                caption: "静态数据",
                labelWidth: 10,
                hasFooter: false,
                items: [
                  {
                    type: "table-form",
                    prop: "data",
                    columns: [
                      {
                        type: "input",
                        prop: "label",
                        label: "键",
                      },
                      {
                        type: "input",
                        prop: "value",
                        label: "值",
                      },
                    ],
                  },
                ],
              },
              {
                caption: "远程数据",
                labelWidth: 70,
                hasFooter: false,
                items: [
                  {
                    type: "textarea",
                    prop: "url",
                    label: "地址",
                  },
                  {
                    type: "select",
                    label: "请求",
                    prop: "method",
                    data: [
                      {
                        label: "POST",
                        value: "post",
                      },
                      {
                        label: "GET",
                        value: "get",
                      },
                    ],
                  },
                  {
                    type: "textarea",
                    prop: "args",
                    label: "内容",
                  },
                  {
                    type: "input",
                    prop: "time",
                    label: "刷新时间",
                  },
                  {
                    type: "textarea",
                    prop: "script",
                    label: "脚本",
                  },
                ],
              },
            ],
          },
        ],
      };
      return oo;
    });

    watch(
      () => thatData.formData,
      (n, o) => {
        context.emit("input", n);
      }
    );

    return {
      ...toRefs(thatData),
      currentOption,
    };
  },
});
</script>
