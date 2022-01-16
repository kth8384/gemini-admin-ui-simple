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

import { useSettingsStore } from "../store/modules/settings";
import { zhCN, enUS } from "date-fns/locale";
import { format } from "date-fns";
const settings = useSettingsStore();
const dateTimeFormat = {
  DATE_TIME: "yyyy-MM-dd HH:mm",
  TIMESTAMP: "yyyy-MM-dd HH:mm:ss",
  TIMESTAMP_NANO: "yyyy-MM-dd HH:mm:ss.SSS",
  NANO: "SSS",
  DATE: "yyyy-MM-dd",
  TIME: "HH:mm:ss",
  WEEK: "EEEE",
  APM: "aa",
  FULL: "yyyy-MM-dd HH:mm:ss EEEE aa",
};
export function useDateTime() {
  function getLocale(lang = settings.lang) {
    if ("zh-CN" === lang) {
      return zhCN;
    }
    if ("en-US" === lang) {
      return enUS;
    }
    return enUS;
  }
  function useFormatNow(formatOption?: string) {
    return format(new Date(), formatOption || dateTimeFormat.TIMESTAMP, {
      locale: getLocale(settings.lang) || zhCN,
    });
  }
  return { dateTimeFormat, useFormatNow, format };
}
