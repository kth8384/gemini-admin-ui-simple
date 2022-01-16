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

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { App, ComponentPublicInstance } from "vue";
export function handleError(err: any, vm: ComponentPublicInstance, info: string) {
  console.error("错误", info);
  console.error("错误", err);
  console.error("错误", vm);
  Swal.fire({
    icon: "error",
    title: "错误",
    text: err?.message,
  });
}
export function handleWarn(msg: string, vm: ComponentPublicInstance, trace: string) {
  // `trace` 是组件的继承关系追踪
  console.warn("错误", msg, vm, trace);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });
  Toast.fire({
    icon: "warning",
    title: msg,
  });
}

export function setUpErrorhandler(app: App<Element>) {
  app.config.errorHandler = handleError;
  app.config.warnHandler = handleWarn;
}
