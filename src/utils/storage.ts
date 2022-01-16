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

interface StorageInterface {
  //设置localStorage
  set: (key: string, value: any) => void;
  setBase64: (key: string, value: any) => void;
  //获取localStorage,默认会自动转json
  get: (key: string) => string;
  getBase64: (key: string) => string;
  //按 json 格式获取
  getJson: (key: string) => Record<string, any>;
  getJsonBase64: (key: string) => Record<string, any>;
  //是否含有key
  has: (key: string, isJson?: boolean) => boolean;
  //移除
  remove: (key: string) => void;
}
Storage.prototype.setExpire = (key: string, value: any, expire: any) => {
  const obj = {
    data: value,
    time: Date.now(),
    expire: expire || 10000,
  };
  localStorage.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getExpire = (key: string) => {
  const val = localStorage.getItem(key);
  if (!val) {
    return val;
  }
  const jsonObj = JSON.parse(val);
  //现在时间减去存入时间，超过了 expire，则认为过期，自动清理
  if (Date.now() - jsonObj.time > jsonObj.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return jsonObj.data;
};
interface SessionStorageInterface extends StorageInterface {
  //提供session操作接口
  session: StorageInterface;
}

const storage: SessionStorageInterface = {} as SessionStorageInterface;

//加方法
const extend = (s: Storage): StorageInterface => {
  return {
    set(key, value) {
      if (typeof value == "object") {
        s.setItem(key, JSON.stringify(value));
      } else {
        s.setItem(key, value);
      }
      if (value == undefined || value == null) {
        s.removeItem(key);
      }
    },
    setBase64(key, value) {
      if (typeof value == "object") {
        s.setItem(key, window.btoa(JSON.stringify(value)));
      } else {
        s.setItem(key, window.btoa(value));
      }
      if (value == undefined || value == null) {
        s.removeItem(key);
      }
    },
    getJson(key) {
      const item = s.getItem(key) as string;
      try {
        const ret = JSON.parse(item);
        //JSON.parse 可以转基本类型，不报错。。。，所以这里判断一下
        if (typeof ret !== "object") {
          return undefined;
        }
        return ret;
      } catch (e) {
        //解析出错,则证明不是json字符串，返回undefined
        return undefined;
      }
    },
    getJsonBase64(key) {
      const item = s.getItem(key) as string;
      try {
        const ret = JSON.parse(window.atob(item));
        //JSON.parse 可以转基本类型，不报错。。。，所以这里判断一下
        if (typeof ret !== "object") {
          return undefined;
        }
        return ret;
      } catch (e) {
        //解析出错,则证明不是json字符串，返回undefined
        return undefined;
      }
    },
    get(key) {
      return s.getItem(key) as string;
    },
    getBase64(key) {
      const value = s.getItem(key) as string;
      return window.atob(value);
    },
    has(key) {
      return !!(this.get(key) as string);
    },
    remove: (key) => {
      s.removeItem(key);
    },
  };
};

Object.assign(storage, extend(window.localStorage));
Object.assign(storage, {
  session: extend(window.sessionStorage),
});
export default storage;
