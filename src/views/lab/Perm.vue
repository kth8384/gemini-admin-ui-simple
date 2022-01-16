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
        <n-card title="权限和权限指令 : v-perm ='['a','b']'" size="medium">
            <template #header-extra>当前用户权限:{{ userStore.permissions }}</template>
            <template #action>
                <n-space justify="center">
                    <n-button type="primary" @click="data.perms = userStore.permissions">有权</n-button>
                    <n-button type="primary" @click="data.perms = ['NoPerms']">无权</n-button>
                    <span>{{ data.perms }}</span>
                </n-space>
            </template>
        </n-card>
        <n-space justify="center">
            <n-h1 v-perm="data.perms">这个文字只有 admin 看得见</n-h1>
        </n-space>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const data = reactive({
    perms: ['admin']
})
</script>
<style lang="css" scoped></style>