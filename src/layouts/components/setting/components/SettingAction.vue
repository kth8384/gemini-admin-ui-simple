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
        <n-popconfirm @positive-click="handleResetSetting">
            <template #trigger>
                <n-button class="mt-sm" block type="primary">
                    <template #icon>
                        <g-icon :icon="SysIcons.redo"></g-icon>
                    </template>
                    {{ $t('ui.setting.resetConfig') }}
                </n-button>
            </template>
            {{ $t('ui.setting.resetConfig') }}
        </n-popconfirm>
        <n-popconfirm @positive-click="handleResetAndReLogin">
            <template #trigger>
                <n-button block type="warning">
                    <template #icon>
                        <g-icon :icon="SysIcons.refresh"></g-icon>
                    </template>
                    {{ $t('ui.setting.clearCache') }}
                </n-button>
            </template>
            {{ $t('ui.setting.clearCache') }}
        </n-popconfirm>
    </n-space>
</template>
<script setup lang="ts">
import { SysIcons } from "@/enum/iconEnum";
import { useSweetAlert } from "@/hooks/useSweetAlert";
import { useSettingsStore } from "@/store/modules/settings";
import { useUserStore } from "@/store/modules/user";
const settings = useSettingsStore();
const userStore = useUserStore()
const { toast } = useSweetAlert()
//重置
const handleResetSetting = () => {
    settings.resetSettings();
    toast('重设成功')
};
//重置并且重新登录
const handleResetAndReLogin = async () => {
    settings.removeSettings();
    await userStore.logout()
    window.location.reload()
};
</script>
<style lang="scss" scoped></style>