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
  <n-layout position="absolute">
    <g-header></g-header>
    <n-layout has-sider position="absolute" class="layout-container">
      <g-sider></g-sider>
      <n-layout-content :native-scrollbar="false">
        <n-layout :native-scrollbar="false" position="absolute">
          <n-layout-header v-if="settings.showTabsBar" bordered>
            <g-tabs></g-tabs>
          </n-layout-header>
          <n-layout :native-scrollbar="false" position="absolute"
            :class="[settings.showTabsBar ? 'content' : '', settings.showFooter ? 'footer' : '']">
            <g-content></g-content>
            <n-back-top :right="40" :bottom="120" />
          </n-layout>
          <g-footer bordered position="absolute"></g-footer>
        </n-layout>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { getThemeConfig } from "@/config";
import { useSettingsStore } from "@/store/modules/settings";
import { GSider, GHeader, GFooter, GTabs, GContent } from "../components";
const settings = useSettingsStore();
const headerHeight = getThemeConfig().headerHeight;
const tabHeight = getThemeConfig().tabHeight;
const footerHeight = getThemeConfig().footerHeight;
</script>
<style lang="scss" scoped>
.layout-container {
  top: v-bind(headerHeight);
  margin-top: 1px;
}

.content {
  top: v-bind(tabHeight);
}

.footer {
  bottom: v-bind(footerHeight);
}
</style>
