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
  <n-layout-header bordered :inverted="settings.darkHeader">
    <n-el class="layout-header">
      <div v-if="!hideLeft" class="left">
        <g-logo v-if="!hideLogo"></g-logo>
        <g-title v-if="!hideTitle"></g-title>
        <g-bread-crum v-if="!hideBreadCrum"></g-bread-crum>
      </div>
      <div v-if="!hideRight" class="right">
        <g-full-screen class="item"></g-full-screen>
        <g-lock-screen class="item"></g-lock-screen>
        <g-messages class="item"></g-messages>
        <g-dark-theme class="item"></g-dark-theme>
        <g-language class="item"></g-language>
        <g-user-info class="item"></g-user-info>
        <g-setting-icon class="item"></g-setting-icon>
      </div>
    </n-el>
  </n-layout-header>
</template>
<script setup lang="ts">
import { getThemeConfig } from "@/config";
import { useSettingsStore } from "@/store/modules/settings";
import { propDefine } from "@/utils/propsDefine";
import {
  GLogo,
  GTitle,
  GFullScreen,
  GSettingIcon,
  GUserInfo,
  GDarkTheme,
  GBreadCrum,
  GMessages,
  GLanguage,
  GLockScreen
} from "../header/components";
const settings = useSettingsStore();
defineProps({
  hideLogo: propDefine.bool.def(false),
  hideTitle: propDefine.bool.def(false),
  hideBreadCrum: propDefine.bool.def(false),
  hideLeft: propDefine.bool.def(false),
  hideRight: propDefine.bool.def(false),
});
const headerHeight = getThemeConfig().headerHeight
</script>
<style lang="scss" scoped>
.layout-header {
  display: flex;
  align-items: center;
  height: v-bind(headerHeight);

  .left {
    height: v-bind(headerHeight);
    display: flex;
    align-items: center;
    flex: 1;
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: v-bind(headerHeight);

    .item {
      width: 30px;
      height: 100%;
      display: flex;
      padding: 0 5px 0 5px;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        background: var(--hover-color);
      }
    }
  }
}
</style>
