<script setup lang="ts">
import IconBack from '@/shared/ui/icon/back.vue'
import OpsInput from '@/shared/ui/components/Input.vue'
import OpsButton from '@/shared/ui/components/Button.vue'
import {ref} from "vue";
import {useRouter} from "vue-router"
import { IonPage } from '@ionic/vue'
import {postAuthLogin} from "@/shared/api/postAuthLogin";
import {useToken} from "@/shared/composable";


const router = useRouter()
const token = useToken()

const email = ref('')
const password = ref('')
const loading = ref(false)

const back = () => {
  router.push('/hello')
}

const goReset = () => {
  router.push('/reset-password/step-1')
}

const login = async () => {
  router.push('/main')
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
          Log In to ParKing.
        </p>
        <p class="text-base text-white">
          Does’t have an account?
          <span class="underline hover:text-gray-200" @click="router.push('/register')">Register</span>
        </p>
      </div>
    </div>
    <div class="bg-white w-full min-h-[376px] ion-padding rounded-t-2xl py-6 px-4">
      <div class="flex flex-col items-center w-full h-full gap-6">
        <div class="flex flex-col gap-2 w-full">
          <ops-input v-model="email" placeholder="Email" class="h-[46px]"/>
          <ops-input type="password" v-model="password" placeholder="Password" class="h-[46px]"/>
        </div>
        <span class="text-sm text-[#1E40AF]" @click="goReset">Forgot password?</span>

        <div class="flex flex-col grow justify-end h-full w-full">
          <ops-button :loading="loading" class="h-[46px]" @click="login">Log In</ops-button>
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