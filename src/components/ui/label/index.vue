<template>
  <div
    :style="
      'width:100%;height:100%;word-break: break-all;text-align:' +
      currentOption.alignHorizontal +
      ';display: table-cell;vertical-align:' +
      currentOption.alignVertical +
      ';color:' +
      currentOption.color +
      ';background-color:' +
      currentOption.backGroundColor +
      ';background-image:url(' +
      currentOption.backGroundImg +
      ');font-weight:' +
      currentOption.weight +
      ';font-style:' +
      currentOption.style +
      ';letter-spacing:' +
      currentOption.wordSpace +
      'px;line-height:' +
      currentOption.lineSpace +
      'px;font-size:' +
      currentOption.size +
      'px;'
    "
  >
    {{ toFormat(formData, currentOption) }}
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
import Enumerable from "linq";

export default defineComponent({
  name: "Label",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value || "文本",
    });

    const currentOption = computed(() => {
      const defaultOption = {
        size: 14, //大小
        alignHorizontal: "center", //水平位置
        alignVertical: "middle", //水平位置
        weight: null, //加粗 normal bold bolder lighter 100 200 300 400 500 600 700 800 900
        style: null, //字体样式 normal，italic，oblique
        color: null, //颜色 red yellow
        lineSpace: null, //行间距 20px
        wordSpace: null, //字间距  20px
        wordWrap: true, //换行
        backGroundColor: null, //背景颜色 red yellow
        backGroundImg: null, //背景图片 https://p0.ssl.qhimgs1.com/sdr/400__/t0196e43481af4a1f0a.jpg
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const toFormat = function (val, aa) {
      let tempVal = val;
      if (aa != undefined && aa.data != undefined) {
        let bb = Enumerable.from(aa.data).firstOrDefault(
          (p) => p.value == tempVal
        );
        if (bb != null) {
          tempVal = (bb as any).label;
        }
      }
      return tempVal;
    };

    return {
      ...toRefs(thatData),
      currentOption,
      toFormat,
    };
  },
});
</script>
