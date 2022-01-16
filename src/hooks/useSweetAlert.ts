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

import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
// import "@sweetalert2/theme-dark/dark.scss";
export function useSweetAlert() {
  type Awaited<T> = T extends Promise<infer U> ? U : T;
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
  });
  const Confirm = Swal.mixin({
    backdrop: false,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    icon: "warning",
    confirmButtonText: "确定",
    // customClass: {
    //   confirmButton: 'n-button n-button--success-type',
    //   cancelButton: 'n-button n-button--error-type'
    // }
  });

  function message(content: string) {
    Swal.fire(content);
  }
  function confirm(text: string, ok: () => void, title?: string, cancel?: () => void) {
    Confirm.fire({
      title: title || "Are You Sure?",
      text: text,
    }).then((result) => {
      if (result.isConfirmed) {
        ok && ok();
      } else {
        cancel && cancel();
      }
    });
  }
  function fireConfirm<T = any>(options: SweetAlertOptions<T>) {
    Confirm.fire(options);
  }
  function fireError(text: string, title?: string) {
    Swal.fire({
      icon: "error",
      title: title || "错误",
      text: text,
    });
  }
  function fire<T = any>(options: SweetAlertOptions<T>): Promise<SweetAlertResult<Awaited<T>>> {
    return Swal.fire(options);
  }

  function toast(title: string, icon?: SweetAlertIcon) {
    Toast.fire({
      icon: icon || "success",
      title: title,
    });
  }
  return { message, confirm, fire, toast, fireError, fireConfirm };
}
