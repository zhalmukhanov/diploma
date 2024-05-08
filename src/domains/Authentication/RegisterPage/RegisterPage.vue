<script setup lang="ts">
import IconBack from '@/shared/ui/icon/back.vue'
import OpsInput from '@/shared/ui/components/Input.vue'
import OpsButton from '@/shared/ui/components/Button.vue'
import {ref} from "vue";
import {useRouter} from "vue-router";
import { IonPage } from '@ionic/vue'
import {postAuthRegister} from "@/shared/api/postAuthRegister";


const router = useRouter()

const name = ref('')
const surname = ref('')
const confirmPassword = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')

const loading = ref(false)
const error = ref('')

const back = () => {
  router.push('/hello')
}

const getError = () => {
  if (!name.value) {
    error.value = 'Name is required'
    return true
  }
  if (!surname.value) {
    error.value = 'Surname is required'
    return true
  }
  if (!email.value) {
    error.value = 'Email is required'
    return true
  }
  if (!phone.value) {
    error.value = 'Phone is required'
    return true
  }
  if (!password.value) {
    error.value = 'Password is required'
    return true
  }
  if (!confirmPassword.value) {
    error.value = 'Confirm password is required'
    return true
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return true
  }
  return ''
}

const register = async () => {
  if (getError()) {
    return
  }
  try {
    loading.value = true
    const {ok} = await postAuthRegister({name: (name.value + ' ' + surname.value), email: email.value, phone: phone.value, password: password.value, password_confirmation: confirmPassword.value})

    if (ok) {
      router.push('/login')
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
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
           Register to Parking
         </p>
         <p class="text-base text-white">
           Already have an account?
           <span class="underline hover:text-gray-200" @click="router.push('/login')">Log In</span>
         </p>
       </div>
     </div>
     <div class="bg-white w-full min-h-[376px] ion-padding rounded-t-2xl py-6 px-4">
       <div class="flex flex-col items-center w-full h-full gap-6">
         <div class="flex flex-col gap-2 w-full">
           <ops-input v-model="name" placeholder="Name" class="h-[46px]"/>
           <ops-input v-model="surname" placeholder="Surname" class="h-[46px]"/>
           <ops-input v-model="email" placeholder="Email" class="h-[46px]"/>
           <ops-input v-model="phone" placeholder="Phone" class="h-[46px]"/>
           <ops-input v-model="password" type="password" placeholder="New password"  class="h-[46px]"/>
           <ops-input type="password" v-model="confirmPassword" placeholder="Confirm new password" class="h-[46px]"/>
           <span v-if="error" class="text-[#EF4444] text-xs">{{error}}</span>
         </div>

         <div class="flex flex-col grow justify-end h-full w-full mt-4">
           <ops-button class="h-[46px]" @click="register" :loading="loading">Register</ops-button>
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