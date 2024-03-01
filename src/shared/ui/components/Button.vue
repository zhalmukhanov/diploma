<script setup lang="ts">
import { IonRippleEffect } from '@ionic/vue'

</script>

<template>
  <div class="px-4 py-2 bg-blue-700 rounded-lg inline-flex items-center justify-center text-white font-bold hover:bg-blue-600">
    <slot>Button</slot>

    <ion-ripple-effect>
    </ion-ripple-effect>
  </div>
</template>

<style scoped>

</style>