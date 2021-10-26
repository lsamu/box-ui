<template>
  <div class="box-upload-more">
    <el-upload
      class="avatar-uploader"
      :action="currentOption.url"
      :headers="currentOption.headers"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeupload"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :limit="5"
      :name="currentOption.name"
    >
      <div slot="file" slot-scope="{ file }">
        <el-avatar
          shape="square"
          :size="148"
          fit="fill"
          :src="file.url"
        ></el-avatar>
        <span class="el-upload-list__item-actions">
          <div style="margin-top: 30px; display: block">
            <span
              class="el-upload-list__item-preview"
              @click="uploadCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="pictureRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </div>
          <span
            class="el-upload-list__item-delete"
            @click="uploadSetDefault(file)"
          >
            <span
              style="border: 1px solid #fff; font-size: 14px; padding: 0 5px"
              >设为默认</span
            >
          </span>
        </span>
      </div>
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
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
import {MessageBox} from 'element-ui'

export default defineComponent({
  name: "Upload",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: {},
      uploadMorePic: [], //多图上传数组
      dialogImageUrl: "", //预览图地址
      dialogVisible: false, //预览弹窗
      fileList: props.value || [],
    });

    //选项
    const currentOption = computed(() => {
      const defaultOption = {
        limit: 1,
        url: "#", //上传地址
        name: "file_name", //上传表单名称
        onSuccess: null,
        onError: null,
        headers: null,
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    //上传图片前限制限制大小2M 内
    const beforeupload = function (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        MessageBox({
          message: "上传文件大小不能超过 2MB!",
          type: "warning",
        });
        return false;
      }
    };
    //图片上传成功
    const uploadSuccess = function (res, file, list) {
      if (currentOption.value.onSuccess != null) {
        currentOption.value.onSuccess(res, file);
      }
    };
    //图片上传失败
    const uploadFail = function (res, file, fileList) {
      MessageBox({
        message: res.msg,
        type: "error",
      });
    };
    //预览图片
    const uploadCardPreview = function (file) {
      thatData.dialogImageUrl = file.url;
      thatData.dialogVisible = true;
    };
    //删除图片
    const pictureRemove = function (file) {
      thatData.fileList = thatData.fileList.filter((ele) => {
        return file.url != ele.url;
      });
    };
    //设为默认
    const uploadSetDefault = function (file) {
      Enumerable.from(thatData.fileList).forEach((p) => {
        p["default"] = 0;
      });
      let aa = Enumerable.from(thatData.fileList).firstOrDefault(
        (p) => p["url"] == file.url
      );
      aa["default"] = 1;
      that.$emit("onDefault", aa);
      if (currentOption.value.onDefault != null) {
        currentOption.value.onDefault(aa, thatData.fileList);
      }
    };

    //更新集合
    const updateModel = function (
      name: string,
      filePath: string,
      isDefault: boolean = false
    ) {
      thatData.fileList.push({
        name: name,
        url: filePath,
        default: isDefault ? 1 : 0,
      });
      that.$emit("input", thatData.fileList);
    };

    return {
      ...toRefs(thatData),
      currentOption,
      beforeupload,
      uploadSuccess,
      uploadFail,
      uploadCardPreview,
      pictureRemove,
      uploadSetDefault,
      updateModel,
    };
  },
});
/*

  
}*/
</script>
<style lang="less">
.box-upload-more {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions::after {
    height: auto;
  }
}
</style>
