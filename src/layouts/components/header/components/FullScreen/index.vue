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
  <div @click="onClick">
    <n-tooltip trigger="hover" placement="bottom-start">
      <template #trigger>
        <g-icon :icon="isFullscreen ? SysIcons.ExitFullScreen : SysIcons.fullScreen"></g-icon>
      </template>
      {{ isFullscreen ? $t('ui.setting.exitFullscreen') : $t('ui.setting.fullscreen') }}
    </n-tooltip>
  </div>
</template>
<script setup lang="ts">
import eventEnum from "@/enum/eventEnum";
import { SysIcons } from "@/enum/iconEnum";
const { isFullscreen, toggle } = useFullscreen();
defineProps({
  iconSize: {
    type: Number,
    default: 14,
  },
});
const onClick = () => {
  toggle();
  window.$bus.emit(eventEnum.toggleFullScreen, isFullscreen);
};
</script>
<style lang="css" scoped>
</style>
