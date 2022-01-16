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
  <component :is="layoutComponents[settings.layout]" />
  <g-setting :width="width"></g-setting>
  <setting-button :width="width"></setting-button>
</template>

<script setup lang="ts">
import { VertitalLayout, MixVertitalLayout, HorizontalLayout, GallaryVerticalLayout } from "./index";
import { LayoutComponent } from "@/enum/layoutEnum";
import { useSettingsStore } from "@/store/modules/settings";
import { GSetting } from "./components";
import SettingButton from "./components/setting/components/SettingButton.vue";
import { getThemeConfig } from "@/config";
const settings = useSettingsStore();
const width = getThemeConfig().settingDrawerWidth;
const layoutComponents: LayoutComponent = {
  vertical: VertitalLayout,
  mixVertical: MixVertitalLayout,
  horizontal: HorizontalLayout,
  gallary: GallaryVerticalLayout
};
//屏幕大小改变，发出对应事件
const watchWidth = useDebounceFn(() => {
  const clientWidth = document.body.clientWidth;
  if (clientWidth <= 950) {
    settings.setSiderCollapsed(true);
  } else {
    settings.setSiderCollapsed(false);
  }
}, 100);
useEventListener(window, "resize", watchWidth);
</script>
<style lang="scss" scoped></style>
