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

import { unref } from "vue";
import { Router, useRouter } from "vue-router";
import config from "@/config";
export function useRedirect(router?: Router) {
  const { push, currentRoute } = router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === config.app.PAGE_REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params["_redirect_type"] = "name";
        params["path"] = String(name);
      } else {
        params["_redirect_type"] = "path";
        params["path"] = fullPath;
      }
      push({ name: config.app.PAGE_REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  console.error("重定向页面", currentRoute);
  return redo;
}
