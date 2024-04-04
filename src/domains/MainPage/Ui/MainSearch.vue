<template>
  <div class="w-full flex flex-col gap-6 pt-[24px] pb-[55px] px-6">
    <div class="flex justify-between w-full">
      <span class="font-bold text-[18px]">Search</span>
      <span class="text-[#1E40AF] text-sm underline" @click="reset">Reset</span>
    </div>
    <ops-input v-model="search" placeholder="Search" class="h-[46px]" serach/>

    <div class="flex flex-col gap-3 w-full">
      <span class="text-[#696969] text-sm">{{search ? 'Search results' : 'Nearest parkings' }}</span>
      <div class="inline-flex flex-col gap-2 items-start">
        <div
            v-for="result in searchResult"
            class="rounded-[10px] border-[1px] border-[#D8D8D8] h-[40px] px-4 flex items-center justify-center text-sm"
            :key="result.id"
            @click="selectResult(result.id)"
        >
          {{ result.name }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import OpsInput from "@/shared/ui/components/Input.vue";

type Result =
  {
    id: number,
    name: string
  }


const defaultSearchResult: Result[] = [
  {
    id: 1,
    name: 'ADK Parking, Satpayeva 90'
  },
  {
    id: 2,
    name: 'Abdibayeva 54'
  },
  {
    id: 3,
    name: 'Kabanbay Batyr 8'
  }
]

const MegaSearch: Result[] = [
  {
    id: 4,
    name: 'Mega Park Parking, Makatayeva / Seifullina'
  },
  {
    id: 5,
    name: 'Mega Center Alma-Ata, Rozabakiyeva'
  },
  {
    id: 6,
    name: 'Megatau, Pushkina'
  }

]

const search = ref('')
const searchResult = ref<Result[]>(defaultSearchResult)
const selectedResult = ref<number>(-1)



const reset = () => {
  search.value = ''
  searchResult.value = []
}

const selectResult = (id: number) => {
  selectedResult.value = id
}


watch(search, (value) => {
  if (value === 'Mega') {
    searchResult.value = MegaSearch
  } else {
    searchResult.value = defaultSearchResult
  }
})
</script>

<style scoped>

ion-range::part(pin) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #030712;
  font-size: 14px;
  transform: scale(1.01);
  background: none;

  bottom: -20px;
}

ion-range::part(pin)::before {
  content: none;
}

ion-range::part(tick), ion-range::part(tick-active) {
  display: none;
}

ion-range::part(knob) {
  background: #FAFAFA;
  box-shadow: 0 6px 11px 0 rgba(0, 0, 0, 0.15);
}

ion-range::part(knob) {
  background: #FAFAFA;
}

ion-range::part(bar) {
  background: #78788033;
}

ion-range::part(bar-active) {
  background: #1D4E8D;
}
</style>