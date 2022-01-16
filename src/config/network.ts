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

export default {
  //后台需要的 token 参数名字
  tokenName: "gemini-token",
  // 默认的接口地址 如果是开发环境和生产环境走mock-server，当然你也可以选择自己配置成需要的接口地址
  baseURL: import.meta.env.DEV ? "/api" : "/api",
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //form data 形式提交数据
  formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
  //文件上传形式请求类型
  multipartContentType: "multipart/form-data;charset=UTF-8",
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 30000,
  //操作正常code，支持String、Array、int多种类型,这个需要根据后台接口调整
  successCode: [200, 0, -1],
};
