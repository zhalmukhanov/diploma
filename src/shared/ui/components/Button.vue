<script setup lang="ts">
import { IonRippleEffect } from '@ionic/vue'
import {computed} from "vue";

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
  return `${classes.base} ${classes.color[props.color]} ${props.disible ? classes.disible : ''}`
})

</script>

<template>
  <div :class="buttonClasses">
    <slot>Button</slot>

    <ion-ripple-effect>
    </ion-ripple-effect>
  </div>
</template>

<style scoped>

</style>