<template>
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

<script setup lang="ts">

import {historyReservations} from "@/domains/MyReservationPage/values";
import {ref} from "vue";

const history = ref(historyReservations)


const getParkingTime =(start: string, end: string) => {
  const _start = new Date(start)
  const _end = new Date(end)
  return `${_start.getDate()} ${_start.toLocaleString('en', { month: 'long' })}, ${_start.getHours()}:${_start.getMinutes()} to ${_end.getHours()}:${_end.getMinutes()}`
}

</script>

<style scoped>

</style>