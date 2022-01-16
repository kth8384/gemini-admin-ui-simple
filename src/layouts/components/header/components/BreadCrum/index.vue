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
  <div v-if="settings.showBreadCrumb" class="breadcrumb">
    <n-breadcrumb>
      <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
        <n-breadcrumb-item class="text">
          <n-dropdown
            v-if="routeItem.children.length > 1"
            :options="routeItem.children"
            @select="dropdownSelect"
          >
            <span class="text">
              <g-icon :size="12" :icon="routeItem.meta?.icon"></g-icon>
              {{ $t("route." + routeItem.name) }}
            </span>
          </n-dropdown>
          <span v-else>
            <g-icon :size="12" :icon="routeItem.meta?.icon"></g-icon>
            {{ $t("route." + routeItem.name) }}
          </span>
        </n-breadcrumb-item>
      </template>
    </n-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { computed, h } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useSettingsStore } from "@/store/modules/settings";
import { GIcon } from "@/components/GIcon";
const settings = useSettingsStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const generator: any = (routerMap: any[]) => {
  return routerMap.map((item) => {
    const currentMenu = {
      ...item,
      label: t("route." + item.name),
      key: item.name,
      disabled: item.name === route.name,
      icon: () => h(GIcon, { icon: item.meta?.icon }, ""),
    };
    if (item.children && item.children.length > 0) {
      currentMenu.children = generator(item.children, currentMenu);
    }
    return currentMenu;
  });
};
//面包屑翻译
const breadcrumbList = computed(() => {
  const data = generator(route.matched);
  console.error(data);
  return data;
});

const dropdownSelect = (key: any) => {
  router.push({ name: key });
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  padding: 5px 20px 0 20px;
  width: 10vw;
  .text {
    max-width: 200px;
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .n-breadcrumb-item > span {
    max-width: 100px;
  }
}
</style>
