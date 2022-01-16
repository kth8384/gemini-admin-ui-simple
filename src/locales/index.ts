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

import { useSettingsStoreOutSetUp } from "@/store/modules/settings";
import { createI18n } from "vue-i18n";
import { App } from "vue";
//引入同级目录下文件
// const modules = import.meta.globEager("./*.json");
const viewModules = import.meta.globEager("./lang/**/*.json");
//假设还有其他目录下的语言文件 它的路径是 src/locales/lang/whatever.json
//那么就可以 使用 :lower:（小写） :upper:（大写） 来引入文件
//直接用这种模式，可以用 vscode 的 i18n 管理插件自动翻译
// const viewModules = import.meta.globEager(
//   "./lang/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].json"
// );
function getAllLanguages(): any {
  const message: any = {};
  // getLanguageFiles(modules, message);
  getLanguageFiles(viewModules, message);
  return message;
}
/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLanguageFiles(mList: any, msg: any) {
  for (const path in mList) {
    if (mList[path].default) {
      //  获取文件名
      const pathName = path.substr(path.lastIndexOf("/") + 1, 5);
      if (msg[pathName]) {
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default,
        };
      } else {
        msg[pathName] = mList[path].default;
      }
    }
  }
}
///chrome:当前语言: zh-CN 浏览器支持的语系: (6) ['zh-CN', 'zh', 'en', 'zh-TW', 'ja', 'la']
///safari: 当前语言: – "zh-cn" – "浏览器支持的语系:" – ["zh-cn"]
///firefox:当前语言: zh-CN 浏览器支持的语系:Array(6)[("zh-CN", "zh", "zh-TW", "zh-HK", "en-US", "en")];
console.log("当前语言:", navigator.language, "浏览器支持的语系:", navigator.languages);

function getDefaultLanguage() {
  const lang = navigator.language;
  if ("zh-cn" === lang) {
    return "zh-CN";
  }
  return lang;
}

const settings = useSettingsStoreOutSetUp();
//注册i8n实例并引入语言文件
const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  sync: true,
  locale: settings.lang ? settings.lang : getDefaultLanguage(),
  messages: getAllLanguages(),
  silentTranslationWarn: true,
  fallbackWarn: false,
  missingWarn: false,
});
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}
export default i18n;
