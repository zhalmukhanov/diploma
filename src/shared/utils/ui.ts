import { objectToDotNotation, dotNotationToObject } from '@/shared/utils/object'

export const handleOptions = <T>(options: T | undefined, defaultOptions: T): T => {
  if (!options) return defaultOptions

  const optionsDoted = objectToDotNotation(options as Record<string, unknown>)
  const defaultOptionsDoted = objectToDotNotation(defaultOptions as Record<string, unknown>)

  for (const key in defaultOptionsDoted) {
    if (optionsDoted[key] !== undefined) {
      defaultOptionsDoted[key] = optionsDoted[key]
    }
  }

  return dotNotationToObject(defaultOptionsDoted, false) as T
}

export const handleStyle = (style: Record<string, string> | string): Record<string, string> => {
  if (!style) return {}
  if (typeof style === 'string') {
    let cObject = {}
    style.split(';').forEach((style) => {
      const [key, value] = style.split(':')
      cObject = { ...cObject, [key]: value }
    })
    return cObject
  }
  return style
}

const useUI = () => {
  return {
    handleOptions,
    handleStyle
  }
}

export default useUI
