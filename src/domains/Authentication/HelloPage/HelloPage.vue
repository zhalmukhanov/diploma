<script setup lang="ts">
import { IonPage } from '@ionic/vue'
import OpsButton from '@/shared/ui/components/Button.vue'
import { IonImg} from '@ionic/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <ion-page>
    <div class="h-full flex flex-col ion-padding bg-blue-700">
      <div class="flex flex-col justify-center h-full">
        <ion-img src="/img/hello-bg.png" alt="Hello page bg" class="w-full"/>
        <p class="text-center text-lg font-medium leading-6 mt-7 text-white">
          ParkEasy - park effortlessly in 2 steps.<br>
          Parking became a breeze!
        </p>
      </div>
      <div class="flex flex-col gap-2 grow justify-end mb-[44px]">
        <ops-button color="secondary" class="h-11" @click="router.push('/login')">Log In</ops-button>
        <ops-button color="secondary"  class="h-11" @click="router.push('/register')">Register</ops-button>
      </div>
    </div>
  </ion-page>
</template>

<style scoped>

</style>