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

import { PaginationDataType } from "../../typings/http";
import { getRequest, postRequest } from "@/utils/request";
export interface PetCatModel {
  id: string;
  name: string;
  nickname: string;
  birthday: string;
  gender: string;
  age: number;
}

export function getPetCatList(params: any) {
  return getRequest<PaginationDataType<PetCatModel>>({
    url: "/pet/cat/list",
    params: params,
  });
}
export function getPetCatById(id: string | number) {
  return getRequest<PetCatModel>({
    url: "/pet/cat/detail",
    params: { id: id },
  });
}
export function savePetCat(data: any) {
  return postRequest<PetCatModel>({
    url: "/pet/cat/save",
    data: data,
  });
}
