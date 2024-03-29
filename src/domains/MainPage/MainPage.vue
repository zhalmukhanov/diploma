<template>
  <div id="container" class="h-full w-full"></div>
</template>

<script setup lang="ts">
import { load } from '@2gis/mapgl';
import {onBeforeUnmount, onMounted, ref} from "vue";
import { Geolocation } from '@capacitor/geolocation';

const map = ref(null);
const latitude = ref(0);
const longitude = ref(0);



const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  latitude.value = coordinates.coords.latitude;
  longitude.value = coordinates.coords.longitude;
};

onMounted(async () => {
  await printCurrentPosition();

  load().then((mapgl) => {
    map.value = new mapgl.Map('container', {
      center: [longitude.value, latitude.value],
      zoom: 16,
      key: 'd55a5b6d-7996-46ea-8a8d-5d6f287e15ae'
    })
  })
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.destroy();
  }
})
</script>

<style scoped>

</style>
