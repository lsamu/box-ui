<template>
  <div class="box-login">
    <el-form
      :model="form"
      ref="myform"
      label-suffix=":"
      label-width="100px"
      :width="currentOption.width"
    >
      <el-form-item
        :label="currentUserName.label || '用户名'"
        :rules="currentUserName.rules"
        v-if="!currentUserName.hide"
        prop="username"
      >
        <el-tooltip
          :content="currentUserName.tip"
          :disabled="currentUserName.tip === undefined"
          placement="top-start"
        >
          <el-input
            v-model="form.username"
            size="small"
            :prefix-icon="currentUserName.prefixIcon || 'el-icon-user'"
            :placeholder="currentUserName.placeholder || '请输入用户名'"
            :autocomplete="currentUserName.autocomplete"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        :label="currentPassword.label || '密码'"
        :rules="currentPassword.rules"
        v-if="!currentPassword.hide"
        prop="password"
      >
        <el-tooltip
          :content="currentPassword.tip"
          :disabled="currentPassword.tip === undefined"
          placement="top-start"
        >
          <el-input
            type="password"
            size="small"
            :prefix-icon="currentPassword.prefixIcon || 'el-icon-unlock'"
            :placeholder="currentPassword.placeholder || '请输入密码'"
            show-password
            v-model="form.password"
            :autocomplete="currentPassword.autocomplete"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        :label="currentCode.label || '验证码'"
        :rules="currentCode.rules"
        v-if="!currentCode.hide"
        prop="code"
      >
        <el-tooltip
          :content="currentCode.tip"
          :disabled="currentCode.tip === undefined"
          placement="top-start"
        >
          <el-input
            v-model="form.code"
            size="small"
            :prefix-icon="
              currentCode.prefixIcon || 'el-icon-c-scale-to-original'
            "
            :placeholder="currentCode.placeholder || '请输入验证码'"
            :autocomplete="currentCode.autocomplete"
          >
            <template slot="append">
              <span>
                <img
                  :src="currentCode.codesrc"
                  alt=""
                  @click="onRefresh"
                  width="80"
                  height="25"
                />
              </span>
            </template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item v-if="currentOption.remember" prop="remember">
        <el-checkbox v-model="form.remember"> 记住我 </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          class="box-login__submit"
          size="medium"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
  ref,
} from "@vue/composition-api";

export default defineComponent({
  name: "Login",
  components: {},
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      form: {
        username: "",
        password: "",
        code: "",
        remember: false,
      },
    });

    const nowtime = "";
    const TIP_TEXT = "{{time}}s后重获取";
    const text = "发送验证码";
    const check = {};
    const sendDisabled = false;

    const currentOption = computed(() => {
      const defaultOption = {
        remember: true,
        items: {},
      };
      let oo = Object.assign(defaultOption, props.option || {});
      return oo;
    });

    const currentUserName = computed(() => {
      const defaultOption = {};
      let oo = Object.assign(
        defaultOption,
        currentOption.value.items.username || {}
      );
      return oo;
    });

    const currentPassword = computed(() => {
      const defaultOption = {};
      let oo = Object.assign(
        defaultOption,
        currentOption.value.items.password || {}
      );
      return oo;
    });

    const currentCode: any = computed(() => {
      const defaultOption = {
        time: 60,
        codesrc: "#",
        hide: true,
      };
      let oo = Object.assign(
        defaultOption,
        currentOption.value.items.code || {}
      );
      return oo;
    });

    const onSubmit = function () {
      (that.$refs["myform"] as any).validate((valid) => {
        if (valid) {
          context.emit("submit", thatData.form);
        }
      });
    };

    const onSend = function () {};

    const onRefresh = function () {
      context.emit("refresh");
    };

    return {
      ...toRefs(thatData),
      currentOption,
      currentUserName,
      currentPassword,
      currentCode,
      onSubmit,
      onSend,
      onRefresh,
    };
  },
});
</script>
<style lang="scss">
.box-login {
  .el-form-item {
    margin-bottom: 18px;
  }
  .el-input-group__append {
    padding: 0;
    overflow: hidden;
  }
  &__send {
    min-width: 150px;
    box-sizing: border-box;
    &:hover {
      color: #c0c4cc !important;
      border-color: #ebeef5 !important;
      background-color: #f5f7fa !important;
    }
  }
  &__submit {
    width: 100%;
  }
}
</style>
