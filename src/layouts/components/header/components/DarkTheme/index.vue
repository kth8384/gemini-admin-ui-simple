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
  <div @click.prevent="onThemeSwitch">
    <n-tooltip trigger="hover" placement="bottom-start">
      <template #trigger>
        <g-icon
          :color="settings.darkTheme ? '#ddd' : '#ffa600'"
          :size="iconSize"
          :icon="settings.darkTheme ? SysIcons.dark : SysIcons.light"
        />
      </template>
      {{ settings.darkTheme ? $t('ui.setting.lightText') : $t('ui.setting.darkText') }}
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { SysIcons } from "@/enum/iconEnum";
import { useSettingsStore } from "@/store/modules/settings";
defineProps({
  iconSize: {
    type: Number,
    default: 16,
  },
});
const settings = useSettingsStore();
//顶部的暗黑主题切换
const onThemeSwitch = () => {
  settings.setDarkTheme(!settings.darkTheme);
};
</script>
<style lang="css" scoped></style>
