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
  <div v-if="settings.showBanner" class="sider-banner">
    <g-logo v-if="!hideLogo"></g-logo>
    <g-title v-if="!hideTitle"></g-title>
  </div>
</template>

<script setup lang="ts">
import { getThemeConfig } from "@/config";
import { useSettingsStore } from "@/store/modules/settings";
import { propDefine } from "@/utils/propsDefine";
import { GLogo, GTitle } from "../header/components";
const settings = useSettingsStore();
defineProps({
  hideLogo: propDefine.bool.def(false),
  hideTitle: propDefine.bool.def(false)
})
const bannerHeight = getThemeConfig().bannerHeight;
</script>
<style lang="scss" scoped>
.sider-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: v-bind(bannerHeight);
  white-space: nowrap;
}
</style>
