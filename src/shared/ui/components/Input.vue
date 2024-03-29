<script setup lang="ts">
import {computed} from "vue";
const modelValue = defineModel()

const props = defineProps({
  type: {
    type: String as () => 'text' | 'password',
    required: false,
    default: 'text',
  },
  border: {
    type: Boolean,
    required: false,
    default: true,
  },
  placeGray: {
    type: Boolean,
    required: false,
    default: false,
  },
})


const classes = {
  base: 'px-4 py-2 rounded-lg inline-flex items-center justify-center border-[1px] focus:border-blue-700 focus:outline-none text-sm text-black',
  border: 'border-gray-300',
}

const buttonClasses = computed(() => {
  return `${classes.base} ${props.border ? classes.border : ''} ${props.placeGray ? 'placeholder-gray' : 'placeholder'}`
})

</script>

<template>
  <input :type="type" :class="buttonClasses" v-model="modelValue" />
</template>

<style scoped>
.placeholder::placeholder {
  color: #030712;
  opacity: 1; /* Firefox */
}

.placeholder::-ms-input-placeholder { /* Edge 12 -18 */
  color: #030712;
}

.placeholder-gray::-ms-input-placeholder { /* Edge 19+ */
  color: #D8D8D8;
}

.placeholder-gray::placeholder {
  color: #D8D8D8;
  opacity: 1; /* Firefox */
}
</style>