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
  <n-layout :native-scrollbar="false" :has-sider="true" class="layout">
    <n-el
      class="gallary-layout"
      :class="settings.darkTheme || settings.darkSider ? 'dark' : 'light'"
    >
      <!-- 侧边栏 也就是一级目录 -->
      <div
        :style="{
          width: settings.siderCollapsed ? data.siderOpenWidth + 'px' : settings.siderCollapsedWidth + 'px',
        }"
        class="sider duration ease-in-out"
      >
        <!-- 顶部 logo -->
        <div class="header">
          <g-logo v-if="settings.showBanner"></g-logo>
        </div>
        <!-- 中间一级菜单 -->
        <div class="content">
          <n-scrollbar>
            <div
              v-for="route in firstLevelMenus"
              :key="route.path"
              @click="onMenuClick(route)"
              class="sider-item"
              :class="data.firstLevelSelectedRoute.name === route.name ? 'active-item' : ''"
            >
              <!-- 收缩后显示 tooltip -->
              <n-tooltip :style="{ maxWidth: '160px' }" placement="right" trigger="hover">
                <template #trigger>
                  <g-icon :size="18" :icon="route.meta?.icon"></g-icon>
                </template>
                {{ $t("route." + route.name) }}
              </n-tooltip>
              <!-- 图标下的文本，超长后截断 -->
              <n-ellipsis
                v-if="settings.siderCollapsed || settings.siderCollapsedWidth > data.siderOpenWidth - 10"
                :style="{ maxWidth: data.siderOpenWidth - 10 + 'px' }"
              >{{ $t("route." + route.name) }}</n-ellipsis>
            </div>
          </n-scrollbar>
        </div>
        <!-- 底部收缩按钮 -->
        <div class="footer-icon">
          <n-tooltip placement="right-start" trigger="hover">
            <template #trigger>
              <g-icon
                @click="settings.setSiderCollapsed(!settings.getSiderCollapsed)"
                :size="18"
                :icon="settings.siderCollapsed ? SysIcons.collpsedLeft : SysIcons.expandRight"
              ></g-icon>
            </template>
            {{ settings.siderCollapsed ? $t("ui.common.collapsed") : $t("ui.common.expanded") }}
          </n-tooltip>
        </div>
      </div>
      <!-- 目录菜单，也就是二级和以下的 Menu -->
      <div
        :style="{ width: data.isFixed ? settings.siderWidth + 'px' : 0 }"
        class="menu-wrapper duration ease-in-out"
      >
        <div
          style="z-index: 10"
          @mouseleave="data.isShowMenu = data.isFixed || false"
          :style="{ width: data.isShowMenu ? settings.siderWidth + 'px' : '0' }"
          class="menu-content duration ease-in-out"
        >
          <!-- 顶部 Banner 区域 -->
          <header>
            <!-- 系统标题 -->
            <span v-if="data.isShowMenu" class="title">
              <g-title v-if="settings.showBanner"></g-title>
            </span>
            <!-- 固定浮动按钮 -->
            <span @click.stop="data.isFixed = !data.isFixed" class="pin-icon">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <g-icon
                    :color="settings.darkSider || settings.darkTheme ? 'white' : 'black'"
                    :icon="data.isFixed ? SysIcons.pin : SysIcons.pinOff"
                  ></g-icon>
                </template>
                {{ data.isFixed ? $t("ui.common.fixed") : $t("ui.common.float") }}
              </n-tooltip>
            </span>
          </header>
          <!-- 二级菜单 -->
          <div class="memus">
            <n-scrollbar>
              <g-menu :accordion="false" :inverted="settings.darkSider" :options="data.menus"></g-menu>
            </n-scrollbar>
          </div>
        </div>
      </div>
    </n-el>
    <n-layout-content :native-scrollbar="false">
      <n-layout :native-scrollbar="false" position="absolute">
        <n-layout-header bordered :inverted="false">
          <g-header hide-logo hide-title></g-header>
        </n-layout-header>
        <n-layout position="absolute" class="header">
          <n-layout-header v-if="settings.showTabsBar" bordered>
            <g-tabs></g-tabs>
          </n-layout-header>
          <n-layout-content
            :native-scrollbar="false"
            position="absolute"
            :class="[settings.showTabsBar ? 'content' : '', settings.showFooter ? 'footer' : '']"
          >
            <g-content></g-content>
            <n-back-top :right="40" :bottom="120" />
          </n-layout-content>
          <n-layout-footer
            v-show="settings.showFooter"
            :inverted="settings.darkFooter"
            bordered
            position="absolute"
          >
            <g-footer></g-footer>
          </n-layout-footer>
        </n-layout>
      </n-layout>
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import { useRouterStore } from "@/store/modules/router";
import { useSettingsStore } from "@/store/modules/settings";
import { GLogo, GTitle } from "../components/header/components";
import { GMenu, GFooter, GHeader, GTabs, GContent } from "..";
import { SysIcons } from '@/enum/iconEnum'
import { getThemeConfig } from "@/config";
const routerStore = useRouterStore();
const settings = useSettingsStore();
const currentRoute = useRoute();
const data = reactive({
  isShowMenu: false,
  isFixed: false,
  siderOpenWidth: getThemeConfig().gallarySiderOpenWidth,
  firstLevelSelectedRoute: {} as any,
  menus: [] as any[],
});
//第一级菜单
const firstLevelMenus = computed(() => {
  return routerStore.getMenus.map((route: any) => route);
});
//过滤一级菜单的下级菜单
const getMenuChildrens = (name: any): any[] => {
  const data: any = routerStore.menus.find((item) => item.name == name);
  return data?.children;
};
//一级菜单点击
const router = useRouter()
const onMenuClick = (route: any) => {
  data.menus = getMenuChildrens(route.name);
  //有子菜单，显示弹层
  if (data.menus && data.menus.length) {
    data.isShowMenu = true;
  } else {
    //没子菜单，那就把弹层收回来，然后跳转自己
    data.isFixed = false;
    data.isShowMenu = false;
    router.push({ name: route.name });
  }
  data.firstLevelSelectedRoute = route;
};
//路由变动的时候高亮选中的一级菜单
watch(
  () => currentRoute.path,
  () => {
    //当前路由链里拿第一个就是上级节点
    const matched = currentRoute.matched[0];
    //匹配到
    if (matched) {
      console.log("router matched", matched);
      let levelOneMenu = firstLevelMenus.value.find((item) => item.name == matched.name);
      //如果有下级，并且就一个，那高亮的就是这第一个，这个与 routerHepler.filterMenuRoutes()里逻辑对应
      if (matched.children && matched.children.length === 1) {
        levelOneMenu = matched.children[0];
        data.isFixed = false;
        data.isShowMenu = false;
      }
      if (matched.children && matched.children.length > 1) {
        data.isFixed = true;
        data.isShowMenu = true;
      }
      //在一级菜单里找这个名字的路由
      console.log('一级菜单', levelOneMenu);
      //拿得到顶级路由，而且显示在一级菜单里了
      if (levelOneMenu) {
        //选中一级菜单
        data.firstLevelSelectedRoute = levelOneMenu;
        //拿到这个一级菜单下的子菜单，这样子菜单也就可以选中了
        data.menus = getMenuChildrens(levelOneMenu.name);
      } else {
        data.firstLevelSelectedRoute = {};
      }

    }
  },
  { immediate: true }
);
const headerHeight = getThemeConfig().headerHeight;
const tabHeight = getThemeConfig().tabHeight;
const footerHeight = getThemeConfig().footerHeight;
const bannerHeight = getThemeConfig().bannerHeight;
</script>
<style lang="scss" scoped>
$logo-height: v-bind(bannerHeight);
.layout {
  .content {
    top: v-bind(tabHeight);
  }
  .header {
    top: v-bind(headerHeight);
  }
  .footer {
    bottom: v-bind(footerHeight);
  }
  .gallary-layout {
    display: flex;
    flex-direction: row;
    .sider {
      background: var(--base-color);
      box-shadow: var(--box-shadow);
      .header {
        height: $logo-height;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: var(--box-shadow);
      }
      .content {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        box-shadow: var(--box-shadow-2);
        overflow: hidden;
        align-items: center;
        justify-content: center;
        height: calc(100vh - $logo-height - (v-bind(footerHeight)));
        border-right: 1px solid var(--border-color);
        .sider-item {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: $base-width;
        }
        .active-item {
          font-weight: bolder;
          background: rgba(0, 0, 0, 0.2);
          margin-left: 0;
          border-radius: var(--border-radius);
        }
      }
      .footer-icon {
        color: var(--primary-color);
        height: v-bind(footerHeight);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
    .menu-wrapper {
      position: relative;
      height: 100%;
      .menu-content {
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
        overflow: hidden;
        height: 100%;
        position: absolute;
        header {
          height: $logo-height;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          -webkit-justify-content: space-between;
          justify-content: space-between;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          .title {
            color: var(--primary-color);
            font-size: var(--font-size-huge);
            font-weight: 600;
            margin: 0;
            max-width: 200px;
          }
          .pin-icon {
            padding-left: $base-width;
            padding-right: $base-width;
            font-size: var(--font-size-huge);
            line-height: 1;
            cursor: pointer;
          }
        }
        .memus {
          margin-top: calc($base-width * 2);
          -webkit-box-flex: 1;
          -ms-flex: 1 1 0%;
          -webkit-flex: 1 1 0%;
          flex: 1 1 0%;
          overflow: hidden;
        }
      }
    }
  }

  .dark {
    $darkLightColor: #ddd;
    $darkBorderColor: #2a2929;
    $bgColor: rgb(24, 24, 28);
    .sider {
      background: $bgColor;
      .content {
        border-right: 1px solid $darkBorderColor;
        .sider-item {
          color: $darkLightColor;
        }
        .active-item {
          background: var(--primary-color);
        }
      }
      .footer-icon {
        border-top: 1px solid $darkBorderColor;
        border-right: 1px solid $darkBorderColor;
        background: $bgColor;
      }
    }
    .menu-wrapper {
      background: $bgColor;
      .menu-content {
        background: $bgColor;
      }
      header {
        border-bottom: 1px solid $darkBorderColor;
        .pin-icon {
          i {
            color: $darkLightColor;
          }
        }
      }
    }
  }
  .light {
    $bgColor: #fff;
    .sider {
      background: $bgColor;
      .content {
        border-right: 1px solid var(--border-color);
        .sider-item {
          color: var(--text-color);
        }
        .active-item {
          background: var(--primary-color);
          color: $bgColor;
        }
      }
      .footer-icon {
        border-top: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
        background: $bgColor;
      }
    }
    .menu-wrapper {
      background: $bgColor;
      .menu-content {
        background: $bgColor;
      }
      header {
        border-bottom: 1px solid var(--border-color);
        .pin-icon {
          i {
            color: var(--text-color-base);
          }
        }
      }
    }
  }
  // 公共样式
  .duration {
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }
  .ease-in-out {
    -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  *,
  :before,
  :after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
  }
}
</style>
