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
        <n-grid x-gap="20" y-gap="5" cols="3" item-responsive responsive="screen">
            <n-grid-item span="3 m:1">
                <n-card>
                    <n-space vertical align="center" justify="center">
                        <n-avatar style="cursor: pointer" round :size="120" :src="user.avatar" />
                        <n-h1>
                            <n-gradient-text
                                gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
                            >{{ user.username }}</n-gradient-text>
                        </n-h1>

                        <n-h6>{{ user.slogan }}</n-h6>
                        <n-space>
                            <n-tag
                                v-for="(item, index) in user.tags"
                                :key="index"
                                size="small"
                            >{{ item }}</n-tag>
                        </n-space>
                    </n-space>
                </n-card>
            </n-grid-item>
            <n-grid-item span="3 m:2">
                <n-card>
                    <n-tabs type="line">
                        <n-tab-pane name="setting" tab="个人设置">个人设置</n-tab-pane>
                        <n-tab-pane name="projects" tab="项目设置">项目设置</n-tab-pane>
                        <n-tab-pane name="updateInfo" tab="信息修改">信息修改</n-tab-pane>
                    </n-tabs>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const user = ref(userStore.getUser);
</script>

<style lang="css" scoped></style>
