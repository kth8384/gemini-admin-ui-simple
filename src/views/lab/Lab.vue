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
      <n-space>
        <n-button type="primary" size="medium" @click="onTest">测试</n-button>
        <g-tag-group
          round
          multiple
          v-model="data.selected"
          :options="options"
          size="small"
          @update:model-value="onUpdate"
        ></g-tag-group>
      </n-space>
      <n-text>{{ data.selected.join(",") }}</n-text>
    </n-card>
  </div>
</template>
<script setup lang="ts">
const data = reactive({
  selected: ["tag-1"] as string[],
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
];
const onUpdate = () => {
  console.log(data.selected.join(","));
};
const onTest = () => {
  data.selected = ["tag-2"];
};
</script>
<style lang="css" scoped></style>
