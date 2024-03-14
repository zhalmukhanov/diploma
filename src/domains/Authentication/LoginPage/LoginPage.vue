<script setup lang="ts">
import IconBack from '@/shared/ui/icon/back.vue'
import OpsInput from '@/shared/ui/components/Input.vue'
import {IonImg} from "@ionic/vue";
import {ref} from "vue";

const email = ref('')
</script>

<template>
  <div class="h-full flex flex-col bg-blue-700">
    <div class="ion-padding grow flex flex-col justify-between">
      <icon-back class="w-6 h-6 text-white my-2"/>
      <div class="mx-[45px]">
        <ion-img src="/img/social-navigator.png" alt="social-navigator" class="w-full"/>
      </div>
      <div class="mt-8">
        <p class="text-xl text-white font-bold">
          Log In to ParKing
        </p>
        <p class="text-base text-white">
          Does’t have an account?
          <span class="underline hover:text-gray-200">Register</span>
        </p>
      </div>
    </div>
    <div class="bg-white w-full min-h-[376px] ion-padding rounded-t-2xl py-6 px-4">
      <ops-input v-model="email" placeholder="Email"/>

    </div>
  </div>
</template>

<style scoped>

</style>