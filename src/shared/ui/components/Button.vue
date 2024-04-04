<script setup lang="ts">
import { IonRippleEffect } from '@ionic/vue'
import {computed} from "vue";

const props = defineProps({
  color: {
    type: String as () => 'primary' | 'secondary',
    required: false,
    default: 'primary'
  }
})

const classes = {
  base: 'px-4 py-2 rounded-lg inline-flex items-center justify-center  font-bold ion-activatable ripple-wrapper',
  color: {
    primary: 'bg-blue-700 hover:bg-blue-600 text-white',
    secondary: 'bg-white text-blue-700 hover:bg-gray-200'
  }
}

const buttonClasses = computed(() => {
  return `${classes.base} ${classes.color[props.color]}`
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