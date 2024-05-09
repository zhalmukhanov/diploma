<template>
  <ion-page>
    <div class="min-h-screen flex flex-col">
      <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
        <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
        <span class="text-white text-[18px] font-semibold">
          Reservation
        </span>
        <div class="w-6 h-6 text-white my-2"></div>
      </div>
      <div v-if="!loading" class="flex flex-col gap-4 grow">
        <div>
          <div class="flex items-center justify-between ion-padding">
            <span class="text-[17px] font-medium">Parking time</span>
            <div class="flex justify-center gap-2">
              <ion-datetime-button mode="ios" datetime="starttime"></ion-datetime-button>

              <div class="font-bold pb-4">
                _
              </div>
              <ion-datetime-button mode="ios" datetime="endtime"></ion-datetime-button>
            </div>
          </div>
          <ion-modal :keep-contents-mounted="true" :initial-breakpoint="1" :breakpoints="[0, 1]">
            <div class="ion-padding py-0">
              <div class="flex gap-6 rounded-2xl justify-center pt-10 items-center">
                <div class="text-center flex flex-col gap-4 font-medium text-xl">
                  <span>Start time</span>
                  <ion-datetime
                      :min="minTime"
                      :max="maxTime"
                      class="rounded-2xl"
                      mode="ios"
                      id="starttime"
                      presentation="time"
                      v-model="startTimeModel"
                      minute-values="0,15,30,45"
                      locale="es-ES"
                      :format-options="formatOptions"
                  ></ion-datetime>
                </div>
                <div class="font-bold pt-6">
                  —
                </div>
                <div class="text-center flex flex-col gap-4 font-medium text-xl">
                  <span>End time</span>
                  <ion-datetime
                      :min="endMinTime"
                      :max="maxTime"
                      class="rounded-2xl"
                      mode="ios"
                      id="endtime"
                      presentation="time"
                      v-model="endTimeModel"
                      minute-values="0,15,30,45"
                      locale="es-ES"
                      :format-options="formatOptions"
                  ></ion-datetime>
                </div>
              </div>
              <div class="flex flex-col grow justify-end h-full w-full mt-10 pb-5">
                <ops-button class="h-[46px]" @click="close">Set Time</ops-button>
              </div>
            </div>
          </ion-modal>
        </div>
        <div class="w-full flex justify-between items-center ion-padding py-0 mt-4">
          <icon-back class="w-6 h-6 text-black my-2" @click="previosFloor"/>
          <span class="text-black text-[14px] font-medium">
          {{currentFloor.title}}
        </span>
          <icon-back class="w-6 h-6 text-black my-2 rotate-180" @click="nextFloor"/>
        </div>
        <div class="w-full flex justify-between items-center ion-padding py-0">
          <icon-back class="w-6 h-6 text-black my-2" @click="previosRow"/>
          <span class="text-black text-[14px] font-medium">
            {{ currentRow.title }}
          </span>
            <icon-back class="w-6 h-6 text-black my-2 rotate-180" @click="nextRow"/>
        </div>

        <div class="px-10 flex flex-col gap-3 items-center mt-10">
          <span class="text-sm text-black opacity-50">Entry</span>
          <div class="w-full">
            <div v-for="(item, idx) in currentRow.seats" class="flex justify-center w-full" :class="{'border-b-2': idx < currentRow.seats.length - 1}">
              <div class="border-r-2 h-[100px] flex items-center justify-center w-full">
                <div
                    v-if="!item[0].isReserved"
                    @click="selectSeat(item[0].id)"
                >
                  <span
                      class="font-medium"
                      :class="{'text-success': selectedSeat ===item[0].id }"
                  >
                    {{ item[0].title }}
                  </span>
                </div>
                <ion-img v-else src="/img/car1.png" class="w-[130px]"/>
              </div>
              <div class="h-[100px] flex items-center justify-center w-full">
                <div
                    v-if="!item[1].isReserved"
                    @click="selectSeat(item[1].id)"
                >
                  <span
                      class="font-medium"
                      :class="{'text-success': selectedSeat ===item[1].id }"
                  >
                    {{ item[1].title }}
                  </span>
                </div>
                <ion-img v-else src="/img/car1.png" class="w-[130px] rotate-180"/>
              </div>
            </div>
          </div>
          <span class="text-sm text-black opacity-50">Exit</span>
        </div>

        <div class="flex flex-col justify-end h-full w-full mt-10 pb-5 ion-padding grow">
          <ops-button :disible="!selectedSeat" class="h-[46px]" @click="openConfirm">Reserve spot</ops-button>
        </div>
      </div>
      <div v-else class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow items-center justify-center">
        <icon-loading class="w-10 h-10 text-blue-700 my-2 animate-spin"/>
      </div>
    </div>
    <ion-modal :is-open="isOpenConfirm" :initial-breakpoint="1" :breakpoints="[0, 1]">
      <div class="block">
        <div class="w-full flex flex-col items-center ion-padding pt-6 pb-10 gap-6">
          <span class="text-[18px] font-bold">Confirm reservation</span>
          <div class="w-full grid grid-cols-2 place-content-between gap-y-5">
            <div class="flex justify-start">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Parking name</span>
                <span class="text-[16px] font-bold">{{ currentParking.info.name }}</span>
              </div>
            </div>

            <div class="flex justify-end">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Floor</span>
                <span class="text-[16px] font-bold">{{ currentFloor.title }}</span>
              </div>
            </div>

            <div class="flex justify-start">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Address</span>
                <span class="text-[16px] font-bold">{{ currentParking.info.address }}</span>
              </div>
            </div>

            <div class="flex justify-end">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Parking slot</span>
                <span class="text-[16px] font-bold">
                  {{
                    currentRow.seats.find((s) => s.find((i) => i.id === selectedSeat)).map((m) => m.id === selectedSeat ? m.title : '' ).join('')
                  }}
                </span>
              </div>
            </div>

            <div class="flex justify-start">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm">Duration</span>
                <span class="text-[16px] font-bold">{{ duration }}</span>
              </div>
            </div>

            <div class="flex justify-end">
              <div class="flex flex-col gap-1 w-[140px]">
                <span class="text-sm text-bold">Total price</span>
                <span class="text-[16px] font-bold">{{calculatePrice()}}₸</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-end h-full w-full mt-5">
            <ops-button class="h-[46px]" @click="confirmReservation()" :loading="confirmLoading">Confirm reservation</ops-button>
          </div>

        </div>
      </div>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {useRoute, useRouter} from "vue-router";
import {computed, ref, watch} from "vue";
import IconBack from "@/shared/ui/icon/back.vue";
import {IonDatetime, IonDatetimeButton, IonModal, modalController, IonPage, onIonViewDidEnter} from '@ionic/vue';
import OpsButton from "@/shared/ui/components/Button.vue";
import {useStore} from "@/shared/store";
import IconLoading from "@/shared/ui/icon/loading.vue";
import {createRequest} from "@/shared/utils/request";

const formatOptions = {
  time: {
    hour: '2-digit',
    minute: '2-digit',
  },
};

const route = useRoute()
const router = useRouter()
const store = useStore()

const parkingId = route.query.parkingId as string
const floorId = ref<number>(0)
const currentRowId = ref<number>(1)
const isOpenConfirm = ref<boolean>(false)
const currentParking = computed(() => store.getParkingById(+parkingId))

const loading = ref(false)
const confirmLoading = ref(false)

const minTime = computed(() => currentParking.value.info.startTime)
const maxTime = computed(() => currentParking.value.info.endTime)


const endMinTime = computed(() => {
  const date = new Date(startTimeModel.value)

  if (date.getMinutes() < 45) date.setMinutes(date.getMinutes() + 15)
  else {
    date.setHours(date.getHours() + 1)
    date.setMinutes(0)
  }
  date.setHours(date.getHours() + 5)
  return date.toISOString()
})


const startTimeModel = ref<string>(minTime.value)
const endTimeModel = ref<string>(endMinTime.value)


watch(endMinTime, (newVal) => {
  endTimeModel.value = newVal
})

watch(endTimeModel, (newVal) => {
  duration.value = calculateDuration(startTimeModel.value, newVal)
})


const calculateDuration = (startDate: any, endDate: any) => {
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);
  const dur = endTime.getTime() - startTime.getTime();

  let durationInHours = Math.floor(dur / 3600000);
  let durationInMinutes = Math.floor((dur % 3600000) / 60000);

  durationInHours = durationInHours < 0 ? durationInHours * -1 : durationInHours
  durationInMinutes = durationInMinutes < 0 ? durationInMinutes * -1 : durationInMinutes


  let durationStr = '';
  if (durationInHours > 0) {
    durationStr += `${durationInHours} hour${durationInHours > 1 ? 's' : ''}`;
  }
  if (durationInMinutes > 0) {
    if (durationStr.length > 0) {
      durationStr += ' ';
    }
    durationStr += `${durationInMinutes} minute${durationInMinutes > 1 ? 's' : ''}`;
  }

  return durationStr
}

const duration = ref(calculateDuration(startTimeModel.value, endTimeModel.value))

const close = () => modalController.dismiss(null, 'confirm');


const currentFloor = computed(() => currentParking.value.places[floorId.value])
const maxRows = computed(() => currentFloor.value.rows.length)
const currentRow = computed(() => currentFloor.value.rows[currentRowId.value - 1])
const selectedSeat = ref<number>(0)


const previosFloor = () => {
  if (floorId.value > 0) {
    floorId.value--
  } else  floorId.value = currentParking.value.places.length - 1

  currentRowId.value = 1
}

const nextFloor = () => {
  if (floorId.value < currentParking.value.places.length - 1) {
    floorId.value++
  } else  floorId.value = 0

  currentRowId.value = 1
}

const previosRow = () => {
  if (currentRowId.value > 1) {
    currentRowId.value--
  } else  currentRowId.value = maxRows.value
}

const nextRow = () => {
  if (currentRowId.value < maxRows.value) {
    currentRowId.value++
  } else  currentRowId.value = 1
}

const selectSeat = (seatId: number) => {
  if (selectedSeat.value === seatId) selectedSeat.value = 0
  else selectedSeat.value = seatId
}

const closeConfirm = async () => {
  isOpenConfirm.value = false;
}

const openConfirm = async () => {
  await closeConfirm();

  if (!selectedSeat.value) return

  isOpenConfirm.value = true;
}

const confirmRequest = async () => {
  return createRequest('')
}

// calculate Price. currentParking.value.info.price per hour
const calculatePrice = () => {
  const startTime = new Date(startTimeModel.value);
  const endTime = new Date(endTimeModel.value);
  const dur = endTime.getTime() - startTime.getTime();

  let durationInHours = Math.floor(dur / 3600000);
  let durationInMinutes = Math.floor((dur % 3600000) / 60000);

  durationInHours = durationInHours < 0 ? durationInHours * -1 : durationInHours
  durationInMinutes = durationInMinutes < 0 ? durationInMinutes * -1 : durationInMinutes

  return (durationInHours + (durationInMinutes / 60)) * currentParking.value.info.price
}

const confirmReservation = async () => {
  confirmLoading.value = true
  await confirmRequest()
  confirmLoading.value = false

  store.setReservation({
    parkingName: currentParking.value.info.name,
    placeName: currentFloor.value.title,
    spotName: currentRow.value.seats.find((s) => s.find((i) => i.id === selectedSeat.value)).map((m) => m.id === selectedSeat.value ? m.title : '' ).join(''),
    startTime: startTimeModel.value,
    endTime: endTimeModel.value,
    price: calculatePrice(),
  })

  await closeConfirm();
  router.push(`/my-reservation`)
}



const back = () => {
  router.push('/main')
}

onIonViewDidEnter(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picker-column-numeric-input {
  text-align: center;
}

ion-modal {
  --height: auto;
  --width: 100%;

}

ion-modal.ios {
  --border-radius: 20px;
}

ion-modal.md {
  --border-radius: 20px 20px 0 0;
}
</style>

