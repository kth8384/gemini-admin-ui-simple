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
    <n-drawer
        @update:show="(value: boolean) => appStore.setShowSettingDrawer(value)"
        v-model:show="showSetting"
        mask-closable
        :width="width"
    >
        <n-drawer-content class="setting-drawer" closable :title="$t('ui.setting.title')">
            <g-dark-theme></g-dark-theme>
            <g-layout-setting></g-layout-setting>
            <g-palette></g-palette>
            <g-ui-setting></g-ui-setting>
            <g-animation></g-animation>
            <g-setting-action></g-setting-action>
        </n-drawer-content>
    </n-drawer>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { GLayoutSetting, GPalette, GDarkTheme, GUiSetting, GAnimation, GSettingAction } from './components';
const appStore = useAppStore();

const showSetting = computed(() => appStore.showSettingDrawer);
defineProps({
    width: {
        type: Number,
        default: 400,
    },
});
</script>
<style lang="scss">
.setting-drawer {
    .n-divider:not(.n-divider--vertical) {
        margin: var(--base-padding) 0;
    }
    .n-space {
        span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 500;
        }
    }
    .theme-switch {
        .n-switch__rail {
            background-color: #000 !important;
        }
    }
}
</style>