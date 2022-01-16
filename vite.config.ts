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

import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/plugins";
import { parseEnvParams } from "./build/buildHelper";
import packageJson from "./package.json";
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const envConf = parseEnvParams(loadEnv(mode, root));
  const { VITE_PORT, VITE_DROP_CONSOLE } = envConf;
  const { name, version, author = { name: "Luter", email: "cluter@qq.com" } } = packageJson;
  const buildTime = new Date().toUTCString();
  return {
    base: "/",
    plugins: createVitePlugins(envConf, command === "build"),
    server: {
      port: VITE_PORT,
      host: true,
      // proxy: {
      //     '/api': {
      //         //要访问的跨域的域名
      //         target: 'http://localhost:5000/',
      //         //跨域开启
      //         changeOrigin: true,
      //         // 是否启用websockets
      //         ws: false,
      //         // 使用的是http协议则设置为false，https协议则设置为true
      //         secure: false,
      //         //重写路径
      //         rewrite: path => path.replace(/^\/api/, '')
      //     }
      // }
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    css: {
      extract: true, // 是否使用css分离插件 ExtractTextPlugin
      sourceMap: false, // 开启 CSS source maps
      requireModuleExtension: true,
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          additionalData: `@import "src/styles/_vars.scss";`,
          javascriptEnabled: true,
        },
      },
      // postcss: {
      //   autoprefixer,
      // },
    },
    build: {
      target: "es2015",
      outDir: "/opt/luter/develop/temp/server/dist",
      //clear out dir
      emptyOutDir: true,
      minify: "terser",
      terserOptions: {
        mangle: true,
        output: {
          //true 多行，false 压缩成一样
          beautify: false,
          //支持 safari10
          safari10: true,
          //不输出注释
          comments: false,
          //顶部输出版权信息
          preamble:
            `/*** ${name} ***\n ` +
            `* Version:${version}\n ` +
            `* Author:${author.name} at : ${author.email} \n` +
            ` * Built at :${buildTime}\n` +
            ` */`,
        },
        compress: {
          warnings: false,
          keep_infinity: true,
          drop_debugger: true,
          drop_console: VITE_DROP_CONSOLE,
          pure_funcs: ["console.log"],
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            //把 依赖单独拆开,用依赖自己名字打包
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
            //把依赖全部打包到 vendor里
            // if (id.includes("node_modules")) {
            //   return "vendor";
            // }
          },
        },
      },
    },
  };
});
