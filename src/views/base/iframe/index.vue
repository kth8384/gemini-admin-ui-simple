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
    <div class="iframe-container">
        <iframe
            v-if="isUrl(route.meta.frameSrc as string)"
            :id="data.id"
            :height="data.height"
            width="100%"
            :src="(route.meta.frameSrc as string)"
            :style="{
                border: data.border,
                overflow: data.scrolling ? 'auto' : 'hidden',
            }"
        ></iframe>
    </div>
</template>
<script setup lang="ts">
import { useApp } from '@/hooks/useApp';
import { isUrl } from '@/utils/assert'
const route = useRoute();
const data = reactive({
    id: "g-iframe-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""),
    src: "",
    border: 1,
    scrolling: true,
    height: "100%",
});
onMounted(() => {
    nextTick(() => {
        const iframe = document.getElementById(data.id);
        (iframe as HTMLElement).onload = function () {
            console.log("iframe 加载完毕");
        };
    });
});
const { getContentHeight } = useApp();
const contentHeight = getContentHeight().value;
</script>
<style scoped lang="scss">
.iframe-container {
    width: 100%;
    height: v-bind(contentHeight);
    box-sizing: border - box;
    overflow: hidden;
}
</style>
