<script setup lang="ts">
import IconBack from '@/shared/ui/icon/back.vue'
import OpsButton from '@/shared/ui/components/Button.vue'
import {IonPage} from "@ionic/vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import OpsInput from "@/shared/ui/components/Input.vue";

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')

const back = () => {
  router.go(-1)
}

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <ion-page>
    <div class="h-full flex flex-col bg-blue-700">
    <div class="ion-padding grow flex flex-col justify-between">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <div class="bg mx-[45px] grow"/>
      <div class="mt-2">
        <p class="text-xl text-white font-bold">
          Reset password
        </p>
      </div>
    </div>
    <div class="bg-white w-full min-h-[376px] ion-padding rounded-t-2xl py-6 px-4">
      <div class="flex flex-col items-center w-full h-full gap-6">
        <div class="flex flex-col gap-2 w-full">
          <ops-input v-model="password" type="password" placeholder="New password"  class="h-[46px]"/>
          <ops-input type="password" v-model="confirmPassword" placeholder="Confirm new password" class="h-[46px]"/>
        </div>

        <div class="flex flex-col grow justify-end h-full w-full">
          <ops-button class="h-[46px]" @click="goToLogin()">Reset and log in</ops-button>
        </div>
      </div>


    </div>
  </div>
  </ion-page>
</template>

<style scoped>
.bg {
  background-image: url('/img/social-navigator.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>