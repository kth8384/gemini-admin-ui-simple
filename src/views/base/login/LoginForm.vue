<!--
  - /*
  -  *    Copyright 2020-2021 Luter.me
  -  *
  -  *    Licensed under the Apache License, Version 2.0 (the "License");
  -  *    you may not use this file except in compliance with the License.
  -  *    You may obtain a copy of the License at
  -  *
  -  *      http://www.apache.org/licenses/LICENSE-2.0
  -  *
  -  *    Unless required by applicable law or agreed to in writing, software
  -  *    distributed under the License is distributed on an "AS IS" BASIS,
  -  *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  *    See the License for the specific language governing permissions and
  -  *    limitations under the License.
  -  */
  -->

<template>
  <n-card v-if="isShow" embedded :bordered="false" class="animate__animated animate__slideInLeft animate__faster ">
    <template #header>
      <n-h1>{{ $t("views.login.title") }}</n-h1>
    </template>
    <template #header-extra>~~</template>
    <n-form label-placement="left" :label-width="80" :model="data.form.data" :rules="data.form.rules" size="large"
      ref="loginFormRef">
      <n-form-item path="username">
        <n-input type="text" autofocus clearable v-model:value="data.form.data.username"
          :placeholder="$t('views.login.form.label.username')" @keyup.enter="handleLoginBtnClick" />
      </n-form-item>
      <n-form-item path="password">
        <n-input clearable type="password" v-model:value="data.form.data.password" show-password-on="click"
          @keydown.enter.prevent :placeholder="$t('views.login.form.label.password')"
          @keyup.enter="handleLoginBtnClick" />
      </n-form-item>
      <n-form-item>
        <n-input-group>
          <n-input :placeholder="$t('views.login.form.label.captcha')" :style="{ width: '70%' }"
            v-model:value="data.form.data.captcha" />
          <img class="hand" @click="onCaptcha" :style="{ width: '30%' }" src="/static/images/captcha.jpeg" height="40"
            width="160" />
        </n-input-group>
      </n-form-item>
    </n-form>
    <template #footer>
      <n-space justify="space-between">
        <n-checkbox v-model:checked="data.form.data.rememberMe">{{ $t("views.login.form.rememberMe") }}</n-checkbox>
        <n-button text>{{ $t("views.login.forgotPassword") }}</n-button>
      </n-space>
      <n-row class="mt" :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button block type="success" @click="handleLoginBtnClick" attr-type="button">{{
                $t("views.login.form.label.loginBtnText")
            }}</n-button>
          </div>
        </n-col>
      </n-row>
      <n-space class="mt" justify="space-around">
        <n-button ghost size="small" type="primary">{{ $t("views.login.form.loginByMobile") }}</n-button>
        <n-button ghost size="small" type="primary">{{ $t("views.login.form.loginByQrcode") }}</n-button>
        <n-button @click.prevent="setLoginState(LoginStateEnum.REGISTER)" size="small" ghost type="primary">{{
            $t("views.login.form.register")
        }}</n-button>
      </n-space>
    </template>
  </n-card>
</template>
<script setup lang="ts">
import "animate.css"
import { useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/store/modules/user";
import { useLoginState, LoginStateEnum } from "./index";
import config from "@/config";
const { setLoginState, getLoginState } = useLoginState();
const isShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
const message = useMessage();
const { t } = useI18n();
const data = reactive({
  redirect: "",
  form: {
    data: {
      username: "luter",
      password: "123456",
      rememberMe: false,
      captcha: "abcd",
    },
    rules: {
      username: {
        required: true,
        message: t("views.login.form.userNameNotNull"),
        trigger: ["input"],
      },
      password: {
        required: true,
        message: t("views.login.form.passwordNotnull"),
        trigger: ["input"],
      },
    },
  },
});
const loginFormRef = ref();
const router = useRouter();
const userStore = useUserStore();
const handleLoginBtnClick = async (e: any) => {
  e.preventDefault();
  loginFormRef.value.validate(async (errors: any) => {
    if (!errors) {
      try {
        await userStore.login(
          Object.assign(data.form.data, { redirect: data.redirect })
        );
        const routerPath = data.redirect ? data.redirect : config.app.PAGE_HOME_PATH;
        console.error("登录成功，跳转页面", routerPath);
        router
          .push({ path: routerPath })
          .then(() => {
            window.$notify.success({
              content: t("views.login.success"),
              duration: 3000,
              closable: true,
              meta: t("views.login.wellcome") + userStore.getUser?.username,
            });
          })
          .catch((error) => {
            console.error("登录成功后跳页面出错了", routerPath);
          });
      } catch (error: any) {
        console.log("登录页面错误", error);
        message.error(error.msg);
      }
    } else {
      console.log("errors", errors);
    }
  });
};

const onCaptcha = () => {
  message.info("获取图形验证码");
};
///监听路由变化
const route = useRoute();
watch(
  () => route.path,
  (to) => {
    data.redirect = ((route.query && route.query.redirect) || "/") as string;
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
</style>
