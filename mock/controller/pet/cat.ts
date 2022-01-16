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

import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
import { responsePageData } from "../../mockUtli";
const List: any[] = [];
const count = 1000;
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@id",
      name: "@name",
      nickname: "@last",
      birthday: "@date",
      "gender|1": ["公", "母", "不清楚"],
      age: "@integer(1, 30)",
    })
  );
}
export default [
  {
    url: "/api/pet/cat/list",
    method: "get",
    response(config: { query: any }) {
      const { page, size, name } = config.query;
      console.log("参数", config.query);
      const mockList = List.filter((item) => {
        return !(name && item.name.indexOf(name) < 0);
      });
      const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1));
      return responsePageData(pageList, mockList.length, page, size);
    },
  },
  {
    url: "/api/pet/cat/detail",
    method: "get",
    response(config: { query: any }) {
      const Random = Mock.Random;

      const { id } = config.query;
      return {
        id: id,
        name: Random.name(),
        age: Random.integer(1, 30),
      };
    },
  },
  {
    url: "/api/pet/cat/save",
    method: "post",
    response(config: any) {
      const data = config.body;
      return data;
    },
  },
] as MockMethod[];
