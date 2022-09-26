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
      <footer-detail></footer-detail>
    </footer>
  </n-layout-footer>
</template>
<script setup lang="ts">
import { getThemeConfig } from '@/config';
import { useSettingsStore } from '@/store/modules/settings';
import FooterDetail from './FooterDetail.vue';
const settings = useSettingsStore();
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
