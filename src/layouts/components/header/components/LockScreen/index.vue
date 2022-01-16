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

<!--  -->
<template>
    <div @click="onHandleLock">
        <n-tooltip trigger="hover" placement="bottom-start">
            <template #trigger>
                <g-icon :size="iconSize" :icon="SysIcons.lock" />
            </template>
            {{ $t("ui.header.lockScreen") }}
        </n-tooltip>
        <n-modal
            preset="dialog"
            :title="$t('views.layout.header.lock.modal.title')"
            :positive-text="$t('views.layout.header.lock.modal.pText')"
            @positive-click="submitCallback"
            @negative-click="cancelCallback"
            :negative-text="$t('views.layout.header.lock.modal.cancelText')"
            :mask-closable="false"
            v-model:show="showModal"
        >
            <n-input
                autofocus
                @keydown.enter.prevent
                @keyup.enter="submitCallback"
                v-model:value="password"
                :placeholder="$t('views.layout.header.lock.input.placeHolder')"
            >
                <template #prefix>
                    {{
                        $t("views.layout.header.lock.input.label")
                    }}
                </template>
            </n-input>
            <n-text italic type="error">{{ $t('views.layout.header.lock.tip') }}</n-text>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import { SysIcons } from '@/enum/iconEnum'
const showModal = ref(false);
const password = ref();
const message = useMessage();
const userStore = useUserStore();
const { t } = useI18n();
defineProps({
    iconSize: {
        type: Number,
        default: 14
    }
});
const onHandleLock = () => {
    showModal.value = true;
};
const submitCallback = () => {
    if (password.value && password.value.length > 3) {
        userStore.lock(password.value);
        ///////路由锁屏
        // if (userStore.getLocked) {
        //   router.push({
        //     name: config.PAGE_LOCK_NAME,
        //     replace: true,
        //   })
        // }
        ///////路由锁屏
    } else {
        message.error(t("views.layout.header.lock.errormsg"));
        return false;
    }
};

const cancelCallback = () => {
    showModal.value = false;
};
</script>
<style lang="css" scoped></style>
