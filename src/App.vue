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
  <n-config-provider
    abstract
    :theme-overrides="getNaiveThemeOverrides"
    :locale="getNaiveLocale"
    :date-locale="getNaiveDateLocale"
    :theme="getNaiveDarkTheme"
  >
    <g-app-provider>
      <router-view v-if="!isLocked" />
      <div v-if="isLocked">
        <lock-page />
      </div>
    </g-app-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { useNaive } from "./hooks/useNaive";
import { useUserStore } from "./store/modules/user";
import LockPage from "./views/base/lock/index.vue";
import config from '@/config'
const { getNaiveLocale, getNaiveDateLocale, getNaiveDarkTheme, getNaiveThemeOverrides } = useNaive();
const route = useRoute();
const userStore = useUserStore();
const isLocked = computed(() => {
  return userStore.getLocked && route.path !== config.app.PAGE_LOGIN_PATH;
});
onMounted(() => {
  console.log("APP 加载");
});
</script>
