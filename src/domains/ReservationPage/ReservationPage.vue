<template>
  <div>
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        Reservation
      </span>
      <div class="w-6 h-6 text-white my-2"></div>
    </div>
    <div>
      <div class="flex justify-center gap-2">
        <ion-datetime-button mode="ios" datetime="starttime"></ion-datetime-button>
        <div class="font-bold pb-4">
          _
        </div>
        <ion-datetime-button mode="ios" datetime="endtime"></ion-datetime-button>
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
                  :value="minTime"
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
                  :min="minTime"
                  :max="maxTime"
                  class="rounded-2xl"
                  mode="ios"
                  id="endtime"
                  presentation="time"
                  :value="minTime"
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
    <div class="w-full flex justify-between items-center ion-padding py-0">
      <icon-back class="w-6 h-6 text-black my-2" @click="previosFloor"/>
      <span class="text-black text-[14px] font-medium">
        {{currentFloor.title}}
      </span>
      <icon-back class="w-6 h-6 text-black my-2 rotate-180" @click="nextFloor"/>
    </div>
    <div class="w-full flex justify-between items-center ion-padding py-0">
      <icon-back class="w-6 h-6 text-black my-2" @click="previosRow"/>
      <span class="text-black text-[14px] font-medium">
        Row {{currentRow}}
      </span>
      <icon-back class="w-6 h-6 text-black my-2 rotate-180" @click="nextRow"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import IconBack from "@/shared/ui/icon/back.vue";
import { floors } from "./values";
import { IonDatetime, IonDatetimeButton, IonModal, modalController } from '@ionic/vue';
import OpsButton from "@/shared/ui/components/Button.vue";

const route = useRoute()
const router = useRouter()

const parkingId = route.query.parkingId as string
const floorId = ref<number>(0)
const maxRows = ref<number>(5)
const currentRow = ref<number>(1)

const minTime = ref<string>('2022-05-31T09:00:00')
const maxTime = ref<string>('2022-05-31T21:00:00')


const close = () => modalController.dismiss(null, 'confirm');


const formatOptions = {
  time: {
    hour: '2-digit',
    minute: '2-digit',
  },
};

const currentFloor = computed(() => floors[floorId.value])


const previosFloor = () => {
  if (floorId.value > 0) {
    floorId.value--
  } else  floorId.value = floors.length - 1
}

const nextFloor = () => {
  if (floorId.value < floors.length - 1) {
    floorId.value++
  } else  floorId.value = 0
}

const previosRow = () => {
  if (currentRow.value > 1) {
    currentRow.value--
  } else  currentRow.value = maxRows.value
}

const nextRow = () => {
  if (currentRow.value < maxRows.value) {
    currentRow.value++
  } else  currentRow.value = 1
}



const back = () => {
  router.go(-1)
}
</script>

<style scoped>
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
