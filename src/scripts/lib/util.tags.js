
const getValueByPrefix = (tags, param) => {
  const prefix = `__${param}:`
  const tag = tags.find(tag => tag.indexOf(prefix) === 0)

  return tag ? tag.slice(prefix.length) : tag
}

export const getRecurringProductId = tags =>
  getValueByPrefix(tags, 'subscription-product-id')

export const getRecurringProductDiscount = tags =>
  getValueByPrefix(tags, 'subscription-product-discount')

export const getRecurringProductFrequencies = tags => {
  try {
    return getValueByPrefix(tags, 'subscription-frequency').split('|').map(f => parseInt(f, 10))
  } catch (error) {
    console.error('Subscription frequencies configured incorrectly, should be a pipe delimited list of integers i.e. __subscription-frequency:30|60|90')
    return []
  }
}

export const getRecurringProductUnitType = tags =>
  getValueByPrefix(tags, 'subscription-unit-type')

export const getRecurringProductSubscriptionId = tags =>
  getValueByPrefix(tags, 'subscription-id')
