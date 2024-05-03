<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    required: false,
    default: 'No data'
  }
})

</script>

<template>
  <div class="flex h-full w-full flex-col items-center gap-4">
    <img src="/img/no.gif">
    <div class="flex flex-col items-center gap-2">
      <span class="text-[#00000080] font-medium text-[16px]">{{ text }}</span>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>