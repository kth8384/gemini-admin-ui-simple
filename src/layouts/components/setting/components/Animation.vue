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
    <n-divider title-placement="center">{{ $t("ui.setting.animated") }}</n-divider>
    <n-space justify="space-between">
        <span>{{ $t("ui.setting.animated") }}</span>
        <n-tooltip trigger="hover" placement="bottom-start">
            <template #trigger>
                <n-switch
                    :value="settings.animated"
                    size="small"
                    @update:value="(value: boolean) => settings.setAnimated(value)"
                />
            </template>
            {{ settings.animated ? $t("ui.setting.enabled") : $t("ui.setting.disabled") }}
        </n-tooltip>
    </n-space>
</template>
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings';
const settings = useSettingsStore();
</script>
<style lang="css" scoped></style>