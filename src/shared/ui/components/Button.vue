<script setup lang="ts">
import { IonRippleEffect } from '@ionic/vue'
import {computed} from "vue";
import IconLoading from '@/shared/ui/icon/loading.vue'

const props = defineProps({
  color: {
    type: String as () => 'primary' | 'secondary' | 'outline',
    required: false,
    default: 'primary'
  },
  disible: {
    type: Boolean,
    required: false,
    default: false
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const classes = {
  base: 'px-4 py-2 rounded-lg inline-flex items-center justify-center  font-bold ion-activatable ripple-wrapper',
  color: {
    primary: 'bg-blue-700 hover:bg-blue-600 text-white',
    secondary: 'bg-white text-blue-700 hover:bg-gray-200',
    outline: 'border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white'
  },
  disible: 'opacity-50 cursor-not-allowed'
}

const buttonClasses = computed(() => {
  return `${classes.base} ${classes.color[props.color]} ${props.disible || props.loading ? classes.disible : ''}`
})

</script>

<template>
  <div :class="buttonClasses">
    <slot v-if="!loading">Button</slot>
    <div v-else>
      <span class="text-white">
        <icon-loading class="!w-5 !h-5 animate-spin" />
      </span>
    </div>

    <ion-ripple-effect>
    </ion-ripple-effect>
  </div>
</template>

<style scoped>

</style>