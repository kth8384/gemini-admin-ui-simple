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
  <div class="cat-view-content">
    <n-card title="搜索" size="small">
      <template #header-extra>
        <n-tooltip trigger="hover">
          <template #trigger>
            <g-icon
              @click="data.search.show = !data.search.show"
              class="hand"
              :icon="data.search.show ? SysIcons.collpsedUp : SysIcons.expandDown"
            ></g-icon>
          </template>
          {{ data.search.show ? "收起" : "展开" }}
        </n-tooltip>
      </template>
      <n-collapse-transition :show="data.search.show">
        <n-form
          label-placement="left"
          :label-width="80"
          inline
          :model="data.search.formValue"
          ref="searchFormRef"
        >
          <n-form-item label="名字">
            <n-input v-model:value="data.search.formValue.name" placeholder="名字" />
          </n-form-item>
          <n-form-item>
            <n-space>
              <n-button type="primary" @click="getListData(true)" attr-type="button">搜索</n-button>
              <n-button type="success" @click="handleReset" attr-type="button">重置</n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-collapse-transition>
    </n-card>
    <n-card ref="tableCardElRef" class="mt-sm" size="small">
      <template #header>
        <n-space>
          <n-h3>猫咪</n-h3>
          <n-button type="primary"> <g-icon :icon="SysIcons.create"></g-icon>添加 </n-button>
          <n-button :disabled="data.table.selectedKeys.length !== 1" type="warning">
            <g-icon :icon="SysIcons.update"></g-icon>修改
          </n-button>
        </n-space>
      </template>
      <template #header-extra>
        <n-space>
          <n-tooltip trigger="hover">
            <template #trigger>
              <g-icon
                class="hand"
                @click="toggle"
                :icon="isFullscreen ? SysIcons.ExitFullScreen : SysIcons.fullScreen"
              ></g-icon>
            </template>
            {{ isFullscreen ? "退出表格全屏" : "表格全屏" }}
          </n-tooltip>
        </n-space>
      </template>
      <n-data-table
        size="small"
        striped
        remote
        :loading="data.table.loading"
        :columns="data.table.columns"
        :data="data.table.items"
        :row-key="(row:any) => row.id"
        :pagination="data.table.pagination"
        @update:checked-row-keys="handleRowChecked"
      />
    </n-card>
  </div>
</template>
<!--
<script lang="ts">
export default {
name: 'PetCat',
inheritAttrs: false,
customOptions: {},}
</script> -->
<script setup lang="ts">
import { getPetCatList } from "@/api/CatApi";
import { NButton, PaginationInfo } from "naive-ui";
import { SysIcons } from "@/enum/iconEnum";
const tableCardElRef = ref();
const { toggle, isFullscreen } = useFullscreen(tableCardElRef);
const data = reactive({
  search: {
    show: true,
    formValue: {
      name: "",
    },
  },
  table: {
    loading: false,
    selectedKeys: [] as string[],
    pagination: {
      page: 1,
      pageSize: 10,
      itemCount: 0,
      showSizePicker: true,
      pageSizes: [5, 10, 20, 30, 50],
      onChange: (page: number) => {
        data.table.pagination.page = page;
        getListData();
      },
      onPageSizeChange: (pageSize: number) => {
        data.table.pagination.pageSize = pageSize;
        data.table.pagination.page = 1;
        getListData();
      },
      prefix({ endIndex, startIndex }: PaginationInfo) {
        return `From ${startIndex + 1} To ${endIndex}`;
      },
      suffix({ itemCount }: PaginationInfo) {
        return `Total  ${itemCount}`;
      },
    },
    items: <any>[],
    columns: [
      { type: "selection" },
      {
        title: "ID",
        key: "id",
      },
      {
        title: "Name",
        key: "name",
      },
      {
        title: "Age",
        key: "age",
      },
      {
        title: "Gender",
        key: "gender",
      },
      {
        title: "Birthday",
        key: "birthday",
      },
      {
        title: "Action",
        key: "actions",
        render(row: any) {
          return h(
            NButton,
            {
              size: "small",
              onClick: () => window.$message.success(`查看数据:${row.name}`),
            },
            { default: () => "Detail" }
          );
        },
      },
    ] as any,
  },
});
const handleReset = () => {
  data.search.formValue.name = "";
  getListData(true);
};
const handleRowChecked = (keys: string[]) => {
  data.table.selectedKeys = keys;
};
const getListData = async (reload = false) => {
  if (reload === true) {
    data.table.pagination.page = 1;
  }
  data.table.loading = true;
  const { page, pageSize } = data.table.pagination;
  const res = await getPetCatList({
    page: page,
    size: pageSize,
    ...data.search.formValue,
  });
  data.table.items = res.records;
  data.table.pagination.itemCount = res.total;
  data.table.loading = false;
};
onMounted(() => {
  getListData();
});
</script>
<style lang="scss" scoped></style>
