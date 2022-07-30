<template>
  <n-space :vertical="props.vertical" v-model="selected">
    <n-tag
      v-bind="attrs"
      v-for="item in props.options"
      :checked="selected.includes(item.value)"
      checkable
      @update:checked="onCheck(item)"
    >
      {{ item.label }}
    </n-tag>
  </n-space>
</template>
<script setup lang="ts">
const attrs = useAttrs();
const props = defineProps({
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
<style lang="css" scoped></style>
