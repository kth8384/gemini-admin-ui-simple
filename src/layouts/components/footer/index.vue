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
  <n-layout-footer v-if="settings.showFooter" :inverted="settings.darkFooter">
    <footer class="footer-container">
      Copyright © {{ year }} {{ appName }} By:
      <n-a target="_blank" :href="packageJson.author.url">{{ packageJson.author.name }}</n-a>
    </footer>
  </n-layout-footer>
</template>
<script setup lang="ts">
import { getAppConfig, getThemeConfig } from '@/config';
import { useSettingsStore } from '@/store/modules/settings';
import packageJson from '../../../../package.json';
const year = new Date().getFullYear();
const settings = useSettingsStore();
const appName = getAppConfig().VITE_APP_NAME;
const footerHeight = getThemeConfig().footerHeight
</script>
<style lang="scss" scoped>
.footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind(footerHeight);
}
</style>
