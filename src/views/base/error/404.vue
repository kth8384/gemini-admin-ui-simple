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
  <n-layout class="layout-container">
    <div class="not-found">
      <img height="400" :src="images[Math.floor(Math.random() * images.length)]" />
      <n-h3 align-text type="error">
        <n-text type="error">{{ $t("page.NotFound.text") }}</n-text>
      </n-h3>
      <n-button type="primary" size="medium" @click="toHome">{{ $t("common.backToHome") }}</n-button>
    </div>
  </n-layout>
</template>

<script setup lang="ts">import config from '@/config';

const router = useRouter();
const toHome = () => {
  router.replace({ name: config.app.PAGE_HOME_NAME });
};
const images: string[] = [
  "/static/images/404/1.svg",
  "/static/images/404/2.svg",
  "/static/images/404/3.svg",
  "/static/images/404/4.svg",
  "/static/images/404/5.svg",
  "/static/images/404/6.svg",
  "/static/images/404/8.svg",
  "/static/images/404/9.svg",
  "/static/images/404/10.svg",
];
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .not-found {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100;
  }
}
</style>
