<template>
  <box-form :option="currentOption" v-model="formData"></box-form>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  watch,
  toRefs,
} from "@vue/composition-api";

export default defineComponent({
  name: "Input",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const thatData = reactive({
      formData: props.value || {},
    });

    const currentOption = computed(() => {
      let oo = {
        items: [
          {
            type: "group",
            items: [
              {
                caption: "文本框",
                labelWidth: 50,
                items: [
                  {
                    type: "textarea",
                    label: "默认值",
                    prop: "value",
                  },
                  {
                    type: "textarea",
                    label: "提示",
                    prop: "placeholder",
                  },
                  {
                    type: "select",
                    label: "只读",
                    prop: "onlyready",
                    data: [
                      {
                        label: "是",
                        value: 1,
                      },
                      {
                        label: "否",
                        value: 0,
                      },
                    ],
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
