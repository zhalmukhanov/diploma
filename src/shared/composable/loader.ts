import { ref, computed, ComputedRef, Ref } from 'vue'

export type LoaderProperties = {
  stack: Ref<Array<string>>;
  activate: (name: string) => void;
  deactivate: (name: string) => void;
  isActive: (key: string) => ComputedRef<boolean>;
  isActiveOneOf: (names: Array<string>) => ComputedRef<boolean>;
}

export type SimpleLoaderProperties = {
  activate: () => void,
  deactivate: () => void
  isActive: () => boolean
}

const loading = ref<Array<string>>([])

export const useLoader = (): LoaderProperties => {
  return {
    stack: loading,
    activate: (name: string) => { loading.value.push(name) },
    deactivate: (name: string) => { loading.value = loading.value.filter(n => n !== name) },
    isActive: (name: string) => computed<boolean>(() => loading.value.includes(name)),
    isActiveOneOf: (names: Array<string>) => {
      return computed<boolean>(() => {
        return names.some(name => loading.value.includes(name))
      })
    }
  }
}

export const useSimpleLoader = (): SimpleLoaderProperties => {
  const loader = ref<boolean>(false)

  return {
    activate: () => { loader.value = true },
    deactivate: () => { loader.value = false },
    isActive: () => loader.value
  }
}

export default useLoader
