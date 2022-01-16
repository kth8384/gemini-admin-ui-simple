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
    <n-el>
        <n-divider title-placement="center">{{ $t("ui.setting.palette") }}</n-divider>
        <div class="setting-palette">
            <span>Primary 色</span>
            <n-color-picker
                style="width: 100px"
                :value="settings.primaryColor"
                @update:value="(color) => settings.setPrimaryColor(color)"
                :show-alpha="false"
                :swatches="swatches"
            />
        </div>
        <div class="setting-palette">
            <span>Info 色</span>
            <n-color-picker
                style="width: 100px"
                :value="settings.infoColor"
                @update:value="(color) => settings.setInfoColor(color)"
                :show-alpha="false"
                :swatches="swatches"
            />
        </div>
        <div class="setting-palette">
            <span>Success 色</span>
            <n-color-picker
                style="width: 100px"
                :value="settings.successColor"
                @update:value="(color) => settings.setSuccessColor(color)"
                :show-alpha="false"
                :swatches="swatches"
            />
        </div>
        <div class="setting-palette">
            <span>Warning 色</span>
            <n-color-picker
                style="width: 100px"
                :value="settings.warningColor"
                @update:value="(color) => settings.setWarningColor(color)"
                :show-alpha="false"
                :swatches="swatches"
            />
        </div>
        <div class="setting-palette">
            <span>Error 色</span>
            <n-color-picker
                style="width: 100px"
                :value="settings.errorColor"
                @update:value="(color) => settings.setErrorColor(color)"
                :show-alpha="false"
                :swatches="swatches"
            />
        </div>
    </n-el>
</template>
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings';
const swatches = ['#009688',
    '#2d8cf0',
    '#536dfe',
    '#ff5c93',
    '#ee4f12',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#0960bd',
    '#000000',
    '#f0ff00',
    '#0084f4',
    '#0096c7',
    '#9c27b0',
    '#88ffdd',
    '#ff9800',]
const settings = useSettingsStore();
</script>
<style lang="scss" scoped>
.setting-palette {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
        font-weight: 900;
    }
}
</style>