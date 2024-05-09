<template>
  <ion-page>
    <div class="min-h-screen flex flex-col gap-6">
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        Extend reservation
      </span>
      <div class="w-6 h-6 text-white my-2"></div>
    </div>

    <div class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow">
      <span class="text-[18px] font-bold">
        {{ myReservation.parkingName }}
      </span>
      <div class="w-full grid grid-cols-2 place-content-between gap-y-5 mt-4">
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

      <div class="mt-6 pt-4 border-t">
        <div class="flex items-center justify-between">
          <span class="text-[17px] font-medium">Extend parking time</span>
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

      <div class="flex flex-col justify-end h-full w-full mt-10 pb-5 grow gap-2">
        <ops-button class="h-[46px]" @click="back()" color="outline">Cancel</ops-button>
        <ops-button class="h-[46px]" @click="openConfirm()">Extend</ops-button>
      </div>

      <ion-modal :is-open="isOpenConfirm" :initial-breakpoint="1" :breakpoints="[0, 1]">
        <div class="block">
          <div class="flex flex-col gap-4 items-center w-full ion-padding pt-8">
            <span class="text-[18px] font-bold">Confirm extension</span>
            <span class="text-[16px] font-medium text-center">Are you sure you want to extend reservation?</span>

            <div class="flex flex-col justify-end h-full w-full mt-4 pb-5 grow gap-2">
              <ops-button class="h-[46px]" @click="closeConfirm()" color="outline">No, go back</ops-button>
              <ops-button class="h-[46px]" @click="extend()" :loading="loading">Yes, extend</ops-button>
            </div>
          </div>
        </div>
      </ion-modal>
    </div>
  </div>
  </ion-page>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import {IonDatetime, IonDatetimeButton, IonModal, modalController, IonPage} from '@ionic/vue';
import {computed, ref, watch} from "vue";
import OpsButton from "@/shared/ui/components/Button.vue";
import {useStore} from "@/shared/store";
import {createRequest} from "@/shared/utils/request";

const route = useRoute()
const router = useRouter()
const store = useStore()

const id = route.params.id
const myReservation = computed(() => store.getResevationById(+id))
const isOpenConfirm = ref(false)
const parkingPrice = computed(() => store.getParkingPriceByName(myReservation.value.parkingName))

const closeConfirm = async () => {
  isOpenConfirm.value = false;
}

const openConfirm = async () => {
  await closeConfirm();
  isOpenConfirm.value = true;
}

const formatOptions = {
  time: {
    hour: '2-digit',
    minute: '2-digit',
  },
};

const minTime = ref<string>(myReservation.value.startTime)
const maxTime = ref<string>('2024-04-25T21:00:00')


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
const endTimeModel = ref<string>(myReservation.value.endTime)

const loading = ref(false)


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

const parkingTime = computed(() => {
  const start = new Date(myReservation.value.startTime)
  const end = new Date(myReservation.value.endTime)
  return `${start.toLocaleTimeString('ru').slice(0, 5)} to ${end.toLocaleTimeString('ru').slice(0, 5)}`
})

const calculatePrice = () => {
  const startTime = new Date(startTimeModel.value);
  const endTime = new Date(endTimeModel.value);
  const dur = endTime.getTime() - startTime.getTime();

  let durationInHours = Math.floor(dur / 3600000);
  let durationInMinutes = Math.floor((dur % 3600000) / 60000);

  durationInHours = durationInHours < 0 ? durationInHours * -1 : durationInHours
  durationInMinutes = durationInMinutes < 0 ? durationInMinutes * -1 : durationInMinutes

  return (durationInHours + (durationInMinutes / 60)) * parkingPrice.value
}

const extend = async () => {
  loading.value = true
  await createRequest('')
  loading.value = false

  store.updateReservation(startTimeModel.value, endTimeModel.value, calculatePrice(), +id)
  await closeConfirm()
  router.push(`/my-reservation`)
}

const back = () => {
  router.push(`/my-reservation`)
}
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

