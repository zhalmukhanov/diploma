type FromToType = {
  from: string,
  to: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply?: (from: unknown|any, object?: any) => unknown|any,
}

export const isArray = function (a) {
  return Array.isArray(a)
}

export function arrayGroupByProperty<T> (array: Array<T>, property: string): Record<string, Array<T>> {
  return array.reduce((acc, d) => {
    if (Object.keys(acc).includes(d[property])) return acc
    acc[d[property]] = array.filter((g) => g[property] === d[property])
    return acc
  }, {})
}

export function groupByParentChildFields<T> (data: Array<T>, field: string, childField: string, startValue?: unknown, level = 0) {
  let items = data

  if (startValue) {
    items = data.filter((item) => item[field] === startValue)
  }

  return items.map((item) => {
    const children = item[field] === item[childField]
      ? []
      : groupByParentChildFields(data, field, childField, item[childField], level + 1)

    return { ...item, children, level }
  })
}

export function nestedToOneDimension<T> (data: Array<T>, field = 'children') {
  const result: Array<T> = []
  data.forEach((item) => {
    result.push(item)
    if (item[field].length > 0) {
      result.push(...nestedToOneDimension(item[field]) as Array<T>)
    }
    delete item[field]
  })
  return result
}

export function addLevel<T> (data: Array<T>, level = 0, childField: string):Array<T&{level: number}> {
  return data.map((item) => {
    return {
      ...item,
      level,
      [childField]: addLevel(item[childField], level + 1, childField)
    }
  })
}

export function typeMapper<T, K> (data: T, mapperObject: Array<FromToType>): K {
  const returnValue: K = {} as K
  mapperObject.forEach((mapper: FromToType) => {
    try {
      if (mapper.apply) {
        returnValue[mapper.to] = mapper.apply(data[mapper.from], data)
      } else {
        returnValue[mapper.to] = data[mapper.from]
      }
    } catch (error) {
      returnValue[mapper.to] = null
    }
  })

  return returnValue
}

export function typeMapperFromArray<T, K> (data: T[], mapperObject: Array<FromToType>): K[] {
  const returnValue: K[] = []
  data.forEach((item: T) => returnValue.push(typeMapper<T, K>(item, mapperObject)))

  return returnValue
}
