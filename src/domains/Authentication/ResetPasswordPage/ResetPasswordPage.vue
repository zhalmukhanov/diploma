<script setup lang="ts">
// @ts-nocheck
import IconBack from '@/shared/ui/icon/back.vue'
import {IonAlert, IonPage} from "@ionic/vue";
import { OTP } from "vue3-otp-input-field";
import OpsButton from '@/shared/ui/components/Button.vue'
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const code = ref([])
const alert = ref(false);
const fieldSize = ref(4);

const back = () => {
  router.go(-1)
}

function logOtpValue(val = []) {
  code.value = val;
}

const resend = () => {
  console.log('Resend code');
}

function next() {
  console.log()
  if (code.value.join('').length < 4) {
    console.log('Please enter 4 digit code')
    alert.value = true;
    return;
  }
  console.log(code.value.join(''));

  router.push('/reset-password/step-2')
}

const alertButtons = [
  {
    text: 'Ok',
    role: 'confirm',
    handler: () => {
      alert.value = false;
    },
  },
];

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
        <span class="text-center mt-[30px]">
          We’ve send 4 digit code to mlg235@gmail.com. Please enter the code to log in.
        </span>

        <OTP
            :fields="fieldSize"
            class="flex gap-2"
            class-name="w-[75px] min-h-[60px] focus:border-blue-700 border-[1px] border-gray-300 outline-none text-sm text-black rounded-md"
            @OTPValueChanged="logOtpValue"
        />

        <span class="text-sm text-[#1E40AF]" @click="resend">Resend code in 60 seconds</span>


        <div class="flex flex-col grow justify-end h-full w-full">
          <ops-button class="h-[46px]" @click="next()">Reset </ops-button>
        </div>
      </div>

      <ion-alert
          :is-open="alert"
          trigger="present-alert"
          header="Please enter 4 digit code!"
          :buttons="alertButtons"
      ></ion-alert>
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