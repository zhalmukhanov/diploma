<template>
  <div class="min-h-screen flex flex-col gap-6">
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        Support
      </span>
      <div class="w-6 h-6 text-white my-2"></div>
    </div>

    <div  class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow">
      <div class="flex flex-col gap-4">
        <span class="text-[18px] font-semibold">FAQ</span>
        <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
        <div class="w-full flex justify-between items-center">
          <span class="text-sm text-black text-opacity-50">Where to find parking places?</span>
          <div class="ion-activatable ripple-wrapper" @click="goToFaq(0)">
            <icon-back class="w-5 h-5 text-black rotate-180"/>
            <ion-ripple-effect/>
          </div>
        </div>
        <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
        <div class="w-full flex justify-between items-center">
          <span class="text-sm text-black text-opacity-50">Payment methods</span>
          <div class="ion-activatable ripple-wrapper" @click="goToFaq(1)">
            <icon-back class="w-5 h-5 text-black rotate-180"/>
            <ion-ripple-effect/>
          </div>
        </div>
        <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
        <div class="w-full flex justify-between items-center">
          <span class="text-sm text-black text-opacity-50">Contact us</span>
          <div class="ion-activatable ripple-wrapper" @click="goToContact()">
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
import {IonRippleEffect} from '@ionic/vue';

const router = useRouter()


const goToFaq = (id: number) => {
  router.push(`/faq/${id}`)
}

const goToContact = () => {
  router.push('/contact')
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

