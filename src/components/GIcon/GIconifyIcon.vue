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
  <SvgIcon :size="size" :name="getSvgIcon" v-if="isSvgIcon" :class="[$attrs.class]" :spin="spin" />
  <span v-else ref="iconElRef" :class="[$attrs.class, 'app-iconify', spin && 'app-iconify-spin']"
    :style="getWrapStyle"></span>
</template>
<script lang="ts">
import type { PropType } from "vue";
import { CSSProperties } from "vue";
import SvgIcon from "./GSvgIcon.vue";
import Iconify from "@purge-icons/generated";
import { propDefine } from "@/utils/propsDefine";
import { isString } from "@/utils/assert";

const SVG_END_WITH_FLAG = "|svg";
export default defineComponent({
  name: "IconifyIcon",
  components: { SvgIcon },
  props: {
    icon: propDefine.string,
    color: propDefine.string,
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16,
    },
    spin: propDefine.bool.def(false),
    prefix: propDefine.string.def(""),
  },
  setup(props) {
    const iconElRef = ref<ElRef>(null);

    const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG));
    const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ""));
    const getIconRef = computed(() => `${props.prefix ? props.prefix + ":" : ""}${props.icon}`);

    const update = async () => {
      if (unref(isSvgIcon)) return;

      const el = unref(iconElRef);
      if (!el) return;

      await nextTick();
      const icon = unref(getIconRef);
      if (!icon) return;

      const svg = Iconify.renderSVG(icon, {});
      if (svg) {
        el.textContent = "";
        el.appendChild(svg);
      } else {
        const span = document.createElement("span");
        span.className = "iconify";
        span.dataset.icon = icon;
        el.textContent = "";
        el.appendChild(span);
      }
    };

    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props;
      let fs = size;
      if (isString(size)) {
        fs = parseInt(size, 10);
      }

      return {
        fontSize: `${fs}px`,
        color: color,
        display: "inline-flex",
      };
    });

    watch(() => props.icon, update, { flush: "post" });

    onMounted(update);

    return { iconElRef, getWrapStyle, isSvgIcon, getSvgIcon };
  },
});
</script>
<style lang="scss" scoped>
.app-iconify {
  display: inline-block;

  &-spin {
    -webkit-animation: spin 2s infinite linear;
    animation: spin 2s infinite linear;
    // -webkit-animation: spin 1s infinite steps(8);
    // animation: spin 1s infinite steps(8);
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  background-color: #000;
  border-radius: 100%;
}
</style>
