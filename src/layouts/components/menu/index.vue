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
  <n-menu
    :collapsed-width="settings.siderCollapsedWidth"
    :collapsed-icon-size="22"
    :options="routerStore.getMenus"
    :render-icon="renderMenuIcon"
    key-field="name"
    label-field="name"
    :value="data.selected"
    children-field="children"
    :indent="16"
    :render-label="renderMenuLabel"
    :render-extra="renderMenuExtra"
    :expanded-keys="data.expandedKeys"
    @update:expanded-keys="menuExpanded"
    @update:value="onMenuSelect"
  />
</template>
<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings";
import { useRouterStore } from "@/store/modules/router";
import { renderMenuIcon, renderMenuLabel, renderMenuExtra } from "./menuHelper";
import { openWindow } from "@/utils";
import { useSweetAlert } from "@/hooks/useSweetAlert";
const settings = useSettingsStore();
const routerStore = useRouterStore();
const router = useRouter();
const currentRoute = useRoute();
const { fireError, toast } = useSweetAlert();
const matched = currentRoute.matched;
const data = reactive({
  selected: "",
  expandedKeys: matched && matched.length ? matched.map((item) => item.name) : ([] as any),
});
const onMenuSelect = (key: string, item: any) => {
  console.log("菜单点击", key, item);
  //就在这页面
  if (item.name === currentRoute.name) {
    toast("手速不错~");
    return;
  }
  try {
    //看看是否是 iframe
    //component 是字符串，并且 target 是_blank,就在外面打开
    if (item.meta?.frameSrc && item.meta?.target === '_blank') {
      openWindow(item.meta.frameSrc, { target: item.meta.target });
      return;
    }
    //设置当前选中菜单
    data.selected = item.name;
    router.push({
      name: item.name,
    });
  } catch (error: any) {
    console.error("名字:", error.name, "错误:", error.message);
    fireError(error.message || "打开页面失败", error.name || "错误");
  }
};
const menuExpanded = (openKeys: string[]) => {
  if (!openKeys) return;
  const latestOpenKey = openKeys.find((key) => data.expandedKeys.indexOf(key) === -1);
  const isExistChildren = isChildExisted(latestOpenKey as string);
  data.expandedKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys;
};
const isChildExisted = (key: any) => {
  if (!key) return false;
  const subRouteChildren: string[] = [];
  for (const { children, key } of routerStore.getMenus) {
    if (children && children.length) {
      subRouteChildren.push(key as string);
    }
  }
  return subRouteChildren.includes(key);
};
watch(
  () => currentRoute.path,
  () => {
    data.selected = currentRoute.name as string;
    const matched = currentRoute.matched;
    data.expandedKeys = matched.map((item) => item.name);
    const activeMenu: string = (currentRoute.meta?.activeMenu as string) || "";
    data.selected = activeMenu ? (activeMenu as string) : (currentRoute.name as string);
  },
  { immediate: true }
);
onMounted(() => {
  data.selected = currentRoute.name as string;
});
</script>
<style lang="scss">
.n-menu.n-menu--horizontal .n-menu-item-content {
  padding: 0 $base-width !important;
}
</style>
