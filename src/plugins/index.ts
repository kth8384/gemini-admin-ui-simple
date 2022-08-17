import { useSettingsStoreOutSetUp } from "@/store/modules/settings";
import {
  ConfigProviderProps,
  lightTheme,
  darkTheme,
  createDiscreteApi,
} from "naive-ui";
import { App } from "vue";
import mitt from "mitt";
const settingStore = useSettingsStoreOutSetUp();
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: settingStore.getDarkTheme ? darkTheme : lightTheme,
}));
const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"],
  {
    configProviderProps: configProviderPropsRef,
  }
);
export function setupGlobalPlugin(app: App<Element>) {
  app.use({
    install(app, ...options) {
      window.$loadingBar = loadingBar;
      window.$dialog = dialog;
      window.$message = message;
      window.$notify = notification;
      window.$bus = mitt();
      console.log("全局组件注册完毕");
    },
  });
}
