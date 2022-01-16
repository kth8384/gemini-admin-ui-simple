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

///自己定义的
declare interface Window {
  $loadingBar: any;
  $message: any;
  $notify: any;
  $dialog: any;
}
declare type TargetContext = "_self" | "_blank";
declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;

declare type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = "_self" | "_blank";

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
/**
 * env 环境参数格式定义
 */
declare interface EnvConfigType {
  VITE_PORT: number;
  VITE_APP_NAME: string;
  VITE_ENABLE_MOCK: boolean;
  VITE_SERVER_ROUTE: boolean;
  VITE_RECORD_LAST_ROUTE: boolean;
  VITE_API_BASE_URL: string;
  VITE_BUILD_COMPRESS_STRATEGY: "gzip" | "brotli" | "none";
  VITE_BUILD_DELETE_ORIGIN_FILE: boolean;
}
