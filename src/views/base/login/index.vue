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
    <n-config-provider :theme-overrides="getNaiveThemeOverrides">
        <n-message-provider>
            <n-layout>
                <div class="login-container">
                    <div
                        class="left"
                        :style="{
                            backgroundImage: 'url(' + '/static/images/bgs/' + leftBgImage + ')',
                        }"
                    >
                        <div class="logo">
                            <n-space>
                                <g-logo-svg :size="50"></g-logo-svg>
                                <n-h3 class="mt">{{ appName }}</n-h3>
                            </n-space>
                        </div>
                        <div class="bottom">
                            <span class="text" :style="{ color: themeVars.primaryColor }">
                                <span>Copyright ©{{ new Date().getFullYear() }} {{ appName }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="header">
                            <g-language />
                            <g-dark-theme />
                        </div>
                        <div class="content">
                            <div class="comp-container">
                                <login-form />
                                <register-form />
                            </div>
                        </div>
                        <div class="footer">
                            <n-space justify="center">
                                <g-icon icon="fa-brands:github" :size="20" />
                                <g-icon icon="fa-brands:weixin" :size="20" />
                                <g-icon icon="fa-brands:weibo" :size="20" />
                                <g-icon icon="fa-brands:facebook" :size="20" />
                                <g-icon icon="fa-brands:twitter" :size="20" />
                            </n-space>
                        </div>
                    </div>
                </div>
            </n-layout>
        </n-message-provider>
    </n-config-provider>
</template>
<script setup lang="ts">
import { GLanguage, GDarkTheme, GLogoSvg } from "@/layouts/components/header/components";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { useThemeVars } from "naive-ui";
import { useNaive } from "@/hooks/useNaive";
import { useSettingsStore } from "@/store/modules/settings";
import { getAppConfig } from "@/config";
const { getNaiveThemeOverrides } = useNaive();
const themeVars = useThemeVars();
const settingStore = useSettingsStore();
const leftBgImage = computed(() => {
    return settingStore.darkTheme ? "3.svg" : "4.svg";
});
const appName = getAppConfig().VITE_APP_NAME
//当前 form 名称
</script>
<style lang="scss" scoped>
.login-container {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    .left {
        flex: 2;
        width: 100%;
        height: auto;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .logo {
            flex: 1;
            height: 50px;
            display: flex;
            width: 100%;
            background: transparent;
            justify-content: flex-start;
            flex-direction: row;
            padding: 2rem;
        }
        .bottom {
            height: 50px;
            background: transparent;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .text {
                position: fixed;
                bottom: 0;
            }
        }
    }
    .right {
        flex: 3;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: transparent;
        .header {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            div {
                margin-right: 2rem;
                cursor: pointer;
            }
        }
        .content {
            width: 100%;
            flex: 8;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
            .comp-container {
                width: 50%;
                height: auto;
            }
        }
        .footer {
            width: 100%;
            flex: 2;
        }
    }
    .bg-green {
        background: green;
    }
    .bg-reb {
        background-color: rebeccapurple;
    }
    .bg-black {
        background: black;
    }
    @media only screen and (max-width: 900px) {
        .left {
            display: none !important;
        }
    }
}
</style>
