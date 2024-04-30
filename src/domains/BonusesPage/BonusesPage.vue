<template>
  <div class="min-h-screen flex flex-col gap-6">
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        Bonuses and promo codes
      </span>
      <div class="w-6 h-6 text-white my-2"></div>
    </div>

    <div v-if="!error" class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow justify-between">
      <div class="flex flex-col gap-3">
        <div class="flex justify-between items-center text-[16px] border-b-[0.2px] border-opacity-50 border-[#AFAFAF] pb-3">
          <span>
            Active bonuses
          </span>
            <span>
            {{ myBonuses }} ₸
          </span>
        </div>
      </div>

      <div class="w-full grow flex items-end">
        <ops-input v-model="promoCode" color="blue" placeholder="Enter promo code" class="h-[46px] w-full text-center"/>
      </div>



      <div class="flex flex-col justify-end h-full w-full mt-10 pb-5 grow gap-2">
        <ops-button class="h-[46px]" @click="activatePromoCode" :disible="promoCode === ''">Activate promo code</ops-button>
      </div>

      <ion-modal :is-open="isOpenConfirm" :initial-breakpoint="1" :breakpoints="[0, 1]">
        <div class="block">
          <div class="flex flex-col gap-2 items-center w-full ion-padding pt-8 pb-16">
            <icon-activated class="w-16 h-16 text-blue-700"/>
            <span class="text-[18px] font-bold mt-2">Promo code activated</span>
            <span class="text-[16px] text-center">You get 3 hours of free parking at any parking places within one month</span>
          </div>
        </div>
      </ion-modal>
    </div>
    <div v-else class="grow flex items-center">
      <ops-no-data :text="'Promo code is inactive or wrong'">
        <span @click="tryAgain" class="underline text-[#1E40AF] text-sm hover:text-gray-400">
          Try again
        </span>
      </ops-no-data>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import IconActivated from "@/shared/ui/icon/activated.vue";
import {IonModal} from '@ionic/vue';
import {ref, watch} from "vue";
import OpsButton from "@/shared/ui/components/Button.vue";
import OpsInput from "@/shared/ui/components/Input.vue";
import OpsNoData from "@/shared/ui/components/NoData.vue";

const router = useRouter()

const error = ref<boolean>(false)
const myBonuses =  ref<number>(117)
const promoCode = ref<string>('')
const isOpenConfirm = ref(false)

const closeConfirm = async () => {
  isOpenConfirm.value = false;
}

const openConfirm = async () => {
  await closeConfirm();
  isOpenConfirm.value = true;
}



const activatePromoCode = () => {
  if (!promoCode.value) return

  // activate promo code logic
  openConfirm()
  promoCode.value = ''
}


const tryAgain = () => {
  error.value = false
}



watch(promoCode, (newVal) => {
  promoCode.value = newVal.toUpperCase()
})

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

