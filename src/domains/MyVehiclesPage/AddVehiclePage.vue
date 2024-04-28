<template>
  <div class="min-h-screen flex flex-col gap-6">
    <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
      <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
      <span class="text-white text-[18px] font-semibold">
        New vehicle
      </span>
      <div class="h-6 w-6"/>
    </div>

    <div  class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow">
      <div class="flex flex-col gap-6">
        <span class="text-[18px] font-medium">Vehicle type</span>
        <div class="flex gap-4 w-full">
          <div
              class="w-1/3 rounded-[6px] border flex items-center justify-center h-[80px] overflow-hidden"
              @click="selectType(1)"
              :class="{'border-[#4ADE80]': selectedType === 1}"
          >
            <img src="/img/type1.png">
          </div>
          <div
              class="w-1/3 rounded-[6px] border flex items-center justify-center h-[80px] overflow-hidden"
              @click="selectType(2)"
              :class="{'border-[#4ADE80]': selectedType === 2}"
          >
            <img src="/img/type2.png">
          </div>
          <div
              class="w-1/3 rounded-[6px] border flex items-center justify-center h-[80px] overflow-hidden"
              @click="selectType(3)"
              :class="{ 'border-[#4ADE80]': selectedType === 3 }"
          >
            <img src="/img/type3.png">
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <ops-input
              v-model="vehicleName"
              class="w-full h-[46px]"
              placeholder="Vehicle name"
          />
          <ops-input
              v-model="vehicleNumber"
              class="w-full h-[46px]"
              placeholder="Vehicle number"
          />
        </div>

      </div>
      <div class="flex flex-col justify-end h-full w-full mt-10 pb-5 grow gap-2">
        <ops-button class="h-[46px]" :disible="!isCanSave" @click="save">Save new vehicle</ops-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import IconEdit from "@/shared/ui/icon/edit.vue";
import IconDelete from "@/shared/ui/icon/delete.vue";
import {IonRippleEffect} from '@ionic/vue';
import {computed, ref} from "vue";
import Delete from "@/shared/ui/icon/delete.vue";
import OpsButton from "@/shared/ui/components/Button.vue";
import OpsInput from "@/shared/ui/components/Input.vue";

const router = useRouter()


const selectedType = ref(0)
const vehicleName = ref('')
const vehicleNumber = ref('')

const save = () => {
  if (!isCanSave.value) {
    return
  }
  router.push('/my-vehicles')
}

const back = () => {
  router.push('/my-vehicles')
}

const selectType = (type: number) => {
  if (selectedType.value === type) {
    selectedType.value = 0
    return
  }
  selectedType.value = type
}

const isCanSave = computed(() => {
  return selectedType.value !== 0 && vehicleName.value !== '' && vehicleNumber.value !== ''
})
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

