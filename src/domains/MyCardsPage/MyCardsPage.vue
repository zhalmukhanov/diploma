<template>
  <ion-page>
    <div class="bg-white min-h-screen flex flex-col gap-6">
      <div class="h-16 rounded-b-2xl bg-blue-700 w-full flex justify-between items-center ion-padding">
        <icon-back class="w-6 h-6 text-white my-2" @click="back"/>
        <span class="text-white text-[18px] font-semibold">
        {{ isEdit ? 'Edit payment methods' :'Payment methods' }}
      </span>
        <div v-if="!isEdit && !loading" class="ion-activatable ripple-wrapper p-1" @click="edit">
          <icon-edit class="w-[18px] h-[18px] text-white" />
          <ion-ripple-effect/>
        </div>
        <div v-else class="h-6 w-6"/>
      </div>

      <div v-if="!loading"  class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow">
        <div class="flex flex-col gap-4">
          <template v-for="item in vehicles" :key="item.id">
            <div class="w-full flex justify-between items-center">
              <span class="text-sm text-black text-opacity-50">{{item.name}}</span>
              <div class="flex gap-2 items-center">
                <span class="text-[16px]">***{{getLastFour(item.number)}}</span>
                <div v-if="isEdit" class="ion-activatable ripple-wrapper" @click="del(item.id)">
                  <icon-delete />
                  <ion-ripple-effect/>
                </div>

              </div>
            </div>
            <div class="h-[1px] w-full bg-[#C9C9C9] bg-opacity-50"/>
          </template>
        </div>
        <div v-if="isEdit" class="flex flex-col justify-end h-full w-full mt-10 pb-5 grow gap-2">
          <ops-button class="h-[46px]" @click="addNew">Add new card</ops-button>
        </div>
      </div>
      <div v-else class="w-full ion-padding py-0 pt-0 flex flex-col h-full grow items-center justify-center">
        <icon-loading class="w-10 h-10 text-blue-700 my-2 animate-spin"/>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import IconBack from "@/shared/ui/icon/back.vue";
import IconEdit from "@/shared/ui/icon/edit.vue";
import IconDelete from "@/shared/ui/icon/delete.vue";
import {IonRippleEffect, IonPage, onIonViewDidEnter} from '@ionic/vue';
import {computed, ref} from "vue";
import OpsButton from "@/shared/ui/components/Button.vue";
import {useStore} from "@/shared/store";
import IconLoading from "@/shared/ui/icon/loading.vue";

const router = useRouter()
const store = useStore()


const vehicles = computed(() => store.getCards)
const isEdit = ref(false)

const loading = ref(false)


const del = (id: number) => {
  store.deleteCard(id)

  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
}

const edit = () => {
  isEdit.value = true
}

const addNew = () => {
  router.push('/add-card')
}

const back = () => {
  if (isEdit.value) {
    isEdit.value = false
    return
  }
  router.push('/settings')
}

const getLastFour = (str: string) => {
  return str.slice(-4)
}

onIonViewDidEnter(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 700)
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

