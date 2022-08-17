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
    <n-layout has-sider position="absolute">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="settings.siderCollapsedWidth"
        :width="settings.siderWidth"
        show-trigger
        :inverted="settings.darkSider"
        :native-scrollbar="false"
        :collapsed="settings.getSiderCollapsed"
        @update:collapsed="(value: boolean) => settings.setSiderCollapsed(value)"
      >
        <g-banner :hide-title="settings.siderCollapsed"></g-banner>
        <g-menu :inverted="settings.darkSider"></g-menu>
      </n-layout-sider>
      <n-layout-content>
        <n-layout :native-scrollbar="false" position="absolute">
          <g-header :hide-logo="true" :hide-bread-crum="false" :hide-title="true"></g-header>
          <n-layout position="absolute" class="main-layout">
            <n-layout position="absolute">
              <n-layout-header v-if="settings.showTabsBar" bordered>
                <g-tabs></g-tabs>
              </n-layout-header>
              <n-layout
                :native-scrollbar="false"
                position="absolute"
                :class="[settings.showTabsBar ? 'content' : '', settings.showFooter ? 'footer' : '']"
              >
                <g-content></g-content>
                <n-back-top :right="40" :bottom="120" />
              </n-layout>
            </n-layout>
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
import { GMenu, GBanner, GHeader, GTabs, GFooter, GContent } from "../components";
const settings = useSettingsStore();
const headerHeight = getThemeConfig().headerHeight;
const tabHeight = getThemeConfig().tabHeight;
const footerHeight = getThemeConfig().footerHeight;
</script>
<style lang="scss" scoped>
.main-layout {
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
