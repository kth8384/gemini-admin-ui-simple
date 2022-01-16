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

import { useUserStore } from "@/store/modules/user";
import { App, Directive, DirectiveBinding } from "vue";
//检查是否具备权限
export function isPermitted(el: any, binding: any) {
  const userStore = useUserStore();
  const userPerms = userStore.getPermissions;
  const needPerms = binding.value;
  if (!needPerms || typeof needPerms === "undefined") return;
  const hasPerm = userPerms.every((perm: any) => {
    return needPerms.includes("*") || needPerms.includes(perm);
  });
  console.error(`权限Directive,perm value =  ${needPerms},user perms = ${userPerms},result = ${hasPerm}`);
  //直接删除子元素
  // if (!hasPerm) {
  //   el.parentNode?.removeChild(el);
  // }
  //或者控制显示隐藏
  hasPerm ? (el.style.display = "block") : (el.style.display = "none");
}

//mounted
const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isPermitted(el, binding);
};
//updated
const updated = (el: Element, binding: DirectiveBinding<any>) => {
  isPermitted(el, binding);
};
const permDirective: Directive = {
  mounted,
  updated,
};
//注册指令
export function setupPermDirective(app: App) {
  // 这将被作为 `mounted` 和 `updated` 调用
  app.directive("perm", permDirective);
}
export default permDirective;
