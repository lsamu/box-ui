<template>
  <box-group :option="currentOption" v-model="formData"></box-group>
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
  name: "Label",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption = computed(() => {
      let oo = {
        type: "group",
        items: [
          {
            caption: "文本",
            labelWidth: 80,
            hasFooter: false,
            items: [
              {
                type: "textarea",
                prop: "value",
                label: "文本",
                data: [],
              },
              {
                type: "input-number",
                prop: "size",
                label: "大小",
                controlsPosition: "right",
                data: [],
              },
              {
                type: "select",
                prop: "weight",
                label: "粗细",
                data: [
                  {
                    value: "normal",
                    label: "标准",
                  },
                  {
                    value: "bold",
                    label: "加粗",
                  },
                ],
              },
              {
                type: "slider",
                prop: "lineSpace",
                label: "行间距",
                data: [],
              },
              {
                type: "slider",
                prop: "wordSpace",
                label: "字间距",
                data: [],
              },
              {
                type: "select",
                prop: "align",
                label: "对齐",
                placeholder: "请选择对齐方式!",
                data: [
                  {
                    value: "1",
                    label: "居中",
                  },
                  {
                    value: "2",
                    label: "左对齐",
                  },
                  {
                    value: "3",
                    label: "右对齐",
                  },
                ],
              },
              {
                type: "input-color",
                prop: "color",
                label: "颜色",
                data: [],
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
