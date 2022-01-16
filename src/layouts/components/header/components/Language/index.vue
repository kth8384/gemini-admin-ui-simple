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
    <div>
        <n-dropdown @select="changeLocale" trigger="hover" :options="options">
            <g-icon :size="iconSize" :icon="SysIcons.language" />
        </n-dropdown>
    </div>
</template>
<script setup lang="ts">
import { getAppConfig } from '@/config';
import { SysIcons } from '@/enum/iconEnum';
import { useSettingsStore } from '@/store/modules/settings';
import { useI18n } from 'vue-i18n';
const settings = useSettingsStore();
defineProps({
    iconSize: {
        type: Number,
        default: 14
    }
});
const options = computed(() => {
    return [
        {
            label: '中文',
            key: 'zh-CN',
            disabled: settings.lang && settings.lang == 'zh-CN'
        },
        {
            label: 'English',
            key: 'en-US',
            disabled: settings.lang && settings.lang == 'en-US'
        }
    ] as any;
})
//语言切换
const i18n = useI18n();
const currentRoute = useRoute();
const changeLocale = (key: string) => {
    i18n.locale.value = key.trim();
    settings.setLang(key.trim());
    const name = currentRoute.name as string;
    const trans = i18n.t("route." + name);
    const appName = getAppConfig().VITE_APP_NAME;
    useTitle(trans + "| " + appName);
};
</script>
<style lang="scss" scoped>
</style>
