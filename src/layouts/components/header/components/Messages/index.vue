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
        <n-popover
            :style="{ width: '400px', maxWidth: '500px' }"
            placement="bottom"
            trigger="hover"
        >
            <template #trigger>
                <div class="messages-trigger">
                    <g-icon :size="14" class="hand" :icon="SysIcons.messages"></g-icon>
                    <n-badge v-if="data.hasNew" dot />
                </div>
            </template>
            <n-list v-if="data.messages && data.messages.length" bordered>
                <n-list-item v-for="item,index in data.messages" :key="index">
                    <n-thing content-indented>
                        <template #avatar>
                            <g-icon size="24" icon="fa-brands:weixin"></g-icon>
                        </template>
                        <template #header>{{ item.title }}</template>
                        <template #header-extra>
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <g-icon
                                        :color="item.isRead ? themeVars.successColor : themeVars.infoColor"
                                        size="24"
                                        icon="mdi:read"
                                        class="hand"
                                    ></g-icon>
                                </template>
                                {{ item.isRead ? '已读' : '未读' }}
                            </n-tooltip>
                        </template>
                        <template #description>{{ item.timestamp }}</template>
                        {{ item.content }}
                    </n-thing>
                </n-list-item>
            </n-list>
            <n-empty v-else description="暂无消息"></n-empty>
        </n-popover>
    </div>
</template>
<script setup lang="ts">
import { getCurrentUserMessages, SysMessages } from '@/api/BaseApi';
import { SysIcons } from '@/enum/iconEnum'
import { useNaive } from '@/hooks/useNaive';
import config from '@/config'
const { themeVars } = useNaive()
const data = reactive({
    hasNew: false,
    messages: [] as SysMessages[]
})

const getMessages = async () => {
    const messages = await getCurrentUserMessages();
    data.messages = messages;
    data.hasNew = (data.messages && data.messages.length && data.messages.some((item) => item.isRead === false)) > 0
}
//五秒拿一次
useIntervalFn(() => { getMessages() }, config.app.MESSAGES_REFRESH_DURATION)
</script>
<style lang="scss" scoped>
.messages-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>