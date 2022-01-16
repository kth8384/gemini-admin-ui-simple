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
    <n-el
        @click="onShowSetting"
        :style="{ right: appStore.showSettingDrawer ? width + 'px' : '0', top: topPercent }"
        class="setting-drawer-button"
    >
        <n-tooltip placement="left" trigger="hover">
            <template #trigger>
                <g-icon
                    color="#fff"
                    :size="18"
                    :icon="appStore.showSettingDrawer ? SysIcons.close : SysIcons.UiSetting"
                ></g-icon>
            </template>
            {{ $t('ui.common.settings') }}
        </n-tooltip>
    </n-el>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { SysIcons } from '@/enum/iconEnum';
const appStore = useAppStore();
const onShowSetting = () => {
    appStore.setShowSettingDrawer(!appStore.showSettingDrawer);
}
const props = defineProps({
    //弹出后按钮距离右侧宽度，这与 drawer 宽度一样
    width: {
        type: Number,
        default: 300,
    },
    //按钮距离顶部距离
    top: {
        type: [Number, String],
        default: '40%',
    }
})
let t = `${props.top}`;
const topPercent = computed(() => `${t.replace('%', '')}%`)
</script>
<style lang="scss" scoped>
.setting-drawer-button {
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10000;
    width: 32px;
    height: 32px;
    right: 5px;
    position: fixed;
    cursor: pointer;
    border-radius: calc($base-width / 2);
    background-color: var(--primary-color);
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}
</style>