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

/**
 * http 返回数据结构，成功后一般不需要返回这种格式，直接返回数据即可
 *
 * 这个结构体是出现错误后，返回错误信息用的
 *
 */
export interface HttpResponseType<T = any> {
  code: number;
  msg: string;
  error?: string;
  data?: T;
}
/**
 * 分页数据返回格式
 */
export interface PaginationDataType<T = any> {
  records: Array<T>;
  page?: number;
  size?: number;
  total: number;
  totalPages?: number;
  recordCount?: number;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
}
/**
 * 上传文件的参数配置
 */
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
