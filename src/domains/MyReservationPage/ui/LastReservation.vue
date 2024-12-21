<template>
  <template v-if="!loading">
    <div v-if="myReservation" class="flex flex-col gap-4 grow">
      <div class="ion-padding flex flex-col gap-6 pb-0 pt-0">
        <span class="text-[18px] font-bold">
          {{ myReservation.parkingName }}
        </span>

        <div class="flex flex-col gap-6">
          <CircleProgressBar :value="percentOfTimeLeft" :max="100" :size="194" color-unfilled="#1D4E8D" color-filled="#EF4444" :stroke-width="'9px'" rounded>
            <div v-if="!isPast" class="flex flex-col items-center">
              <span class="text-[14px]">Time left </span>
              <span class="text-[20px] font-bold">{{timeLeft}}</span>
            </div>
            <div v-else class="flex flex-col items-center">
              <span class="text-[20px] font-bold text-[#EF4444]">Time is up</span>
            </div>
          </CircleProgressBar>

          <div class="w-full grid grid-cols-2 place-content-between gap-y-5">
            <div class="flex justify-start">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Parking slot</span>
                <span class="text-[16px] font-bold">{{ myReservation.spotName }}</span>
              </div>
            </div>

            <div class="flex justify-end">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Floor</span>
                <span class="text-[16px] font-bold">{{ myReservation.placeName }}</span>
              </div>
            </div>

            <div class="flex justify-start">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Parking time</span>
                <span class="text-[16px] font-bold">{{ parkingTime }}</span>
              </div>
            </div>

            <div class="flex justify-end">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Price</span>
                <p class="text-[16px] font-bold">{{ myReservation.price }}<span class="text-[15px] font-medium">₸</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ion-padding pt-0">
        <div class="flex w-full justify-between items-center ion-padding pb-0 px-0 border-t">
          <span class="text-[14px]">
            Additional services
          </span>
          <ops-button class="h-[32px] px-3" color="outline">Add</ops-button>
        </div>
      </div>

      <div class="flex flex-col justify-end h-full w-full mt-10 pb-5 ion-padding grow gap-2">
        <ops-button class="h-[46px]" @click="extend()" color="outline">Extend</ops-button>
        <ops-button class="h-[46px]" @click="openCancel()">Cancel</ops-button>
      </div>
    </div>

    <no-data v-else text="No active reservations" />
  </template>
  <div v-else class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow items-center justify-center">
    <icon-loading class="w-10 h-10 text-blue-700 my-2 animate-spin"/>
  </div>


  <ion-modal :is-open="isOpenCancel" :initial-breakpoint="1" :breakpoints="[0, 1]">
    <div class="block">
      <div class="w-full flex flex-col items-center ion-padding pt-6 pb-10 gap-4">
        <span class="text-[18px] font-bold">Confirm cancelation</span>
        <p class="text-[16px] text-center">
          Are you sure you want to cancel reservation for
          <span class="font-bold">{{myReservation.parkingName}}?</span>
        </p>


        <div class="flex flex-col justify-end h-full w-full mt-4 pb-5 grow gap-2">
          <ops-button class="h-[46px]" @click="closeCancel()" color="outline">No, go back</ops-button>
          <ops-button class="h-[46px]" @click="cancelReservation()" :loading="loafingCancel">Yes, cancel</ops-button>
        </div>
      </div>
    </div>
  </ion-modal>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import OpsButton from "@/shared/ui/components/Button.vue";
import { CircleProgressBar } from 'circle-progress.vue'

import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {IonModal} from "@ionic/vue";
import {useStore} from "@/shared/store";
import NoData from "@/shared/ui/components/NoData.vue";
import IconLoading from "@/shared/ui/icon/loading.vue";
import {createRequest} from "@/shared/utils/request";

const router = useRouter()
const store = useStore()

const myReservation = computed(() => store.getUserLastReservation)
const isOpenCancel = ref(false)
const loading = ref(false)
const loafingCancel = ref(false)

const getTimeLeft = () => {
  if (!myReservation.value) return '00:00:00'
  const now = new Date()
  const end = new Date(myReservation.value.endTime)

  const diff = new Date(end.getTime() - now.getTime()).toISOString().substr(11, 8)
  return diff
}

const getPercentOfTime = () => {
  if (!myReservation.value) return 0

  const now = new Date()
  const start = new Date(myReservation.value?.startTime)
  const end = new Date(myReservation.value?.endTime)
  const total = end.getTime() - start.getTime()
  const passed = now.getTime() - start.getTime()
  return Math.round((passed / total) * 100)
}

const timeLeft = ref(getTimeLeft())
const percentOfTimeLeft = ref(getPercentOfTime())

setInterval(() => {
  timeLeft.value = getTimeLeft()
  percentOfTimeLeft.value = getPercentOfTime()
}, 1000)

const isPast = computed(() => {
  const now = new Date()
  const end = new Date(myReservation.value.endDate)
  return now > end
})


const parkingTime = computed(() => {
  const start = new Date(myReservation.value?.startTime)
  const end = new Date(myReservation.value?.endTime)
  return `${start.toLocaleTimeString('ru').slice(0, 5)} to ${end.toLocaleTimeString('ru').slice(0, 5)}`
})

const extend = () => {
  router.push(`/extend-reservation/${myReservation.value.id}`)
}


const closeCancel = async () => {
  isOpenCancel.value = false;
}

const openCancel = async () => {
  await closeCancel();
  isOpenCancel.value = true;
}

const cancelReservation = async () => {
  loafingCancel.value = true
  await createRequest('', 500)
  loafingCancel.value = false


  setTimeout(() => {
    store.cancelReservation(myReservation.value.id)
  }, 500)
  await closeCancel();
  router.push(`/main`)


}

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800)
})
</script>

<style scoped>
ion-modal {
  --height: 280px;
}
</style>