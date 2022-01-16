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
        <transition v-if="userStore.getLocked" name="zoom-fade" mode="out-in" appear>
            <div class="lock-container">
                <div class="header">
                    <g-language class="lang" />
                </div>
                <div>
                    <div class="content">
                        <n-space align="center" vertical>
                            <n-avatar round :size="150" :src="userStore.getUser?.avatar" />
                            <n-h1 class="username">{{ userStore.getUser?.username }}</n-h1>
                        </n-space>
                        <n-space>
                            <n-input
                                v-model:value="password"
                                :placeholder="$t('views.lock.password')"
                                class="input"
                                type="password"
                                clearable
                                @keydown.enter.prevent
                                @keyup.enter="onUnlock"
                                size="large"
                                show-password-on="click"
                                @input="errorText = ''"
                            />
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <n-button
                                        @click="onUnlock"
                                        type="primary"
                                        size="large"
                                    >{{ $t("views.lock.unlock") }}</n-button>
                                </template>
                                {{ $t("views.lock.unlockTip") }}
                            </n-tooltip>
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <n-popconfirm @positive-click="onReLogin">
                                        <template #trigger>
                                            <n-button type="warning" size="large">
                                                {{
                                                    $t("views.lock.reLogin")
                                                }}
                                            </n-button>
                                        </template>
                                        {{ $t("views.lock.reloginConfirmText") }}
                                    </n-popconfirm>
                                </template>
                                {{ $t("views.lock.reLogin") }}
                            </n-tooltip>
                        </n-space>
                        <span v-if="errorText" class="error">
                            {{
                                errorText
                            }}
                        </span>
                    </div>
                </div>
                <div class="footer">
                    <n-h2>{{ data.date }}</n-h2>
                    <n-h2>{{ data.time }}</n-h2>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import config from "@/config";
import { useUserStore } from "@/store/modules/user";
import { useIntervalFn } from "@vueuse/shared";
import { GLanguage } from "@/layouts/components/header/components";
import { useDateTime } from "@/hooks/useDateTime";
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "@/store/modules/settings";
const { useFormatNow, dateTimeFormat } = useDateTime();
const { t } = useI18n();
const settingStore = useSettingsStore();
const router = useRouter();
const userStore = useUserStore();
const errorText = ref();
const password = ref();
const onUnlock = async () => {
    if (password.value && password.value.length > 3) {
        if (userStore.unlock(password.value)) {
            errorText.value = '';
        } else {
            errorText.value = t("views.lock.wrongPassword");
        }
    } else {
        errorText.value = t("views.lock.wrongPassword");
    }
};
const onReLogin = async () => {
    await userStore.logout();
    router.replace({
        name: config.app.PAGE_LOGIN_NAME,
    });
};
onMounted(() => {
    console.log("LockPage 加载");
});
const data = reactive({
    date: useFormatNow(
        dateTimeFormat.DATE + " " + dateTimeFormat.WEEK + " " + dateTimeFormat.APM
    ),
    time: useFormatNow(dateTimeFormat.TIME),
});
//监听语言变化
watch(
    () => settingStore.lang,
    () => {
        data.date = useFormatNow(
            dateTimeFormat.DATE + " " + dateTimeFormat.WEEK + " " + dateTimeFormat.APM
        );
    }
);
//时间走字
useIntervalFn(() => {
    data.time = useFormatNow(dateTimeFormat.TIME);
}, 1000);
</script>
<style lang="scss" scoped>
.lock-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    overflow: hidden;
    background: rgb(5, 5, 5);
    .header {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .lang {
            margin: 2rem 10rem 0 0;
            color: greenyellow;
        }
    }
    .content {
        flex: 8;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .username {
            color: #fff;
        }
    }
    .footer {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        & > * {
            color: #fff;
        }
    }
    .error {
        color: red;
        font-size: 14px;
        margin-top: 1rem;
    }
}
</style>
