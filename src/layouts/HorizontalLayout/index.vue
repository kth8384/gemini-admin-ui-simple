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
    <n-layout-header
      :native-scrollbar="false"
      :inverted="settings.darkHeader"
      bordered
      class="header"
    >
      <div v-if="settings.showBanner" class="header-left">
        <g-banner></g-banner>
      </div>
      <div class="header-center">
        <g-menu :inverted="settings.darkHeader" dropdown-placement="bottom" mode="horizontal"></g-menu>
      </div>
      <div class="header-right">
        <g-header hide-left></g-header>
      </div>
    </n-layout-header>
    <n-layout :native-scrollbar="false" position="absolute" class="content">
      <n-layout :native-scrollbar="false" position="absolute">
        <n-layout-header v-if="settings.showTabsBar" bordered>
          <g-tabs></g-tabs>
        </n-layout-header>
        <n-layout
          :native-scrollbar="false"
          position="absolute"
          :class="[settings.showTabsBar ? 'wrapper' : '', settings.showFooter ? 'footer' : '']"
        >
          <g-content></g-content>
          <n-back-top :right="40" :bottom="120" />
        </n-layout>
      </n-layout>
    </n-layout>
    <g-footer position="absolute"></g-footer>
  </n-layout>
</template>
<script setup lang="ts">
import { getThemeConfig } from '@/config';
import { useSettingsStore } from '@/store/modules/settings';
import { GBanner, GMenu, GHeader, GTabs, GFooter, GContent } from '../components'
const settings = useSettingsStore();
const headerHeight = getThemeConfig().headerHeight;
const tabHeight = getThemeConfig().tabHeight;
const footerHeight = getThemeConfig().footerHeight;
</script>
<style lang="scss" scoped>
@mixin flexCenter {
  display: flex;
  align-items: center;
}
.header {
  display: flex;
  width: 100%;
  height: v-bind(headerHeight);
  &-left {
    @include flexCenter();
    flex: 1;
  }
  &-center {
    margin-left: calc($base-width * 2);
    flex: 8;
    @include flexCenter();
  }
  &-right {
    flex: 3;
    @include flexCenter();
  }
}
.content {
  top: v-bind(headerHeight);
  .wrapper {
    top: v-bind(tabHeight);
  }
  .footer {
    bottom: v-bind(footerHeight);
  }
}
</style>
