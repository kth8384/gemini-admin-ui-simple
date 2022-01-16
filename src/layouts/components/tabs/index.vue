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
    <n-el class="tabbar">
        <div
            :class="data.isPre ? '' : 'disabled'"
            class="tabbar-oper"
            @click="scrollTabbar('prev')"
            v-if="data.isScroll"
        >
            <g-icon :icon="SysIcons.left"></g-icon>
        </div>
        <div ref="containerElement" class="tabbar-container">
            <ul ref="tabbarElement" class="tab-list">
                <template v-for="(item) in tabsStore.getTabs" :key="item.name">
                    <li
                        :class="['tab-item', data.activeKey === item.path && 'is-active']"
                        @click="changeTab(item)"
                        @contextmenu="handleContextMenu($event, item)"
                    >
                        <g-icon class="tab-icon" :icon="item.meta?.icon"></g-icon>
                        <div class="tab-text">{{ $t("route." + item.name) }}</div>
                        <div class="tab-close" v-if="item.meta?.affix !== true">
                            <g-icon
                                size="12"
                                @click.stop="closeCurrentTab(item)"
                                :icon="SysIcons.close"
                            ></g-icon>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
        <div
            :class="data.isNext ? '' : 'disabled'"
            class="tabbar-oper"
            @click="scrollTabbar('next')"
            v-if="data.isScroll"
        >
            <g-icon :icon="SysIcons.right"></g-icon>
        </div>
        <n-dropdown
            :show="data.showDropdown"
            :x="data.dropdownX"
            :y="data.dropdownY"
            @clickoutside="onClickOutside"
            placement="bottom-start"
            @select="contexMenutHandleSelect"
            :render-icon="(item: any) => renderIconifyIcon(item.icon, item.color, 14)"
            :options="TabsMenuOptions"
        />
    </n-el>
</template>
<script setup lang="ts">
import config, { getThemeConfig } from "@/config";
import { SysIcons } from "@/enum/iconEnum";
import { useNaive } from "@/hooks/useNaive";
import { filterAffixTabs } from "@/router/routerHelper";
import { useTabsStore } from "@/store/modules/tabs";
import { useRoute } from "vue-router";
import { renderIconifyIcon } from '@/components/GIcon';
import { useRedirect } from "@/hooks/useRedirect";
const currentRoute = useRoute();
const tabsStore = useTabsStore();
const router = useRouter();
const containerElement = ref(), tabbarElement = ref();
const data = reactive({
    isScroll: false,
    isPre: false,
    isNext: false,
    //当前页面的path
    activeKey: "",
    //右键菜单
    dropdownX: 0,
    dropdownY: 0,
    showDropdown: false,
});
//右键的时候判断是否是当前 tab
const isCurrent = ref(data.activeKey != currentRoute.path);
//tabs 右侧下拉菜单
const { themeVars } = useNaive();

const TabsMenuOptions = computed((): any => {
    return [
        {
            label: "刷新本页",
            key: "1",
            disabled: !isCurrent.value,
            icon: SysIcons.refresh,
            color: themeVars.successColor
        },
        {
            label: "关闭本页",
            key: "2",
            disabled: !isCurrent.value || currentRoute.meta?.affix,
            icon: SysIcons.close,
            color: themeVars.errorColor
        },
        {
            label: "关闭其他",
            key: "3",
            icon: "fa-solid:times-circle",
            color: themeVars.errorColor
        },
        {
            label: "关闭全部",
            key: "4",
            icon: "fa-solid:minus",
            color: themeVars.errorColor
        },
    ];
});
//右键菜单选项
const contexMenutHandleSelect = (key: any) => {
    switch (key) {
        //刷新本页
        case "1":
            reloadPage();
            break;
        //关闭本页
        case "2":
            closeCurrentTab({ path: data.activeKey });
            break;
        //关闭其他
        case "3":
            closeOther({ path: data.activeKey });
            break;
        //关闭所有
        case "4":
            closeAll();
            break;
    }
    // updateNavScroll();
    data.showDropdown = false;
};
//点其他区域右键菜单收起
const onClickOutside = () => {
    data.showDropdown = false;
};
//右键点击事件
function handleContextMenu(e: any, item: any) {
    e.preventDefault();
    // if (item.meta && item.meta.affix === true) return;
    //右键点击就选中，用来判断是否禁用刷新本页
    isCurrent.value = data.activeKey === item.path;
    data.showDropdown = false;
    nextTick().then(() => {
        data.showDropdown = true;
        data.dropdownX = e.clientX;
        data.dropdownY = e.clientY;
    });
}
//刷新页面
const reloadPage = async () => {
    const { currentRoute } = router;
    const route: any = unref(currentRoute);
    tabsStore.closeCurrentTabs(route);
    const redirectTo = useRedirect(router);
    await redirectTo();
};
// 关闭全部
const closeAll = () => {
    tabsStore.closeAllTabs();
    toLastTag();
};
// 关闭其他
const closeOther = (route: any) => {
    tabsStore.closeOtherTabs(route);
    router.push(route.path);
    data.activeKey = route.path;
    scrollTab();
};
// 选择标签
const changeTab = (element: any) => {
    const { path } = element;
    //点的就是本页，啥也不干
    if (path === currentRoute.path) {
        return;
    }
    data.activeKey = path;
    router.push(path);
    scrollTab();
};
const closeCurrentTab = (element: any) => {
    tabsStore.closeCurrentTabs(element);
    toLastTag();
};
//到上一个访问的页面
function toLastTag() {
    //拿到最后一个
    const latestView = tabsStore.getTabs.slice(-1)[0];
    console.error("最后一个 tab", latestView);
    if (latestView) {
        router.push(latestView);
        data.activeKey = latestView.path;
    } else {
        //最后一个没有，就找设置为固定的 tab
        const affixRoutes = filterAffixTabs(router.getRoutes());
        if (affixRoutes && affixRoutes.length) {
            router.push(affixRoutes[0]);
            tabsStore.addTab(affixRoutes[0]);
            data.activeKey = affixRoutes[0].path;
        } else {
            //还没有，就打开首页
            router.push(config.app.PAGE_HOME_PATH);
            data.activeKey = config.app.PAGE_HOME_PATH;
        }
    }
    scrollTab();
}
const getSimpleRoute = (route: any) => {
    const { fullPath, hash, meta, name, params, path, query } = route;
    return { fullPath, hash, meta, name, params, path, query };
};
//初始化
(() => {
    //要是打开过，就不初始化了
    if (tabsStore.getTabs && tabsStore.getTabs.length > 0) return;
    try {
        //所有路由
        const allRoutes = router.getRoutes();
        //不能关闭的
        const affixRoutes = filterAffixTabs(allRoutes);
        console.log("初始化 Tabs,默认打开页面:", affixRoutes);
        //不能关闭的提交 vuex
        tabsStore.setTabs(affixRoutes);
    } catch (e) {
        tabsStore.addTab(getSimpleRoute(currentRoute));
    }
})();
// 滚动标签
const scrollTab = async () => {
    await nextTick();
    const el = {
        container: containerElement.value,
        tabbar: tabbarElement.value,
        activeTab: containerElement.value.querySelector("li.is-active"),
        lastTab: containerElement.value.querySelector("li:last-child")
    }
    if (el.tabbar.scrollWidth > el.container.clientWidth) {
        data.isScroll = true;
        // 等待箭头元素出现后再计算
        const rect = {
            container: el.container.getBoundingClientRect(), // 外层容器
            tabbar: el.tabbar.getBoundingClientRect(), // 标签栏
            activeTab: el.activeTab?.getBoundingClientRect(), // 标签栏中被选中的标签
            lastTab: el.lastTab?.getBoundingClientRect() // 标签栏中最后一个标签
        }

        if (rect.activeTab && rect.lastTab) {
            let tabbarOffset = rect.container.left - rect.tabbar.left, // 计算标签栏偏移容器距离
                activeTabOffsetLeft = rect.container.left - rect.activeTab.left, // 计算标签偏移容器左边的距离
                activeTabOffsetRight = rect.activeTab.right - rect.container.right; // 计算标签偏移容器右边的距离
            // 计算最后一个标签和容器最右边之间的距离
            const lastOffset = rect.container.right - rect.lastTab.right;
            console.log('位置', tabbarOffset, activeTabOffsetLeft, activeTabOffsetRight, lastOffset);
            if (activeTabOffsetLeft < lastOffset) {
                activeTabOffsetLeft += lastOffset - activeTabOffsetLeft;
            }
            // 判断标签是否超出父元素左边界
            if (activeTabOffsetLeft > 0) {
                const scrollX = tabbarOffset - activeTabOffsetLeft;
                el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";
            }
            // 判断标签是否超出父元素右边界
            if (activeTabOffsetRight > 0) {
                const scrollX = tabbarOffset + activeTabOffsetRight;
                el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";
            }
            data.isNext = activeTabOffsetRight > 0
            data.isPre = tabbarOffset > 0
        }
    } else {
        data.isScroll = false;
        el.tabbar.style.transform = "translate3d(0,0,0)";
    }
}

// 滚动标签栏
const scrollTabbar = (direction: "prev" | "next") => {
    const el = {
        container: containerElement.value,
        tabbar: tabbarElement.value,
        lastTab: containerElement.value.querySelector("li:last-child")
    }

    const rect = {
        container: el.container.getBoundingClientRect(), // 外层容器
        tabbar: el.tabbar.getBoundingClientRect(), // 标签栏
        lastTab: el.lastTab?.getBoundingClientRect() // 标签栏中最后一个标签
    }
    if (rect.lastTab) {
        const barOffsetLeft = rect.container.left - rect.tabbar.left, // 计算标签栏偏移容器距离
            barOffsetRight = rect.lastTab.right - rect.container.right; // 计算标签偏移容器右边的距离
        console.log('left:right', barOffsetLeft, barOffsetRight, rect.lastTab.width)
        data.isNext = barOffsetRight > 0
        data.isPre = barOffsetLeft > 0
        // 判断标签栏是否超出父元素左边界(前进)
        if (direction === "prev" && barOffsetLeft > 0) {
            let scrollX = 0;
            // 每次滚动的最长距离为容器宽度
            if (barOffsetLeft > el.container.clientWidth) {
                scrollX = barOffsetLeft - el.container.clientWidth;
            }
            el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";
            data.isNext = true
        }
        // 判断标签栏是否超出父元素右边界(后退)
        if (direction === "next" && barOffsetRight > 0) {
            let scrollX = barOffsetLeft + barOffsetRight;
            // 每次滚动的最长距离为容器宽度
            if (barOffsetRight > el.container.clientWidth) {
                scrollX = barOffsetLeft + el.container.clientWidth;
            }
            el.tabbar.style.transform = "translate3d(-" + scrollX + "px,0,0)";

            data.isPre = true
        }

    }
}
///监听路由变化,路由跳转后加入 tab
watch(
    () => currentRoute.path,
    (to) => {
        if (!config.app.WHITE_LIST.includes(to)) {
            data.activeKey = to;
            tabsStore.addTab(getSimpleRoute(currentRoute));
            scrollTab();
        }
    },
    { immediate: true }
);
const tabHeight = getThemeConfig().tabHeight;
</script>
<style lang="scss" scoped>
.tabbar {
    background: var(--body-color);
    display: flex;
    align-items: center;
    width: 100%;
    height: v-bind(tabHeight);
    max-height: v-bind(tabHeight);
    @mixin operBtn {
        display: flex;
        height: v-bind(tabHeight);
        max-height: v-bind(tabHeight);
        background: var(--base-color);
        align-items: center;
        line-height: 0;
        justify-content: center;
        cursor: pointer;
        font-weight: var(--font-weight-strong);
        min-width: calc($base-width * 3);
    }
    &-oper {
        @include operBtn;
        &:hover {
            color: var(--primary-color);
        }
    }
    .disabled {
        cursor: not-allowed;
        i {
            pointer-events: none;
        }
        &:hover {
            color: rgb(96, 99, 102);
        }
    }
    &-container {
        flex: 1;
        overflow: hidden;
        padding: 0;
        margin: 0;

        .tab-list {
            display: flex;
            white-space: nowrap;
            transition: transform 200ms;
            padding: 0;
            margin: 0;
        }

        .tab-item {
            display: flex;
            align-items: stretch;
            cursor: pointer;
            border-top-left-radius: calc($base-width / 2);
            border-top-right-radius: calc($base-width / 2);
            background: var(--base-color);
            height: calc(v-bind(tabHeight) - 5px);
            margin-left: calc($base-width / 2);
            justify-content: center;
            font-size: var(--font-size);
            .tab-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-left: $base-width;
            }
            .tab-text {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 $base-width;
                &:last-child:first-child {
                    padding-right: $base-width;
                }
            }

            .tab-close {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-right: calc($base-width / 2);
                span {
                    height: calc($base-width * 1.7);
                    width: calc($base-width * 1.7);
                    font-size: var(--font-size-small);
                    justify-content: center;
                    display: flex;
                    align-items: center;
                    color: var(--error-color);
                    &:hover {
                        background: rgb(226, 230, 222);
                        border-radius: 50%;
                    }
                }
            }
        }

        .is-active {
            .tab-text {
                color: var(--primary-color);
                font-weight: 900;
            }

            .tab-close {
                color: var(--error-color);
            }
        }
    }
    .drag {
        display: flex;
    }
}
</style>