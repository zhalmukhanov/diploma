<template>
  <div class="min-h-screen flex flex-col gap-6">
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        Edit profile
      </span>
      <div class="w-6 h-6 text-white my-2"></div>
    </div>

    <div  class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow">
      <div class="flex flex-col gap-8">
        <div class="flex justify-center w-full">
          <div class="flex gap-3 items-center">
            <div class="text-white text-[60px] flex items-center justify-center rounded-full h-[145px] w-[145px] bg-blue-700">
              {{ getFirstLatters(name + ' ' + surname) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-[18px] font-medium">Profile info</span>
          <ops-input
              v-model="name"
              class="w-full h-[46px]"
              placeholder="Name"
          />
          <ops-input
              v-model="surname"
              class="w-full h-[46px]"
              placeholder="Surname"
          />
          <ops-input
              v-model="phone"
              class="w-full h-[46px]"
              placeholder="Phone"
          />
        </div>
      </div>
      <div class="flex flex-col justify-end h-full w-full mt-10 pb-5 grow gap-2">
        <ops-button class="h-[46px]" @click="save">Save changes</ops-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import OpsInput from "@/shared/ui/components/Input.vue";
import {ref} from "vue";
import OpsButton from "@/shared/ui/components/Button.vue";

const router = useRouter()


const name = ref<string>('Adilbek')
const surname = ref<string>('Zhalmukhanov')
const phone = ref<string>('+77058253345')




const getFirstLatters = (str: string) => {
  return str.split(' ').map((word) => word[0]).join('').toUpperCase()
}


const save = () => {
  router.push('/settings')
}


const back = () => {
  router.push('/settings')
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

