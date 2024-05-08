<template>
  <ion-page>
    <div class="min-h-screen flex flex-col gap-6">
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        My reservations
      </span>
      <div class="w-6 h-6 text-white my-2"></div>
    </div>
    <div class="w-full ion-padding py-0 pt-0">
      <div class="bg-[#EBEBEB] h-10 w-full rounded-[10px] flex">
        <div
            @click="() => toggleTab('reservations')"
            class="w-1/2 h-10 rounded-[10px] flex items-center justify-center font-bold text-[16px] ion-activatable ripple-wrapper"
            :class="{'bg-blue-700 text-white': activeTab === 'reservations'}"
        >
          Reservations
          <ion-ripple-effect/>
        </div>

        <div
            @click="() => toggleTab('history')"
            class="w-1/2 h-10 rounded-[10px] flex items-center justify-center font-bold text-[16px] ion-activatable ripple-wrapper"
            :class="{'bg-blue-700 text-white': activeTab === 'history'}"
        >
          History
          <ion-ripple-effect/>
        </div>

      </div>

    </div>

    <KeepAlive>
      <component :is="currentPage"/>
    </KeepAlive>
  </div>
  </ion-page>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import {IonModal, IonPage, IonRippleEffect} from '@ionic/vue';
import LastReservation from "@/domains/MyReservationPage/ui/LastReservation.vue";
import HistoryReservation from "@/domains/MyReservationPage/ui/HistoryReservation.vue";
import {computed, ref} from "vue";

const router = useRouter()

const activeTab = ref<'reservations' | 'history'>('reservations')

const toggleTab = (tab: 'reservations' | 'history') => {
  activeTab.value = tab
}

const currentPage = computed(() => {
  if (activeTab.value === 'reservations') {
    return LastReservation
  } else {
    return HistoryReservation
  }
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

