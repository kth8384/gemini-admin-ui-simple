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
    <div class="view-content">
        <n-layout has-sider>
            <n-layout-sider :inverted="true">
                <n-h3 class="green">菜单图标 IconifyIcon</n-h3>
                <n-menu
                    :inverted="true"
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    :options="menuOptions"
                    :render-icon="renderIcon"
                />
            </n-layout-sider>
            <n-layout-content>
                <n-space vertical>
                    <n-card title="purge-icons 图标" size="medium">
                        <p>支持动态渲染;支持离线打包使用。扫描页面识别图标，然后从 @iconify/json解析图标后用Iconify.addCollection()引入图标集</p>
                        <p>使用全新图标后,下次重启，会自动识别加载图标 svg 内容</p>
                        <n-space>
                            <g-icon
                                spin
                                :size="48"
                                :color="isChange ? '#ff0000' : '#008000'"
                                :icon="isChange ? 'fa-solid:home' : 'fa-solid:ad'"
                            ></g-icon>
                        </n-space>
                        <n-button type="primary" size="medium" @click="isChange = !isChange">切换</n-button>
                    </n-card>
                </n-space>
            </n-layout-content>
        </n-layout>
    </div>
</template>
<script setup lang="ts">
import { renderIconifyIcon } from '@/components/GIcon';
const isChange = ref(false);
const renderIcon = (item: any) => {
    return renderIconifyIcon(item.iconName);
}
const menuOptions = [
    {
        label: '且听风吟1',
        key: 'key1',
        iconName: 'fa-solid:bone'
    },
    {
        label: '且听风吟2',
        key: 'key2',
        iconName: 'fa-solid:car-crash'
    }, {
        label: '且听风吟2',
        key: 'key3',
        iconName: 'fa-solid:chess-queen'
    }
]
</script>
<style lang="css" scoped >
.big {
    font-size: 48px;
}
.red {
    color: #ff0000;
}
.green {
    color: #19e94d;
}
</style>