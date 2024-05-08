<template>
  <ion-page>
    <div class="min-h-screen flex flex-col gap-6">
      <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
        <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
        <span class="text-white text-[18px] font-semibold">
          FAQ
        </span>
        <div class="w-6 h-6 text-white my-2"></div>
      </div>

      <div  class="w-full ion-padding py-0 pt-0 flex flex-col gap-6 h-full grow">
        <span class="text-[18px] font-semibold">{{currentFaq.title}}</span>
        <span>{{currentFaq.description}}</span>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import {computed} from "vue";
import {IonPage} from '@ionic/vue';


const faq = [
  {
    title: 'Where to find parking places?',
    description: 'You can find parking places in the app. Just click on the map and you will see all the parking places near you.'
  },
  {
    title: 'Payment methods',
    description: 'You can add your payment methods in the app. Just go to the payment methods page and add your card.'
  }
]

const router = useRouter()
const route = useRoute()

const currentFaq = computed(() => {
  const id: number = +route?.params?.id ?? 0
  return faq[id]
})





const back = () => {
  router.push('/support')
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

