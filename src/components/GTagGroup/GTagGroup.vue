<template>
  <n-grid :x-gap="10" :y-gap="5" :cols="24">
    <n-grid-item :span="props.label && props.label.length ? 2 : 0">
      <n-space justify="center" align="center">
        <n-h5 v-if="props.label && props.label.length">{{props.label}}</n-h5>
      </n-space>
    </n-grid-item>
    <n-grid-item :span="props.label && props.label.length ? 22 : 24">
      <n-space :vertical="props.vertical" v-model="selected">
        <n-tag v-bind="attrs" v-for="item in props.options" :checked="selected.includes(item.value)" checkable
          @update:checked="onCheck(item)">
          {{ item.label }}
        </n-tag>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>
<script setup lang="ts">
const attrs = useAttrs();
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Array,
    default: [] as string[],
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  } as any,
});
let selected = ref(props.modelValue as string[]);
const emits = defineEmits(["update:modelValue"]);
const onCheck = (item: any) => {
  if (props.multiple) {
    if (selected.value.includes(item.value)) {
      selected.value = selected.value.filter((v) => v !== item.value);
    } else {
      selected.value.push(item.value);
    }
  } else {
    if (selected.value.includes(item.value)) {
      return;
    }
    selected.value = [item.value];
  }
  emits("update:modelValue", toRaw(selected.value));
};
watch(
  () => props.modelValue,
  () => {
    selected.value = props.modelValue as string[];
  }
);
</script>
<style lang="css" scoped>
</style>
