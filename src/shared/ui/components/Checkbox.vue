<template>
  <div class="flex gap-3 items-center">
    <div
        class="h-4 w-4 rounded-sm border-[1px] border-blue-700 flex items-center justify-center"
        :class="{ 'bg-blue-700': modelValue }"
        @click="modelValue = !modelValue"
    >
      <IconCheck />
    </div>
    <span :class="labelClass" class="text-[16px]" @click="modelValue = !modelValue">
        {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import IconCheck from '@/shared/ui/icon/check.vue'

defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  labelClass: {
    type: String,
    required: false,
    default: '',
  },
})
const modelValue = defineModel<boolean>('modelValue', { type: Boolean, default: false })

</script>

<style scoped>


</style>