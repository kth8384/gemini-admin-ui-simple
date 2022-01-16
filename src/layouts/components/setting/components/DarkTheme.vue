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
    <n-divider title-placement="center">{{ $t("ui.setting.theme") }}</n-divider>
    <n-space justify="center">
        <n-tooltip placement="bottom">
            <template #trigger>
                <n-switch
                    class="theme-switch"
                    :value="settings.darkTheme"
                    @update:value="() => settings.setDarkTheme(!settings.getDarkTheme)"
                >
                    <template #checked>
                        <g-icon :icon="SysIcons.dark" />
                    </template>
                    <template #unchecked>
                        <g-icon color="#ffa600" :icon="SysIcons.light" />
                    </template>
                </n-switch>
            </template>
            {{ settings.darkTheme ? $t("ui.header.darkTheme") : $t("ui.header.lightTheme") }}
        </n-tooltip>
    </n-space>
</template>
<script setup lang="ts">
import { SysIcons } from "@/enum/iconEnum";
import { useSettingsStore } from "@/store/modules/settings";
const settings = useSettingsStore()
</script>
<style lang="css" scoped></style>