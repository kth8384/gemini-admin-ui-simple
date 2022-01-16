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
  <div class="user-info">
    <n-dropdown
      :render-icon="renderIcon"
      :options="userDropdownOptions"
      @select="handleUserOptionSelect"
    >
      <div class="details">
        <img class="avatar" :src="userStore.user.avatar" alt="avatar" />
        <span class="title">{{ userStore.user.username }}</span>
      </div>
    </n-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import config, { getAppConfig, getThemeConfig } from "@/config";
import { useDialog } from "naive-ui";
import { renderIconifyIcon } from "@/components/GIcon";
import { useI18n } from "vue-i18n";
const userStore = useUserStore();
const { t } = useI18n();
const renderIcon = (option: any) => {
  return renderIconifyIcon(option.icon, option.color);
};
const userDropdownOptions = computed(() => [
  {
    label: t('ui.header.userinfo.userprofile'),
    key: "profile",
    icon: "fa-solid:id-card",
  },
  {
    label: t('ui.header.userinfo.logout'),
    key: "logout",
    icon: "fa-solid:sign-out-alt",
    color: '#ff0000'
  },
] as any[])
const router = useRouter();
const dialog = useDialog();
const route = useRoute();
const handleUserOptionSelect = (key: string) => {
  switch (key) {
    case "profile":
      router.push({ name: "UserProfile" });
      break;
    case "logout":
      dialog.warning({
        title: t('ui.header.userinfo.logout'),
        content: t('ui.header.userinfo.logouttext'),
        positiveText: t('common.yes'),
        negativeText: t('common.cancel'),
        onPositiveClick: async () => {
          await userStore.logout();
          if (getAppConfig().VITE_RECORD_LAST_ROUTE === true) {
            const fullPath = route.fullPath;
            router.push(`${config.app.PAGE_LOGIN_PATH}?redirect=${fullPath}`);
          } else {
            router.push(`${config.app.PAGE_LOGIN_PATH}`);
          }
        },
        onNegativeClick: () => { },
      });
      break;
    default:
      break;
  }
};
const headerHeight = getThemeConfig().headerHeight;
</script>
<style lang="scss" scoped>
.user-info {
  width: 120px !important;
  .details {
    height: 100%;
    display: flex;
    align-items: center;
    .avatar {
      border-radius: 50%;
      width: calc(v-bind(headerHeight) - 15px);
      height: calc(v-bind(headerHeight) - 15px);
      margin-right: 12px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
    }
  }
}
</style>
