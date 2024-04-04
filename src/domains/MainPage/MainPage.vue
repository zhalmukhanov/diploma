<template>
    <div id="container" class="h-full w-full relative">
      <div class="absolute top-5 z-50 flex gap-4 px-4 w-full">
        <div @click="goToMyLocation()" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center">
          <IconMenu />
        </div>

        <div class="grow" id="search-modal">
          <div class="h-[40px] w-full flex items-center justify-between px-3 text-gray-400 bg-white rounded-md gap-2">
            Search
            <icon-search />
          </div>
        </div>

        <div id="filter-modal" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center">
          <IconFilter />
        </div>
      </div>
      <div class="absolute bottom-32 right-4  z-50 flex flex-col gap-4">
        <div @click="goToMyLocation()" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center">
          <IconMap />
        </div>
        <div @click="zoom(+1)" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center">
          <IconPluse />
        </div>
        <div @click="zoom(-1)" class="h-[40px] w-[40px] bg-[#FAFAFA] rounded-md flex items-center justify-center">
          <IconMinus />
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
</template>

<script setup lang="ts">
import { load } from '@2gis/mapgl';
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Geolocation } from '@capacitor/geolocation';
import { IonModal } from '@ionic/vue';

import MainFilter from './Ui/MainFilter.vue';
import MainSearch from './Ui/MainSearch.vue';

import IconPluse from '@/shared/ui/icon/pluse.vue'
import IconMinus from '@/shared/ui/icon/minus.vue'
import IconMap from '@/shared/ui/icon/map.vue'
import IconMenu from '@/shared/ui/icon/menu.vue'
import IconFilter from '@/shared/ui/icon/filter.vue'
import IconSearch from '@/shared/ui/icon/search.vue'

const map = ref(null);
const myMarker = ref(null);
const search = ref('');
const isOpenFilter = ref(false);
const latitude = ref(0);
const longitude = ref(0);
const startZoom = ref(17);


const openFilter = () => {
  isOpenFilter.value = true;
}

const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  latitude.value = coordinates.coords.latitude;
  longitude.value = coordinates.coords.longitude;
};

const zoom = (change) => {
  map.value.setZoom(map.value.getZoom() + change);
}

const goToMyLocation = async () => {
  await getCurrentPosition();
  map.value.setCenter([longitude.value, latitude.value]);
  map.value.setZoom(startZoom.value);
}

onMounted(async () => {
  await getCurrentPosition();

  load().then((mapgl) => {
    map.value = new mapgl.Map('container', {
      center: [longitude.value, latitude.value],
      zoom: startZoom.value,
      // key: 'd55a5b6d-7996-46ea-8a8d-5d6f287e15ae',
      zoomControl: false,
    })

    myMarker.value = new mapgl.Marker(map.value,{
      coordinates: [longitude.value, latitude.value],
      icon: 'https://cdn3.iconfinder.com/data/icons/map-14/144/Map-10-512.png',
      size: [50, 50],
      label: {
        text: "This is me",
      }
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
