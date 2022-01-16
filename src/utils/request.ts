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

import { getAppConfig } from "@/config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import networkSetting from "@/config/network";
import qs from "qs";
import { throttleAdapterEnhancer, cacheAdapterEnhancer, retryAdapterEnhancer } from "axios-extensions";
import { useUserStoreOutSetUp } from "@/store/modules/user";
import { Recordable } from "vite-plugin-mock";
import network from "@/config/network";
import { UploadFileParams } from "../../typings/http";
const instance = axios.create({
  baseURL: getAppConfig().VITE_API_BASE_URL,
  timeout: networkSetting.requestTimeout || 15000,
  // 请求携带Cookies凭证
  withCredentials: true,
  //默认的请求headers
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": networkSetting.contentType || "application/json;charset=UTF-8",
  },
  //适配器
  adapter: throttleAdapterEnhancer(
    //重试
    retryAdapterEnhancer(
      //缓存请求内容
      cacheAdapterEnhancer(axios.defaults.adapter as any, {
        //请求缓存开关
        enabledByDefault: false,
        //缓存 key
        // cacheFlag: "cache",
        //默认LRU缓存,10秒，最大缓存 100 个
        // defaultCache: new LRUCache({ maxAge: 1000 * 10, max: 100 }),
      }),
      //重试次数 ，当 ajax 返回失败后，马上重试times次
      //http.get('/xxx/yyy', { retryTimes: 3 });
      { times: 0 }
    ),
    //防抖 同一个get请求，threshold毫秒只能点击请求一次
    {
      //间隔时长，1000 毫秒
      threshold: 1000,
      //缓存实现，max:最多缓存几个请求
      // cache: new LRUCache({ max: 10 }),
    }
  ),
});
/**
 * 请求预处理
 */
instance.interceptors.request.use(
  (config: Recordable) => {
    //设置默认请求方式
    if (!config.method) {
      config.method = "get";
    }
    //要是有 token,就带到 header里面
    const userStore = useUserStoreOutSetUp();
    if (userStore.getToken) {
      config.headers[networkSetting.tokenName] = userStore.getToken;
    }
    //FormData 提交，转一下
    if (config.data && config.form === true) {
      config.headers["Content-Type"] = networkSetting.formContentType;
      config.data = qs.stringify(config.data);
    }
    //如果是 get请求，则不缓存
    const url = config.url as string;
    if (config.method && config.method.toLowerCase() === "get") {
      url.indexOf("?") === -1
        ? (config.url = url + "?_=" + new Date().getTime())
        : (config.url = url + "&_=" + new Date().getTime());
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const handleError = (response: any) => {
  const { status, statusText, data, config } = response;
  console.error("===错误处理===", status, statusText, config.url, data);
};
/**
 * 响应统一处理
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    return data;
  },
  (error) => {
    if (error.response) {
      handleError(error.response);
      return Promise.reject(error.response);
    } else {
      //网络代理层面的其他异常
      const { message } = error;
      console.error("请求错误:", message);
      return Promise.reject(error);
    }
  }
);
export function getRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
  return instance.request({ ...config, method: "GET" });
}
export function postRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
  return instance.request({ ...config, method: "POST" });
}
export function putRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
  return instance.request({ ...config, method: "PUT" });
}
export function deleteRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
  return instance.request({ ...config, method: "DELETE" });
}
export function uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
  const formData = new window.FormData();
  const customFilename = params.name || "file";

  if (params.filename) {
    formData.append(customFilename, params.file, params.filename);
  } else {
    formData.append(customFilename, params.file);
  }

  if (params.data) {
    Object.keys(params.data).forEach((key) => {
      const value = params.data![key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
        return;
      }

      formData.append(key, params.data![key]);
    });
  }

  return instance.request<T>({
    ...config,
    method: "POST",
    data: formData,
    headers: {
      "Content-type": network.multipartContentType,
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
}

export default instance;
