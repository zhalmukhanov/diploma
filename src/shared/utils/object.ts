/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArray } from './array'
import { toCamel, camelCaseToLowerKebabCase } from './text'

export const objectToDotNotation = (obj: Record<string, any>, prefix = ''): Record<string, any> => {
  return Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
      return {
        ...res,
        ...objectToDotNotation(obj[el], `${prefix}${el}.`)
      }
    } else if (typeof obj[el] === 'object' && obj[el] !== null) {
      return {
        ...res,
        ...objectToDotNotation(obj[el], `${prefix}${el}.`)
      }
    } else {
      return {
        ...res,
        [`${prefix}${el}`]: obj[el]
      }
    }
  }, {})
}

export const dotNotationToObject = (obj: Record<string, unknown>, kebab = true): Record<string, unknown> => {
  const res: Record<string, any> = {}
  Object.keys(obj).forEach((key) => {
    const split = key.split('.')
    let current = res
    for (let i = 0; i < split.length; i++) {
      const kebabKey = kebab ? camelCaseToLowerKebabCase(split[i]) : split[i]
      if (i === split.length - 1) {
        current[kebabKey] = obj[key]
      } else {
        current[kebabKey] = current[kebabKey] || {}
        current = current[kebabKey]
      }
    }
  })
  return res
}

export const objectDeepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

export const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {}

    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k])
      })

    return n
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i)
    })
  }

  return o
}

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value)
}
