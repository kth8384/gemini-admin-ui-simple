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
    <router-view v-slot="{ Component, route }">
      <transition v-if="settings.animated" :name="route.meta?.transition || 'fade'">
        <keep-alive :include="[...keepAliveRoutes]">
          <component :is="Component" />
        </keep-alive>
      </transition>
      <keep-alive v-else :include="[...keepAliveRoutes]">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings';

const router = useRouter();
const settings = useSettingsStore();
const keepAliveRoutes = computed(() => {
  const allRoutes = router.getRoutes();
  const routes = filterKeepAliveRouteNames(allRoutes);
  console.error("KeepAlive组件=", routes);
  return routes;
});
const filterKeepAliveRouteNames = (routes: any[]) => {
  const items: any[] = [];
  routes.forEach((element) => {
    if (element.meta && element.meta.keepAlive === true) {
      items.push(element.name);
    }
    if (element.children) {
      filterKeepAliveRouteNames(element.children);
    }
  });

  return items;
};
onMounted(() => {
  console.log("主内容渲染区域加载完毕");
});
</script>
<style lang="scss" scoped></style>
