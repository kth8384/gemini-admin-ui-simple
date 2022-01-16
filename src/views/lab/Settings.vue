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
  <div class="view-content">
    <n-card size="medium">
      <n-space>
        <n-button>Default</n-button>
        <n-button type="tertiary">Tertiary</n-button>
        <n-button type="primary">Primary</n-button>
        <n-button type="info">Info</n-button>
        <n-button type="success">Success</n-button>
        <n-button type="warning">Warning</n-button>
        <n-button type="error">Error</n-button>
      </n-space>
    </n-card>
    <n-grid class="view-content" :x-gap="10" :y-gap="5" :cols="2">
      <n-grid-item>
        <n-space justify="space-around">
          <n-h4>布局</n-h4>
          <n-select
            @update:value="onLayoutSelected"
            style="width: 200px;"
            v-model:value="data.layout"
            :options="data.layoutOptions"
          />
        </n-space>
        <n-space justify="space-around">
          <n-h4>侧边栏颜色</n-h4>
          <n-switch
            :value="settings.darkSider"
            @update:value="(value: boolean) => settings.setDarkSider(value)"
          >
            <template #checked>深色</template>
            <template #unchecked>浅色</template>
          </n-switch>
        </n-space>
        <n-space justify="space-around">
          <n-h4>侧边展开宽度</n-h4>
          <n-input-number
            :step="10"
            :min="100"
            :max="300"
            :update-value-on-input="false"
            :value="settings.siderWidth"
            @update:value="(value: number) => settings.setSiderWidth(value)"
          />
        </n-space>
        <n-space justify="space-around">
          <n-h4>侧边收起宽度</n-h4>
          <n-input-number
            :step="5"
            :min="40"
            :max="80"
            :update-value-on-input="false"
            :value="settings.siderCollapsedWidth"
            @update:value="(value: number) => settings.setSiderCollapsedWidth(value)"
          />
        </n-space>
      </n-grid-item>
      <n-grid-item>
        <n-space justify="space-around">
          <n-h4>深色主题</n-h4>
          <n-switch
            :value="settings.darkTheme"
            class="theme"
            @update:value="(value: boolean) => settings.setDarkTheme(value)"
          >
            <template #checked>
              <g-icon :icon="SysIcons.dark"></g-icon>
            </template>
            <template #unchecked>
              <g-icon color="#C5EB19" :icon="SysIcons.light"></g-icon>
            </template>
          </n-switch>
        </n-space>

        <n-space justify="space-around">
          <n-h4>顶部导航栏颜色</n-h4>
          <n-switch
            :value="settings.darkHeader"
            @update:value="(value: boolean) => settings.setDarkHeader(value)"
          >
            <template #checked>深色</template>
            <template #unchecked>浅色</template>
          </n-switch>
        </n-space>
        <n-space justify="space-around">
          <n-h4>足底颜色~</n-h4>
          <n-switch
            :value="settings.darkFooter"
            @update:value="(value: boolean) => settings.setDarkFooter(value)"
          >
            <template #checked>深色</template>
            <template #unchecked>浅色</template>
          </n-switch>
        </n-space>
      </n-grid-item>
    </n-grid>
    <n-card>
      <n-space justify="space-around">
        <n-h4>Primary 色</n-h4>
        <n-color-picker
          style="width:200px"
          :value="settings.primaryColor"
          @update:value="(value: string) => settings.setPrimaryColor(value)"
          :show-alpha="false"
          :swatches="[
            '#009688',
            '#2d8cf0',
            '#536dfe',
            '#ff5c93',
            '#ee4f12',
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#0960bd',
            '#000000',
            '#f0ff00',
            '#0084f4',
            '#0096c7',
            '#9c27b0',
            '#88ffdd',
            '#ff9800',
          ]"
        />
        <n-h4>Info色</n-h4>
        <n-color-picker
          style="width:200px"
          :value="settings.infoColor"
          @update:value="(value: string) => settings.setInfoColor(value)"
          :show-alpha="false"
          :swatches="[
            '#009688',
            '#2d8cf0',
            '#536dfe',
            '#ff5c93',
            '#ee4f12',
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#0960bd',
            '#000000',
            '#f0ff00',
            '#0084f4',
            '#0096c7',
            '#9c27b0',
            '#88ffdd',
            '#ff9800',
          ]"
        />
      </n-space>
      <n-space justify="space-around">
        <n-h4>Success 色</n-h4>
        <n-color-picker
          style="width:200px"
          :value="settings.successColor"
          @update:value="(value: string) => settings.setSuccessColor(value)"
          :show-alpha="false"
          :swatches="[
            '#009688',
            '#2d8cf0',
            '#536dfe',
            '#ff5c93',
            '#ee4f12',
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#0960bd',
            '#000000',
            '#f0ff00',
            '#0084f4',
            '#0096c7',
            '#9c27b0',
            '#88ffdd',
            '#ff9800',
          ]"
        />
        <n-h4>Warning 色</n-h4>
        <n-color-picker
          style="width:200px"
          :value="settings.warningColor"
          @update:value="(value: string) => settings.setWarningColor(value)"
          :show-alpha="false"
          :swatches="[
            '#009688',
            '#2d8cf0',
            '#536dfe',
            '#ff5c93',
            '#ee4f12',
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#0960bd',
            '#000000',
            '#f0ff00',
            '#0084f4',
            '#0096c7',
            '#9c27b0',
            '#88ffdd',
            '#ff9800',
          ]"
        />
        <n-h4>Error 色</n-h4>
        <n-color-picker
          style="width:200px"
          :value="settings.errorColor"
          @update:value="(value: string) => settings.setErrorColor(value)"
          :show-alpha="false"
          :swatches="[
            '#009688',
            '#2d8cf0',
            '#536dfe',
            '#ff5c93',
            '#ee4f12',
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#0960bd',
            '#000000',
            '#f0ff00',
            '#0084f4',
            '#0096c7',
            '#9c27b0',
            '#88ffdd',
            '#ff9800',
          ]"
        />
      </n-space>
    </n-card>
    <n-blockquote align-text>
      <n-list bordered>
        <n-list-item>可以用 utils/storage.ts 持久化设置参数</n-list-item>
        <n-list-item>
          这个页面的内容都扔右侧
          <n-a @click="appStore.setShowSettingDrawer(true)">drawer 弹出层</n-a>里去设置
        </n-list-item>
      </n-list>
    </n-blockquote>
  </div>
</template>
<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings";
import { SysIcons } from "@/enum/iconEnum";
import { useAppStore } from "@/store/modules/app";

const settings = useSettingsStore();
const appStore = useAppStore()
const data = reactive({
  layout: settings.layout,
  layoutOptions: [
    {
      label: '垂直布局',
      value: 'vertical'
    },
    {
      label: '通栏垂直布局',
      value: 'mixVertical'
    },
    {
      label: '顶部导航菜单模式',
      value: 'horizontal'
    },
    {
      label: '画廊导航菜单模式',
      value: 'gallary'
    },
  ]
})
const onLayoutSelected = (value: string) => {
  settings.setLayout(value);
}
</script>
<style lang="scss" scoped>
</style>
