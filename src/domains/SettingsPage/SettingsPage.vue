<template>
  <div class="min-h-screen flex flex-col gap-6">
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        Settings
      </span>
      <div class="w-6 h-6 text-white my-2"></div>
    </div>

    <div  class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow">
      <div class="flex flex-col gap-3">
        <div class="flex justify-between w-full items-center">
          <div class="flex gap-3 items-center">
            <div class="text-[16px] text-white font-bold flex items-center justify-center rounded-full h-11 w-11 bg-blue-700">
              {{ getFirstLatters(userName) }}
            </div>
            <span class="text-[18px] font-medium">
              {{userName}}
            </span>
          </div>
          <div class="ion-activatable ripple-wrapper p-1" @click="goToEdit">
            <icon-edit class="w-[18px] h-[18px]" />
            <ion-ripple-effect/>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-5">
        <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
        <div class="w-full flex justify-between items-center">
          <span class="text-sm text-black text-opacity-50">Phone number</span>
          <span class="text-[16px]">{{phone}}</span>

        </div>
        <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
        <div class="w-full flex justify-between items-center">
          <span class="text-sm text-black text-opacity-50">My vehicles</span>
          <div class="ion-activatable ripple-wrapper" @click="goToMyVehicles">
            <icon-back class="w-5 h-5 text-black rotate-180"/>
            <ion-ripple-effect/>
          </div>
        </div>
        <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
        <div class="w-full flex justify-between items-center">
          <span class="text-sm text-black text-opacity-50">Payment methods</span>
          <div class="ion-activatable ripple-wrapper" @click="goToPaymentMethods">
            <icon-back class="w-5 h-5 text-black rotate-180"/>
            <ion-ripple-effect/>
          </div>
        </div>
        <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import IconEdit from "@/shared/ui/icon/edit.vue";
import {IonRippleEffect} from '@ionic/vue';
import {ref} from "vue";

const router = useRouter()


const userName = ref<string>('Adilbek Zhalmukhanov')
const phone = ref<string>('+77058253345')




const getFirstLatters = (str: string) => {
  return str.split(' ').map((word) => word[0]).join('').toUpperCase()
}


const goToEdit = () => {
  router.push('/edit-profile')
}

const goToMyVehicles = () => {
  router.push('/my-vehicles')
}

const goToPaymentMethods = () => {
  router.push('/my-cards')
}








const back = () => {
  router.push('/main')
}
</script>

<style scoped>
.block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picker-column-numeric-input {
  text-align: center;
}

ion-modal {
  --height: auto;
  --width: 100%;

}

ion-modal.ios {
  --border-radius: 20px;
}

ion-modal.md {
  --border-radius: 20px 20px 0 0;
}
</style>

