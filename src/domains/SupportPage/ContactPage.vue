<template>
  <ion-page>
    <div class="min-h-screen flex flex-col gap-6">
      <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
        <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
        <span class="text-white text-[18px] font-semibold">
          Contact us
        </span>
        <div class="w-6 h-6 text-white my-2"></div>
      </div>

      <div  class="w-full ion-padding py-0 pt-0 flex flex-col gap-2 h-full grow">
        <ops-button class="h-[46px]" color="outline">Call suport</ops-button>
        <ops-button class="h-[46px]" color="outline">Contact via email</ops-button>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import {computed} from "vue";
import OpsButton from "@/shared/ui/components/Button.vue";
import {IonPage} from '@ionic/vue';


const router = useRouter()






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

