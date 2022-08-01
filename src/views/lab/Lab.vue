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
  <div class="lab-view-content">
    <n-card>
      <g-tag-group label="测试11111111:" multiple v-model="data.selected" :options="options" size="small"
        @update:model-value="onUpdate">
      </g-tag-group>
      <n-divider dashed></n-divider>
      <g-tag-group label="测试222222:" v-model="data.selected" :options="options" size="small"
        @update:model-value="onUpdate">
      </g-tag-group>
      <n-space vertical class="mt-xxl">
        <n-text>{{ data.selected.join(",") }}</n-text>
        <n-button type="primary" size="medium" @click="() => { data.selected = [] }">测试</n-button>
      </n-space>
    </n-card>
  </div>
</template>
<script setup lang="ts">
const data = reactive({
  selected: [] as string[],
});
const options = [
  {
    label: "标签一",
    value: "tag-1",
  },
  {
    label: "标签二",
    value: "tag-2",
  },
  {
    label: "标签三",
    value: "tag-3",
  },
  {
    label: "标签四",
    value: "tag-4",
  },
  {
    label: "标签五",
    value: "tag-5",
  },
  {
    label: "标签六",
    value: "tag-6",
  },
  {
    label: "标签七",
    value: "tag-7",
  },
  {
    label: "标签八",
    value: "tag-8",
  },
  {
    label: "标签九",
    value: "tag-9",
  },
  {
    label: "标签十",
    value: "tag-10",
  },
  {
    label: "标签十一",
    value: "tag-11",
  },
  {
    label: "标签十二",
    value: "tag-12",
  },
  {
    label: "标签十三",
    value: "tag-13",
  },
  {
    label: "标签十四",
    value: "tag-14",
  },
  {
    label: "标签十五",
    value: "tag-15",
  },
  {
    label: "标签十六",
    value: "tag-16",
  },
  {
    label: "标签十七",
    value: "tag-17",
  },
  {
    label: "标签十八",
    value: "tag-18",
  },
  {
    label: "标签十九",
    value: "tag-19",
  },
  {
    label: "标签二十",
    value: "tag-20",
  },
];
const onUpdate = (value: any[]) => {
  console.log("update value:", data.selected.join(","));
  console.log("update value1:", value.join(","));
};
</script>
<style lang="css" scoped>
</style>
