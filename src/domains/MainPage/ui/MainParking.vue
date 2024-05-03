<template>
  <div class="w-full pt-[24px] pb-10 px-6">
    <div class="flex flex-col gap-5">
      <div class="flex justify-between w-full">
        <span class="font-bold text-[18px]">{{ currentParking.name }}</span>
      </div>
      <div class="relative">
        <swiper
            :slidesPerView="2"
            :spaceBetween="8"
            :pagination="{
            clickable: true,
            horizontalClass: 'asdasdasd',
          }"
            :modules="swiperModules"
            class="mySwiper"
        >
          <swiper-slide>
            <img src="/img/parking.jpg">
          </swiper-slide>
          <swiper-slide>
            <img src="/img/parking.jpg">
          </swiper-slide>
          <swiper-slide>
            <img src="/img/parking.jpg">
          </swiper-slide>
          <swiper-slide>
            <img src="/img/parking.jpg">
          </swiper-slide>
          <swiper-slide>
            <img src="/img/parking.jpg">
          </swiper-slide>
          <swiper-slide>
            <img src="/img/parking.jpg">
          </swiper-slide>
        </swiper>
      </div>

      <div class="flex gap-2 w-full">
        <div class="w-full h-10 flex items-center justify-center gap-1.5 bg-[#EEEEEE] rounded-[6px] font-semibold ion-activatable ripple-wrapper">
          <icon-call />
          <span class="text-sm">Call</span>
          <ion-ripple-effect/>
        </div>

        <div class="w-full h-10 flex items-center justify-center gap-1.5 bg-[#EEEEEE] rounded-[6px] font-semibold ion-activatable ripple-wrapper">
          <icon-star />
          <span class="text-sm">Save</span>
          <ion-ripple-effect/>
        </div>
      </div>
    </div>

    <div>
      <div class="flex flex-col gap-2">
        <div class="h-[0.1px] w-full bg-[#AFAFAF60] mt-4 mb-2"/>
        <div class="flex gap-2">
          <icon-car />
          <span class="text-blue-700 font-bold">17 free spots</span>
        </div>
        <div class="flex gap-2">
          <icon-clock />
          <span>09:00 - 22:00</span>
        </div>
        <div class="flex gap-2">
          <icon-tenge />
          <span>200₸ / hour</span>
        </div>
        <div class="h-[0.1px] w-full bg-[#AFAFAF60] mt-2"/>
      </div>

      <div class="flex gap-6 mt-4">
        <div class="flex gap-2">
          <icon-disabled />
          <span>Disabled people</span>
        </div>
        <div class="flex gap-2">
          <icon-charge />
          <span>Electric charger</span>
        </div>
      </div>

      <div class="flex flex-col grow justify-end h-full w-full mt-8">
        <ops-button @click="goToReservation" class="h-[46px]">Reserve spot</ops-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import {computed} from "vue";

import IconStar from '@/shared/ui/icon/star.vue'
import IconCall from '@/shared/ui/icon/call.vue'
import IconCar from '@/shared/ui/icon/car.vue'
import IconClock from '@/shared/ui/icon/clock.vue'
import IconTenge from '@/shared/ui/icon/tenge.vue'
import IconDisabled from '@/shared/ui/icon/disabled.vue'
import IconCharge from '@/shared/ui/icon/charge.vue'

import {parkings} from "@/domains/MainPage/values/parkings";
import {Parking} from "@/domains/MainPage/types";
import {IonRippleEffect} from "@ionic/vue";
import OpsButton from "@/shared/ui/components/Button.vue";
import {useRouter} from "vue-router";

const props = defineProps({
  id: {
    type:  Number,
    required: true
  }
})

const emit = defineEmits(['close'])

const router = useRouter()
const swiperModules = [Pagination]


const currentParking = computed<Parking>(() => {
  return parkings.find(parking => parking.id === props.id)
})

const goToReservation = () => {
  emit('close')
  router.push('/reservation?parkingId=' + props.id)
}
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 140px;
}

.swiper-slide {
  height: 120px;
  text-align: center;
  font-size: 18px;
  background: #fff;
  margin-bottom: 25px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
</style>

<style>
.asdasdasd {
  bottom: -7px !important;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: #bebebe;
}
.swiper-pagination-bullet-active {
  background-color: #38BDF8;
}
</style>