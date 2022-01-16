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
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-message-provider placement="top">
                <n-notification-provider :max="3">
                    <slot></slot>
                    <g-global-components></g-global-components>
                </n-notification-provider>
            </n-message-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>
<script setup lang="ts">
</script>
<style lang="css" scoped></style>