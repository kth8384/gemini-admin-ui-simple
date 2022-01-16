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

<!--  -->
<template>
  <div v-if="isShow">
    <n-space vertical>
      <n-h1>我注册</n-h1>
      <n-form>
        <n-form-item label="用户名">
          <n-input @keydown.enter.prevent />
        </n-form-item>
        <n-form-item label="密码">
          <n-input show-password-on="click" type="password" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item first label="重复密码">
          <n-input type="password" @keydown.enter.prevent />
        </n-form-item>
        <n-space justify="space-between">
          <n-button
            text
            type="primary"
            size="medium"
            @click="setLoginState(LoginStateEnum.LOGIN)"
          >已有账号?</n-button>
          <n-button type="primary">注册</n-button>
        </n-space>
      </n-form>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { useLoginState, LoginStateEnum } from './index';
const { setLoginState, getLoginState } = useLoginState();
const isShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);
</script>
<style lang="css" scoped></style>
