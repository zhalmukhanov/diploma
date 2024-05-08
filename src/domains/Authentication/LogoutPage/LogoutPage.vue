<script setup lang="ts">
import IconLoading from '@/shared/ui/icon/loading.vue'
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router"
import { IonPage } from '@ionic/vue'
import {postAuthLogout} from "@/shared/api/postAuthLogout";
import {createRequest} from "@/shared/utils/request";


const router = useRouter()
const loading = ref(true)



const logout = async () => {
  loading.value = true
  await createRequest('', 500)
  loading.value = false

  window.localStorage.removeItem('user')
  router.push('/hello')
}

onMounted(() => {
  logout()
})
</script>

<template>
  <ion-page>
    <div class="h-full flex flex-col items-center justify-center">
     <icon-loading v-if="loading" class="w-10 h-10 text-blue-700 my-2 animate-spin"/>
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