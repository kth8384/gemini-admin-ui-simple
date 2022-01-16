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
    <n-space vertical>
        <n-divider title-placement="center">{{ $t("ui.setting.uiStyle") }}</n-divider>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.showBanner") }}</span>
                </template>
                {{
                    settings.showBanner
                        ? $t("ui.setting.visiable")
                        : $t("ui.setting.invisiable")
                }}
            </n-tooltip>
            <n-switch
                :value="settings.showBanner"
                size="small"
                @update:value="(value: boolean) => settings.setShowBanner(value)"
            />
        </n-space>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.showTabs") }}</span>
                </template>
                {{
                    settings.showFooter
                        ? $t("ui.setting.visiable")
                        : $t("ui.setting.invisiable")
                }}
            </n-tooltip>
            <n-switch
                :value="settings.showTabsBar"
                size="small"
                @update:value="(value: boolean) => settings.setShowTabsBar(value)"
            />
        </n-space>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.showFooter") }}</span>
                </template>
                {{
                    settings.showFooter
                        ? $t("ui.setting.visiable")
                        : $t("ui.setting.invisiable")
                }}
            </n-tooltip>
            <n-switch
                :value="settings.showFooter"
                size="small"
                @update:value="(value: boolean) => settings.setShowFooter(value)"
            />
        </n-space>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.sideStyle") }}</span>
                </template>
                {{
                    settings.darkSider
                        ? $t("ui.setting.darkText")
                        : $t("ui.setting.lightText")
                }}
            </n-tooltip>
            <n-switch
                :disabled="settings.darkTheme && settings.darkSider"
                :value="settings.darkSider"
                size="small"
                @update:value="(value: boolean) => settings.setDarkSider(value)"
            />
        </n-space>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.headerStyle") }}</span>
                </template>
                {{
                    settings.darkHeader
                        ? $t("ui.setting.darkText")
                        : $t("ui.setting.lightText")
                }}
            </n-tooltip>
            <n-switch
                :disabled="settings.darkTheme"
                :value="settings.darkHeader"
                size="small"
                @update:value="(value: boolean) => settings.setDarkHeader(value)"
            />
        </n-space>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.darkFooter") }}</span>
                </template>
                {{
                    settings.darkFooter
                        ? $t("ui.setting.darkText")
                        : $t("ui.setting.lightText")
                }}
            </n-tooltip>
            <n-switch
                :disabled="!settings.showFooter || settings.darkTheme"
                :value="settings.darkFooter"
                size="small"
                @update:value="(value: boolean) => settings.setDarkFooter(value)"
            />
        </n-space>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.showBreadCrumb") }}</span>
                </template>
                {{
                    settings.showBreadCrumb
                        ? $t("ui.setting.visiable")
                        : $t("ui.setting.invisiable")
                }}
            </n-tooltip>
            <n-switch
                :value="settings.showBreadCrumb"
                size="small"
                @update:value="(value: boolean) => settings.setShowBreadCrumb(value)"
            />
        </n-space>

        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.expandMenuWidth") }}</span>
                </template>
                {{ $t("ui.setting.expandMenuWidth") }}
            </n-tooltip>
            <n-input-number
                :style="{ width: '100px' }"
                :min="100"
                :max="400"
                :step="10"
                :update-value-on-input="false"
                size="small"
                @update:value="(value: number) => settings.setSiderWidth(value)"
                v-model:value="settings.siderWidth"
            />
        </n-space>
        <n-space justify="space-between">
            <n-tooltip trigger="hover" placement="bottom-start">
                <template #trigger>
                    <span>{{ $t("ui.setting.collapedMenuWidth") }}</span>
                </template>
                {{ $t("ui.setting.collapedMenuWidth") }}
            </n-tooltip>
            <n-input-number
                :style="{ width: '100px' }"
                :min="30"
                :max="80"
                size="small"
                :update-value-on-input="false"
                :step="5"
                @update:value="(value: number) => settings.setSiderCollapsedWidth(value)"
                v-model:value="settings.siderCollapsedWidth"
            />
        </n-space>
    </n-space>
</template>
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings';

const settings = useSettingsStore();
</script>
<style lang="css" scoped>
</style>