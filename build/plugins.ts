/*
 *
 *  *    Copyright 2020-2021 Luter.me
 *  *
 *  *    Licensed under the Apache License, Version 2.0 (the "License");
 *  *    you may not use this file except in compliance with the License.
 *  *    You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *    Unless required by applicable law or agreed to in writing, software
 *  *    distributed under the License is distributed on an "AS IS" BASIS,
 *  *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *    See the License for the specific language governing permissions and
 *  *    limitations under the License.
 *
 */

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import type { Plugin } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { viteMockServe } from "vite-plugin-mock";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import PurgeIcons from "vite-plugin-purge-icons";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import compressPlugin from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
// import pkg from "../package.json";
import { createHtmlPlugin } from "vite-plugin-html";
/**
 * 注册 Vite 插件
 * @param envConfig 环境配置
 * @param isBuild 是否打包模式
 * @returns
 */
export function createVitePlugins(envConfig: EnvConfigType, isBuild: boolean) {
  console.log("环境参数:", envConfig);
  const { VITE_ENABLE_MOCK, VITE_BUILD_COMPRESS_STRATEGY, VITE_BUILD_DELETE_ORIGIN_FILE } = envConfig;
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
    VitePWA({
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "LuterName",
        short_name: "LuterSTName",
        description: "Luter DESC",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    //vue SFC name support
    vueSetupExtend(),
    AutoImport({
      imports: ["vue", "@vueuse/core", "vue-router", "pinia"],
      dts: "src/auto-imports.d.ts",
    }),
    Components(
      {
        // dirs: ["src/components"],
        deep: true,
        dts: "src/auto-components.d.ts",
        resolvers: [
          //auto import Naive UI Components
          //https://github.com/antfu/unplugin-vue-components
          //全局引入的话，就不需要这里自动组件注册了
          {
            type: "component",
            resolve: (name: string) => {
              if ("NEl" === name) {
                name = "NElement";
              }
              if (name.match(/^(N[A-Z]|n-[a-z])/)) return { name, from: "naive-ui" };
            },
          },
        ],
      },
    ),
    PurgeIcons({ iconSource: "local" }),
  ];
  //mock
  VITE_ENABLE_MOCK && vitePlugins.push(createPluginMock(isBuild));
  //兼容老旧浏览器
  vitePlugins.push(legacy());
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(envConfig, isBuild));
  if (isBuild) {
    //Compress
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS_STRATEGY, VITE_BUILD_DELETE_ORIGIN_FILE));
  }
  return vitePlugins;
}
/**
 * 创建 mock Server
 * @param isBuild
 * @returns
 */
function createPluginMock(isBuild: boolean) {
  return viteMockServe({
    ignore: /^mockServer.*/,
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
            import { setupProdMockServer } from '../mock/mockServer';
            setupProdMockServer();
            `,
  });
}
function configCompressPlugin(
  compress: "gzip" | "brotli" | "none",
  deleteOriginFile = false
): Plugin | Plugin[] {
  const compressList = compress.split(",");
  const plugins: Plugin[] = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile,
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile,
      })
    );
  }
  return plugins;
}
//html inject
function configHtmlPlugin(env: EnvConfigType, isBuild: boolean) {
  const { VITE_APP_NAME } = env;
  //public 下的全局配置文件
  const getAppConfigSrc = () => {
    return `/app.config.js?v=${new Date().getTime()}`;
  };
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_APP_NAME,
      },
      // global config file inject
      tags: [
        {
          tag: "script",
          attrs: {
            src: getAppConfigSrc(),
          },
        },
      ],
    },
  });
  return htmlPlugin as Plugin[];
}
