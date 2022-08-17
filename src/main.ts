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

import { createApp } from "vue";
// 通用字体 v-sans
// import "vfonts/FiraCode.css";
// 等宽字体 v-mono
// import 'vfonts/FiraCode.css'
import App from "./App.vue";
//custom style
import "./styles/index.scss";
import { setupVueRouter } from "./router";
import { setupPiniaStore } from "./store";
import { setupI18n } from "./locales";
import { setUpErrorhandler } from "./utils/errorHandler";
import { setupGlobalDirectives } from "./directive";
//iconify icons
import "@purge-icons/generated";
import { setupGlobalPlugin } from "./plugins";
const app = createApp(App);
//vue router
setupVueRouter(app);
//pinia store
setupPiniaStore(app);
//i18n
setupI18n(app);
//global error
setUpErrorhandler(app);
// all directives
setupGlobalDirectives(app);
// reg plugins
setupGlobalPlugin(app);
app.mount("#app");
