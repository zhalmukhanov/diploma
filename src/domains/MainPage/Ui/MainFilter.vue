<template>
  <div class="w-full flex flex-col gap-4 pt-[24px] pb-[55px] px-6">
    <div class="flex justify-between w-full">
      <span class="font-bold text-[18px]">Filter</span>
      <span class="text-[#1E40AF] text-sm underline">Reset</span>
    </div>
    <div class="flex flex-col gap-6 w-full">
      <div class="flex flex-col gap-3 w-full">
        <span class="text-[#696969] text-sm">Parking type</span>
        <div class="flex gap-2">
          <div
              class="w-1/2  rounded-md h-9 flex justify-center items-center text-[18px] font-medium border-[#D8D8D8] border-[1px]"
              :class="{ 'bg-blue-700 text-white border-none': parkingType === 'indoor' }"
              @click="setParkingType('indoor')"
          >
            Indoor
          </div>
          <div
              class="w-1/2  rounded-md h-9 flex justify-center items-center text-[18px] font-medium border-[#D8D8D8] border-[1px]"
              :class="{ 'bg-blue-700 text-white': parkingType === 'outdoor' }"
              @click="setParkingType('outdoor')"
          >
            Outdoor
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 w-full">
        <span class="text-[#696969] text-sm">Parking type</span>
        <div class="flex flex-col gap-4">
          <ops-checkbox
              v-model="forBeginners"
              label="For beginners"
          />
          <ops-checkbox
              v-model="forElectricCar"
              label="For electric car"
          />
          <ops-checkbox
              v-model="forDisabledPeople"
              label="For disabled people"
          />
        </div>
      </div>

      <div class="flex flex-col gap-3 w-full">
        <span class="text-[#696969] text-sm">Radius</span>
        <ion-range
            class="mt-0 pt-0 px-3"
            aria-label="Dual Knobs Range"
            :dual-knobs="true" :value="{ lower: radius.min, upper: radius.max }"
            pin
            :ticks="true" :snaps="true" :min="0" :max="10"
            :pinFormatter="pinFormatter"
            @ionChange="rangeChange"
        ></ion-range>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import OpsCheckbox from "@/shared/ui/components/Checkbox.vue";

type ParkingType = 'indoor' | 'outdoor' | null
type Radius = { min: number, max: number }

const parkingType = ref<ParkingType>(null)
const forBeginners = ref<boolean>(false)
const forElectricCar = ref<boolean>(false)
const forDisabledPeople = ref<boolean>(false)
const radius = ref<Radius>({ min: 0, max: 10 })

const setParkingType = (type: 'indoor' | 'outdoor') => {
  parkingType.value = type === parkingType.value ? null : type
}

const rangeChange = ({ detail }) => {
  radius.value = { min: detail.value.lower, max: detail.value.upper }
}

const pinFormatter = (value: number) => {
  return `${value}km`
}

</script>

<style scoped>

ion-range::part(pin) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #030712;
  font-size: 14px;
  transform: scale(1.01);
  background: none;

  bottom: -20px;
}

ion-range::part(pin)::before {
  content: none;
}

ion-range::part(tick), ion-range::part(tick-active) {
  display: none;
}

ion-range::part(knob) {
  background: #FAFAFA;
  box-shadow: 0 6px 11px 0 rgba(0, 0, 0, 0.15);
}

ion-range::part(knob) {
  background: #FAFAFA;
}



ion-range::part(bar) {
  background: #78788033;
}

ion-range::part(bar-active) {
  background: #1D4E8D;
}
</style>