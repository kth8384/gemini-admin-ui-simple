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
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="settings.siderCollapsedWidth"
    :width="settings.siderWidth"
    show-trigger
    :native-scrollbar="false"
    :collapsed="settings.getSiderCollapsed"
    @update:collapsed="(value: boolean) => settings.setSiderCollapsed(value)"
    :inverted="settings.darkSider"
  >
    <g-menu :inverted="settings.darkSider"></g-menu>
  </n-layout-sider>
</template>
<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings";
import { GMenu } from "..";
const settings = useSettingsStore();
</script>
<style lang="css" scoped></style>
