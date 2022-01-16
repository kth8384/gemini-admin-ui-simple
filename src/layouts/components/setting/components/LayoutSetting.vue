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
        <n-divider title-placement="center">{{ $t("ui.setting.layout.setting") }}</n-divider>
        <n-el class="layout-model">
            <n-tooltip v-for="item in layouts" :key="item[0]" trigger="hover">
                <template #trigger>
                    <div
                        @click.stop="settings.setLayout(item[0])"
                        :class="'layout-' + item[0], settings.layout == item[0] ? 'active' : ''"
                        class="ml hand"
                    >
                        <div class="left-top"></div>
                        <div class="right-bottom"></div>
                    </div>
                </template>
                {{ $t('ui.setting.layout.' + item[0]) }}
            </n-tooltip>
        </n-el>
    </n-space>
</template>
<script setup lang="ts">
import { LayoutMode } from '@/enum/layoutEnum';
import { useSettingsStore } from '@/store/modules/settings';
const settings = useSettingsStore();
const layouts = Object.entries(LayoutMode);
</script>
<style lang="scss" scoped>
.layout-model {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .layout-mixVertical {
        box-shadow: 0 1px 2.5px #0000002e;
        width: 56px;
        position: relative;
        overflow: hidden;
        height: 48px;
        border-radius: 4px;
        --tw-bg-opacity: 1;
        background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
        .left-top {
            width: 100%;
            height: 25%;
            --tw-bg-opacity: 1;
            background-color: rgba(39, 51, 82, var(--tw-bg-opacity));
            position: absolute;
            left: 0px;
            top: 0px;
        }
        .right-bottom {
            width: 70%;
            height: 75%;
            --tw-bg-opacity: 1;
            background-color: rgba(240, 242, 245, var(--tw-bg-opacity));
            position: absolute;
            right: 0px;
            bottom: 0px;
        }
    }
    .layout-vertical {
        box-shadow: 0 1px 2.5px #0000002e;
        width: 56px;
        position: relative;
        overflow: hidden;
        height: 48px;
        border-radius: 4px;
        --tw-bg-opacity: 1;
        background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
        .left-top {
            width: 30%;
            height: 100%;
            --tw-bg-opacity: 1;
            background-color: rgba(39, 51, 82, var(--tw-bg-opacity));
            position: absolute;
            left: 0px;
            top: 0px;
        }
        .right-bottom {
            width: 70%;
            height: 75%;
            --tw-bg-opacity: 1;
            background-color: rgba(240, 242, 245, var(--tw-bg-opacity));
            position: absolute;
            right: 0px;
            bottom: 0px;
        }
    }
    .layout-horizontal {
        box-shadow: 0 1px 2.5px #0000002e;
        width: 56px;
        position: relative;
        overflow: hidden;
        height: 48px;
        border-radius: 4px;
        --tw-bg-opacity: 1;
        background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
        .left-top {
            width: 100%;
            height: 25%;
            --tw-bg-opacity: 1;
            background-color: rgba(39, 51, 82, var(--tw-bg-opacity));
            position: absolute;
            left: 0px;
            top: 0px;
        }
        .right-bottom {
            width: 100%;
            height: 75%;
            --tw-bg-opacity: 1;
            background-color: rgba(240, 242, 245, var(--tw-bg-opacity));
            position: absolute;
            right: 0px;
            bottom: 0px;
        }
    }
    .layout-gallary {
        box-shadow: 0 1px 2.5px #0000002e;
        width: 56px;
        position: relative;
        overflow: hidden;
        height: 48px;
        border-radius: 4px;
        --tw-bg-opacity: 1;
        background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
        .left-top {
            width: 15%;
            height: 100%;
            --tw-bg-opacity: 1;
            background-color: rgba(39, 51, 82, var(--tw-bg-opacity));
            position: absolute;
            left: 0px;
            top: 0px;
        }
        .right-bottom {
            width: 60%;
            height: 75%;
            --tw-bg-opacity: 1;
            background-color: rgba(240, 242, 245, var(--tw-bg-opacity));
            position: absolute;
            right: 0px;
            bottom: 0px;
        }
    }
    .hand {
        cursor: pointer;
    }
    .active {
        border: 3px solid var(--primary-color);
    }
}
</style>