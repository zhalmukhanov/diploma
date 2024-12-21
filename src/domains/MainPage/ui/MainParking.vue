<template>
  <div v-if="!loading" class="w-full pt-[24px] pb-10 px-6">
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
              horizontalClass: 'asdasdasd'
            }"
            :modules="swiperModules"
            class="mySwiper"
        >
          <swiper-slide v-for="img in currentParking.images" :key="img">
            <img :src="img">
          </swiper-slide>
        </swiper>
      </div>

      <div class="flex gap-2 w-full">
        <div class="w-full h-10 flex items-center justify-center gap-1.5 bg-[#EEEEEE] rounded-[6px] font-semibold ion-activatable ripple-wrapper">
          <icon-call />
          <span class="text-sm">Call</span>
          <ion-ripple-effect/>
        </div>

        <div
            class="w-full h-10 flex items-center justify-center gap-1.5 rounded-[6px] font-semibold ion-activatable ripple-wrapper"
            :class="isFavorite ? 'bg-[#FFD700]' : 'bg-[#EEEEEE]'"
            @click="setFavorite(id)"
        >
          <icon-star />
          <span class="text-sm">{{ isFavorite ? 'In favorites'  : 'Save'}}</span>
          <ion-ripple-effect/>
        </div>
      </div>
    </div>

    <div>
      <div class="flex flex-col gap-2">
        <div class="h-[0.1px] w-full bg-[#AFAFAF60] mt-4 mb-2"/>
        <div class="flex gap-2">
          <icon-car />
          <span class="text-blue-700 font-bold">{{currentParking.free}} free spots</span>
        </div>
        <div class="flex gap-2">
          <icon-clock />
          <span>{{formatTime(currentParking.startTime)}} - {{formatTime(currentParking.endTime)}}</span>
        </div>
        <div class="flex gap-2">
          <icon-tenge />
          <span>{{currentParking.price}}₸ / hour</span>
        </div>
        <div class="h-[0.1px] w-full bg-[#AFAFAF60] mt-2"/>
      </div>

      <div class="flex gap-6 mt-4">
        <div class="flex gap-2" v-if="currentParking.possibilities.some((s) => s === 'invalid')">
          <icon-disabled />
          <span>Disabled people</span>
        </div>
        <div class="flex gap-2" v-if="currentParking.possibilities.some((s) => s === 'electrocar')">
          <icon-charge />
          <span>Electric charger</span>
        </div>
      </div>

      <div class="flex flex-col grow justify-end h-full w-full mt-8">
        <ops-button @click="goToReservation" class="h-[46px]">Reserve spot</ops-button>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-[569px] ion-padding py-0 pt-0 flex flex-col grow items-center justify-center">
    <icon-loading class="w-10 h-10 text-blue-700 my-2 animate-spin"/>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import {computed, onMounted, ref} from "vue";

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
import {useStore} from "@/shared/store";
import IconLoading from "@/shared/ui/icon/loading.vue";

const props = defineProps({
  id: {
    type:  Number,
    required: true
  }
})

const emit = defineEmits(['close'])

const router = useRouter()
const store = useStore()
const swiperModules = [Pagination]

const loading = ref(false)


const currentParking = computed(() => {
  return store.getParkingById(props.id).info
})

const isFavorite = computed(() => {
  return store.getParkingById(props.id).isFavorite
})

const formatTime = (time: string) => {
  const [d, t] = time.split('T')
  return t.split(':').slice(0, 2).join(':')
}

const setFavorite = async (id: number) => {
  await store.setFavoriteParking(id);
}

const goToReservation = () => {
  emit('close')
  router.push('/reservation?parkingId=' + props.id)
}

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 700)
})
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