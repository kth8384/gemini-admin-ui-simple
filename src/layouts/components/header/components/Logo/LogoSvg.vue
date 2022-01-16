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
  <svg class="logo-svg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <circle cx="512" cy="512" r="512" />
    <path
      d="M726.5 413.3H454.9c9.8-67.2 67.3-117.2 135.8-117.2 68.4 0 125.9 50 135.8 117.2zm-155.9 40.1v117.2H453.4V453.4h117.2zm-1.5 157.3c-9.8 67.2-67.3 117.2-135.8 117.2-68.5 0-126-50-135.8-117.2h271.6zm-271.6-40.1c8.8-59.4 56.3-107 115.8-115.7v115.7H297.5zm429-117.2c-8.8 59.4-56.3 107-115.7 115.7V453.4h115.7zM590.7 256c-90 0-166.7 69.3-176.3 158.4-89.2 9.5-158.4 86.2-158.4 176.3 0 97.8 79.6 177.4 177.4 177.4 90 0 166.8-69.3 176.3-158.4 89.1-9.6 158.4-86.3 158.4-176.3C768 335.5 688.5 256 590.7 256z"
    />
  </svg>
</template>
<script setup lang="ts">
import { getThemeConfig } from "@/config";
import { useSettingsStore } from "@/store/modules/settings";
import { useThemeVars } from "naive-ui";
import { computed } from "vue";
const themeVars = useThemeVars();
const settings = useSettingsStore();

const props = defineProps({
  circleColor: {
    type: String,
    default: "transparent",
  },
  pathColor: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
  },
});
// 动态改变头像大小;
let imgSize = computed(() => (props.size || settings.siderCollapsedWidth) + "px");

const pathColor = computed(() => {
  return props.pathColor ? props.pathColor : settings.getPrimaryColor;
});
const circleColor = computed(() => {
  return props.circleColor ? props.circleColor : themeVars.value.baseColor;
});
const headerHeight = getThemeConfig().headerHeight;
</script>
<style lang="scss" scoped>
.logo-svg {
  display: inline-block;
  overflow: hidden;
  fill: currentColor;
  max-height: v-bind(headerHeight);
  width: v-bind(imgSize);
  & path {
    fill: v-bind(pathColor);
  }
  & circle {
    fill: v-bind(circleColor);
  }
}
</style>
