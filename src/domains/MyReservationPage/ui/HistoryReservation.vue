<template>
  <template v-if="!loading">
    <div class="ion-padding pt-0 pb-[180px] flex flex-col gap-3 overflow-scroll grow max-h-screen">
      <div v-for="item in history" :key="item.id" class="px-4 py-[14px] border-[1px] border-[#D8D8D8]  rounded-[10px] flex justify-between items-center ">
        <div class="flex flex-col">
          <span class="text-[16px] font-bold">{{ item.parkingName }}</span>
          <span class="text-[12px]">{{ getParkingTime(item.startDate, item.endDate )}}</span>
        </div>
        <p>
          {{ item.price}}
          <span class="text-[15px] font-medium">₸</span>
        </p>
      </div>

    </div>
  </template>

  <div v-else class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow items-center justify-center">
    <icon-loading class="w-10 h-10 text-blue-700 my-2 animate-spin"/>
  </div>

</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {useStore} from "@/shared/store";
import IconLoading from "@/shared/ui/icon/loading.vue";


const store = useStore()

const history = computed(() => store.getHistory)
const loading = ref(true)


const getParkingTime =(start: string, end: string) => {
  const _start = new Date(start)
  const _end = new Date(end)
  return `${_start.getDate()} ${_start.toLocaleString('en', { month: 'long' })}, ${_start.getHours()}:${_start.getMinutes()} to ${_end.getHours()}:${_end.getMinutes()}`
}

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 600)
})

</script>

<style scoped>

</style>