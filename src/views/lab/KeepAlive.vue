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
        <n-card title="这个页面KeepAlive" size="medium">
            <template #header-extra>条件: route.meta.keepAlive===true，并且route.name==='组件名称'</template>
            <n-space vertical>
                <n-input v-model:value="value" type="text" placeholder="这个页面KeepAlive" />
            </n-space>
        </n-card>
    </div>
</template>
<script setup lang="ts"  name="KeepAliveDemo">
const value = ref();
</script>
<style lang="css" scoped></style>