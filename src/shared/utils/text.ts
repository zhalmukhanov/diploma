
export type CutContentOptions = {
  length?: number;
  endWith?: string;
  removeHtmlTags?: boolean;
}

export const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

export const snakeToCamel = (str: string): string => {
  return str.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
}

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getFirstNCharacters = (text: string, n: number) => {
  return text.length > n ? text.substring(0, n) + '...' : text
}

export const removeHtmlTags = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, '')
}

export const uuid = () => {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export const camelCaseToLowerKebabCase = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export const cutContent = (text: string, options?: CutContentOptions): string => {
  if (text.length <= (options?.length || 300)) return text

  return (options?.removeHtmlTags ? removeHtmlTags(text) : text).substring(0, (options?.length || 300)) + (options?.endWith || '...')
}
