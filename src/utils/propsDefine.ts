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

import { CSSProperties, VNodeChild } from "vue";
import { createTypes, VueTypeValidableDef, VueTypesInterface } from "vue-types";

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
  readonly trueBool: VueTypeValidableDef<boolean>;
};
/**
 * Props 类型定义
 */
const propDefine = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes;

propDefine.extend([
  {
    name: "style",
    getter: true,
    type: [String, Object],
    default: undefined,
  },
  {
    name: "VNodeChild",
    getter: true,
    type: undefined,
  },
]);
export { propDefine };
