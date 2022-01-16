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
  <div @click="onHandleSetting">
    <n-tooltip trigger="hover" placement="bottom-start">
      <template #trigger>
        <g-icon :icon="SysIcons.UiSetting" />
      </template>
      {{ $t("ui.header.setting") }}
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { SysIcons } from "@/enum/iconEnum";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
//点击打开设置按钮
const onHandleSetting = () => {
  console.log("打开设置抽屉");
  appStore.setShowSettingDrawer(true);
};
</script>
<style lang="scss" scoped></style>
