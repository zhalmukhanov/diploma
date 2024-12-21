<template>
  <ion-page>
    <div id="container" class="bg-white h-full w-full relative">
      <div class="absolute top-5 z-50 flex gap-4 px-4 w-full">
        <ion-menu-toggle>
          <div @click="goToMyLocation()" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center ion-activatable ripple-wrapper">
            <IconMenu />
            <ion-ripple-effect/>
          </div>
        </ion-menu-toggle>

        <div class="grow" id="search-modal">
          <div class="h-[40px] w-full flex items-center justify-between px-3 text-gray-400 bg-white rounded-md gap-2 ion-activatable ripple-wrapper">
            Search {{ isOpenParking }}
            <icon-search />
            <ion-ripple-effect/>
          </div>
        </div>

        <div id="filter-modal" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center ion-activatable ripple-wrapper">
          <IconFilter />
          <ion-ripple-effect/>
        </div>
      </div>
      <div class="absolute bottom-32 right-4  z-50 flex flex-col gap-4">
        <div @click="goToMyLocation()" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center ion-activatable ripple-wrapper">
          <IconMap />
          <ion-ripple-effect/>
        </div>
        <div @click="zoom(+1)" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center ion-activatable ripple-wrapper">
          <IconPluse />
          <ion-ripple-effect/>
        </div>
        <div @click="zoom(-1)" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center ion-activatable ripple-wrapper">
          <IconMinus />
          <ion-ripple-effect/>
        </div>
      </div>
    </div>
    <ion-modal trigger="filter-modal" :initial-breakpoint="1" :breakpoints="[0, 1]">
      <div class="block">
        <main-filter />
      </div>
    </ion-modal>

    <ion-modal trigger="search-modal" :initial-breakpoint="1" :breakpoints="[0, 1]">
      <div class="block">
        <main-search />
      </div>
    </ion-modal>
    <ion-modal :is-open="isOpenParking" :initial-breakpoint="1" :breakpoints="[0, 1]">
      <div class="block">
        <main-parking :id="openParkingId ?? 0" @close="closeParking"/>
      </div>
    </ion-modal>
  </ion-page>

</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { load } from '@2gis/mapgl';
import {computed, onBeforeUnmount, ref} from "vue";
import { Geolocation } from '@capacitor/geolocation';
import { IonModal, IonRippleEffect, IonMenuToggle, IonPage, onIonViewDidEnter } from '@ionic/vue';

import MainFilter from '@/domains/MainPage/ui/MainFilter.vue';
import MainSearch from '@/domains/MainPage/ui/MainSearch.vue';

import IconPluse from '@/shared/ui/icon/pluse.vue'
import IconMinus from '@/shared/ui/icon/minus.vue'
import IconMap from '@/shared/ui/icon/map.vue'
import IconMenu from '@/shared/ui/icon/menu.vue'
import IconFilter from '@/shared/ui/icon/filter.vue'
import IconSearch from '@/shared/ui/icon/search.vue'

import MainParking from "@/domains/MainPage/ui/MainParking.vue";
import {getBonuses} from "@/shared/api/getBonuses";
import {useStore} from "@/shared/store";

const store = useStore();

const map = ref<unknown>(null);
const myMarker = ref<unknown>(null);
const isOpenParking = ref(false);
const openParkingId = ref<number | null>(null);
const latitude = ref(0);
const longitude = ref(0);
const startZoom = ref(17);
const parkings = ref([])

const closeParking = async () => {
  isOpenParking.value = false;
}

const openParking = async (id: number) => {
  await closeParking();
  openParkingId.value =  id
  isOpenParking.value = true;
}

const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  latitude.value = coordinates.coords.latitude;
  longitude.value = coordinates.coords.longitude;
};

const zoom = (change: number) => {
  map.value?.setZoom(map.value.getZoom() + change);
}

const goToMyLocation = async () => {
  await getCurrentPosition();
  map.value?.setCenter([longitude.value, latitude.value]);
  map.value?.setZoom(startZoom.value);
}

const getParkings = async () => {
  parkings.value = store.getParkings();

  console.log('getParkings', store.getParkings())
}

onIonViewDidEnter(async () => {
  await getCurrentPosition();

  await getParkings();

  load().then((mapgl) => {
    map.value = new mapgl.Map('container', {
      center: [longitude.value, latitude.value],
      zoom: startZoom.value,
      key: '9d1d2243-d2c3-48cc-a70a-83423e36d21b',
      zoomControl: false,
    })

    myMarker.value = new mapgl.Marker(map.value,{
      coordinates: [longitude.value, latitude.value],
      icon: 'https://cdn3.iconfinder.com/data/icons/map-14/144/Map-10-512.png',
      size: [50, 50]
    });

    parkings.value.forEach((parking) => {
      console.log('parking', parking)
      const marker = new mapgl.Marker(map.value, {
        coordinates: [parking.lng, parking.lat],
        icon: 'https://raw.githubusercontent.com/zhalmukhanov/diploma/dev/public/img/parking-marker.svg',
        size: [31, 43],
        userData: {
          id: parking.id,
        }
      });


      marker.on('click', (e) => {
        console.log(e.targetData.userData.id)
        openParking(e.targetData.userData.id);
      });
    });
  })
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.destroy();
  }
})
</script>

<style scoped>
.block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-modal {
  --height: auto;

}

ion-modal.ios {
  --border-radius: 20px;
}

ion-modal.md {
  --border-radius: 20px 20px 0 0;
}
</style>
