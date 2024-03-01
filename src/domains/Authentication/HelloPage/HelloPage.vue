<script setup lang="ts">
import OpsButton from '@/shared/ui/components/Button.vue'
import { IonImg } from '@ionic/vue'

</script>

<template>
  <ion-content class="ion-padding">
    <div class="h-full flex flex-col">
      <div>
        <p class="text-blue-700 font-bold text-2xl text-center my-12">ParKing</p>
        <ion-img src="/img/hello-bg.png" alt="Hello page bg" class="w-full"/>
        <p class="text-center text-lg font-medium leading-6 mt-7">
          ParkEasy - park effortlessly in 2 steps.<br>
          Parking became a breeze!
        </p>
      </div>

      <div class="flex flex-col gap-2 grow justify-end">
        <ops-button class="h-11">Log In</ops-button>
        <ops-button class="h-11">Register</ops-button>
      </div>
    </div>

  </ion-content>
</template>

<style scoped>

</style>