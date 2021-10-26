<template>
  <div class="ck-content">
    <ckeditor
      :config="editorConfig"
      v-model="dataValue"
      :editor-url="editorUrl"
    ></ckeditor>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  reactive,
  ref,
  watch,
  watchEffect,
} from "@vue/composition-api";
import CKEditor from "ckeditor4-vue";
export default defineComponent({
  name: "Ckeditor",
  components: {
    ckeditor: CKEditor.component,
  },
  props: ["option", "value"],
  setup(props, context) {
    // const { value, option } = reactive(props);
    const editorConfig = {
      language: "zh-cn",
      toolbar: [
        {
          name: "document",
          items: ["Print"],
        },
        {
          name: "clipboard",
          items: ["Undo", "Redo"],
        },
        {
          name: "styles",
          items: ["Format", "Font", "FontSize"],
        },
        {
          name: "colors",
          items: ["TextColor", "BGColor"],
        },
        {
          name: "align",
          items: [
            "JustifyLeft",
            "JustifyCenter",
            "JustifyRight",
            "JustifyBlock",
          ],
        },
        "/",
        {
          name: "basicstyles",
          items: [
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "RemoveFormat",
            "CopyFormatting",
          ],
        },
        {
          name: "links",
          items: ["Link", "Unlink"],
        },
        {
          name: "paragraph",
          items: [
            "NumberedList",
            "BulletedList",
            "-",
            "Outdent",
            "Indent",
            "-",
            "Blockquote",
          ],
        },
        {
          name: "insert",
          items: ["Image", "Table"],
        },
        {
          name: "tools",
          items: ["Maximize"],
        },
        {
          name: "editing",
          items: ["Scayt"],
        },
        {
          name: "source",
          items: ["Source"],
        },
      ],

      extraAllowedContent:
        "h3{clear};h2{line-height};h2 h3{margin-left,margin-top}",
      // Adding drag and drop image upload.
      extraPlugins: "print,format,font,colorbutton,justify,uploadimage,divarea",
      //uploadUrl: _this.apiUrl+"/system/upload/ckEditorUp?command=QuickUpload&type=Files&token="+encodeURIComponent(getToken()),
      //// Configure your file manager integration. This example uses CKFinder 3 for PHP.
      ////filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
      ////filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      //filebrowserUploadUrl: _this.apiUrl+"/system/upload/ckEditorUp?command=QuickUpload&type=Files&token="+encodeURIComponent(getToken()),
      //filebrowserImageUploadUrl: _this.apiUrl+"/system/upload/ckEditorUp?command=QuickUpload&type=Images&token="+encodeURIComponent(getToken()),
      width: "auto",
      height: 420,
      removeDialogTabs: "image:advanced;link:advanced",
    };
    let editorUrl = undefined; //process.env.BASE_URL + "static/ckeditor/ckeditor.js";
    if (props.option != null && props.option.baseURL != null) {
      //editorUrl = props.option.baseURL;
      //editorUrl = process.env.BASE_URL + "static/ckeditor/ckeditor.js";
      editorUrl = process.env.BASE_URL + props.option.baseURL;
    }
    const dataValue = ref(props.value);

    watch(
      () => dataValue.value,
      (n, o) => {
        nextTick(() => {
          context.emit("input", dataValue.value);
        });
      }
    );

    return { editorConfig, editorUrl, dataValue };
  },
});
</script>
<style lang="scss">
.ck-content {
  font-family: 微软雅黑 宋体;
  font-size: 14px;
}
.ck-content p {
  margin: 0 0 6px 0;
  line-height: 22px;
  text-indent: 2em;
}
</style>
