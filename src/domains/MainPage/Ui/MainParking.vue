<template>
  <div class="w-full flex flex-col gap-6 pt-[24px] pb-[55px] px-6">
    <div class="flex justify-between w-full">
      <span class="font-bold text-[18px]">latitude: {{ coordinates.latitude}} <br> longitude: {{ coordinates.longitude }}</span>
    </div>

  </div>
</template>

<script setup lang="ts">

type Parking = {
  id: number,
  name: string,
  address: string,
  coordinates: {
    latitude: number,
    longitude: number
  }
}

const props = defineProps({
  coordinates: {
    type: Object as () => {latitude: number, longitude: number},
    required: true
  }
})








</script>

<style scoped>

</style>