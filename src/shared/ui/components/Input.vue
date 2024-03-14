<script setup lang="ts">
import {computed} from "vue";
const modelValue = defineModel()


const classes = {
  base: 'px-4 py-2 rounded-lg inline-flex items-center justify-center  font-bold border-2 border-gray-300 focus:border-blue-700 focus:outline-none',
}

const buttonClasses = computed(() => {
  return `${classes.base}`
})

</script>

<template>
  <input type="text" :class="buttonClasses" v-model="modelValue" />
</template>

<style scoped>

</style>