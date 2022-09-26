<!--
  - /*
  -  *    Copyright 2020-2021 Luter.me
  -  *
  -  *    Licensed under the Apache License, Version 2.0 (the "License");
  -  *    you may not use this file except in compliance with the License.
  -  *    You may obtain a copy of the License at
  -  *
  -  *      http://www.apache.org/licenses/LICENSE-2.0
  -  *
  -  *    Unless required by applicable law or agreed to in writing, software
  -  *    distributed under the License is distributed on an "AS IS" BASIS,
  -  *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  *    See the License for the specific language governing permissions and
  -  *    limitations under the License.
  -  */
  -->

<template>
  <div>
    <n-card size="small">
      <template #header>
        <n-h1>
          <n-gradient-text gradient="linear-gradient(90deg, red 10%, green 30%, blue 80%)">{{ appName }}
          </n-gradient-text>
        </n-h1>
      </template>
      <n-space>
        <n-h4 prefix="bar">
          <n-ul>
            <n-li>
              <n-text>{{ appName }} 的 精简版本。</n-text>
            </n-li>
            <n-li>
              <n-text type="primary">实现四种布局风格,暗黑主题，系统设置;</n-text>
            </n-li>
            <n-li>
              <n-text type="info">前后端动态路由和权限</n-text>
            </n-li>
            <n-li>
              <n-text type="success">自定义权限指令</n-text>
            </n-li>
            <n-li>
              <n-text type="warning">登录、注销、锁屏</n-text>
            </n-li>
            <n-li>
              <n-text type="warning">Mock 支持、自动组件注册、动态组件引用</n-text>
            </n-li>
            <n-li>
              <n-text type="error">除了基于 Iconify 的全局 Icon 插件外，其他多余依赖插件啥的一个没有。</n-text>
            </n-li>
          </n-ul>
        </n-h4>
      </n-space>
    </n-card>
    <div class="view-content">
      <n-card :title="`开发环境依赖(${data.devs.length})`" size="small">
        <n-descriptions size="small" label-placement="left" bordered :column="3">
          <n-descriptions-item v-for="item, index in data.devs" :key="index" :label="item.name"
            :label-style="{ fontWeight: 900 }">
            <n-text type="primary">{{ item.version }}</n-text>
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
      <n-card class="mt" :title="`生产环境依赖(${data.prods.length})`" size="small">
        <n-descriptions size="small" label-placement="left" bordered :column="3">
          <n-descriptions-item v-for="item, index in data.prods" :key="index" :label="item.name"
            :label-style="{ fontWeight: 900 }">
            <n-text type="primary">{{ item.version }}</n-text>
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAppConfig, getPackageConfig } from '@/config';
const devDependecies: any = getPackageConfig().devDependencies;
const prodDependecies: any = getPackageConfig().dependencies;
const appName = `${getAppConfig().VITE_APP_NAME}(${getPackageConfig().version})`;
const data = {
  devs: <any>[],
  prods: <any>[],
}
Object.keys(prodDependecies).map((key) => {
  data.prods.push({
    name: key,
    version: prodDependecies[key]
  })
})
Object.keys(devDependecies).map((key) => {
  data.devs.push({
    name: key,
    version: devDependecies[key]
  })
})
</script>
<style lang="css" scoped>
</style>
