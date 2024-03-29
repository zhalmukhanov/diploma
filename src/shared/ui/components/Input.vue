<script setup lang="ts">
import {computed} from "vue";
const modelValue = defineModel()

const props = defineProps({
  type: {
    type: String as () => 'text' | 'password',
    required: false,
    default: 'text'
  }
})


const classes = {
  base: 'px-4 py-2 rounded-lg inline-flex items-center justify-center border-[1px] border-gray-300 focus:border-blue-700 focus:outline-none text-sm text-black',
}

const buttonClasses = computed(() => {
  return `${classes.base}`
})

</script>

<template>
  <input :type="type" :class="buttonClasses" v-model="modelValue" />
</template>

<style scoped>
::placeholder {
  color: #030712;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12 -18 */
  color: #030712;
}
</style>