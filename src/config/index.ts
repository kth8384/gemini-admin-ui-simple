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

import app from "./app";
import storage from "./storage";
import network from "./network";
import theme from "./theme";
export default {
  app,
  storage,
  network,
  theme,
};
/**
 * get appconfig from app.config.js file
 * @returns
 */
export function getAppConfig() {
  ///app.config.js 里的 window.GEMINI_GLOBAL_CONFIG
  const CONFIG_PARAM_NAME = "GEMINI_GLOBAL_CONFIG";
  const envConf = window[CONFIG_PARAM_NAME as any] as unknown as EnvConfigType;
  const { VITE_APP_NAME, VITE_SERVER_ROUTE, VITE_RECORD_LAST_ROUTE, VITE_API_BASE_URL } = envConf;
  return {
    VITE_APP_NAME,
    VITE_SERVER_ROUTE,
    VITE_RECORD_LAST_ROUTE,
    VITE_API_BASE_URL,
  };
}
export function getThemeConfig() {
  return theme;
}
