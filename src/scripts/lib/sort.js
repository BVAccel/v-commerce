/**
 * Simple helper function that determines which sorting function to use.
 * 
 * @param {string} sortMethod
 * @returns {function}
 */
export const sortProductsBy = sortMethod => {
  switch(sortMethod) {
    case 'alphabetically': return sortAlphabetically;
    case 'priceDesc': return sortPriceDesc;
    case 'priceAsc': return sortPriceAsc;
    default: return sortAlphabetically;
  }
}

export const sortAlphabetically = (a, b) => {
  if(a.title < b.title) return -1;
  if(a.title > b.title) return 1;
  return 0;
}

export const sortPriceDesc = (a, b) => {
  return b.price - a.price;
}

export const sortPriceAsc = (a, b) => {
  return a.price - b.price;
}