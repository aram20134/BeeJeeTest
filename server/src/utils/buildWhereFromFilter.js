import get from 'lodash/get.js'
import merge from 'lodash/merge.js'

const searchNameFieldResolver = (_key, value, _values) => ({
  name: { contains: value, mode: "insensitive" }
})

const fieldResolvers = {
  q: searchNameFieldResolver,
}

const defaultFieldResolver = (key, value, _values, _context) => {
  return { [key]: value }
}

export function buildWhereFromFilter(filter) {
  if (!filter) return undefined
  const where = Object.keys(filter).reduce((acc, field) => {
    const value = filter[field]
    const fieldResolver = get(fieldResolvers, field, defaultFieldResolver)
    const resolveField = fieldResolver(field, value, filter)
    return merge(acc, resolveField)
  }, {})

  return where
}