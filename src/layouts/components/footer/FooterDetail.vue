<template>
    <footer class="footer-container">
        <n-a v-if="props.showHelp" target="_blank" :href="docUrl" class="mr-xxxl">
            <n-text type="info">使用帮助</n-text>
        </n-a>
        Copyright © {{ year }} {{ appName }}({{ `v${packageJson.version}` }})| 技术支持:
        <n-a target="_blank" :href="'mailto:' + packageJson.author.email">{{ packageJson.author.organization }}</n-a>
    </footer>
</template>

<script lang="ts" setup>
import { getAppConfig, getThemeConfig, getPackageConfig } from "@/config";
import { useUserStore } from "@/store/modules/user";
const packageJson = getPackageConfig();
const year = new Date().getFullYear();
const userStore = useUserStore();
const appName = getAppConfig().VITE_APP_NAME;
const footerHeight = getThemeConfig().footerHeight;
const docUrl = "/manual?epmToken=" + userStore.getToken;
const props = defineProps({
    showHelp: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.footer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: v-bind(footerHeight);
}
</style>