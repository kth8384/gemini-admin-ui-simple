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
  <n-menu ref="menuInstRef" accordion :collapsed-width="settings.siderCollapsedWidth" :collapsed-icon-size="22"
    :options="routerStore.getMenus" :render-icon="renderMenuIcon" key-field="name" label-field="name"
    :value="data.selectedKey" children-field="children" :indent="16" :render-label="renderMenuLabel"
    :render-extra="renderMenuExtra" @update:value="onMenuSelect" />
</template>
<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings";
import { useRouterStore } from "@/store/modules/router";
import { renderMenuIcon, renderMenuLabel, renderMenuExtra } from "./menuHelper";
import { openWindow } from "@/utils";
import { MenuInst } from "naive-ui";
const menuInstRef = ref<MenuInst | null>(null);
const settings = useSettingsStore();
const routerStore = useRouterStore();
const router = useRouter();
const currentRoute = useRoute();
const onMenuSelect = (key: string, item: any) => {
  console.log("菜单点击", key, item);
  //就在这页面
  if (item.name === currentRoute.name) {
    return;
  }
  try {
    //看看是否是 iframe
    //component 是字符串，并且 target 是_blank,就在外面打开
    if (item.meta?.frameSrc && item.meta?.target === '_blank') {
      openWindow(item.meta.frameSrc, { target: item.meta.target });
      return;
    }
    router.push({
      name: item.name,
    });
  } catch (error: any) {
    console.error("名字:", error.name, "错误:", error.message);
    window.$notify.error({
      title: error.name,
      content: error.message,
    });

  }
};
const data = reactive({
  selectedKey: currentRoute.name as string
})
watch(
  () => currentRoute.name,
  (value) => {
    data.selectedKey = value as string
    menuInstRef.value?.showOption(value as string);
  }, { immediate: true }
)
onMounted(() => {
});
</script>
<style lang="scss">
.n-menu.n-menu--horizontal .n-menu-item-content {
  padding: 0 $base-width  !important;
}
</style>
