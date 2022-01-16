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

import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
///controller 下的文件自动扫描注入
const modules = import.meta.globEager("./controller/**/*.ts");
const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  mockModules.push(...modules[key].default);
});
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
