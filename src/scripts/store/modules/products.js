
import axios from 'axios'

import { parseDataForEditor } from 'scripts/lib/util.js'

var queue = []
var fetching = false
var cartInitialized = false

const queueFetch = (handle, commit) => {
  queue.push(handle)
  if (!fetching && cartInitialized) fetchNextProduct(commit)
}

const fetchNextProduct = commit => {
  fetching = true

  if (queue.length > 0) {
    fetchProduct(commit)
  } else {
    fetching = false
  }
}

const fetchProduct = commit => {
  let handle = queue.shift()
  let existingProduct = state.all.find(p => p.handle === handle)

  // don't fetch if this was retrieved as part of the cart products
  if (!existingProduct) {
    axios.get(`/products/${handle}?view=json`)
      .then(response => {
        let productData = parseDataForEditor(response.data)
  
        if (productData) commit('ADD_PRODUCT', response.data)
        fetchNextProduct(commit)
      })
  } else {
    fetchNextProduct(commit)
  }
}

const state = {
  all: []
}

const mutations = {
  ADD_PRODUCT (state, product) {
    state.all.push(parseDataForEditor(product))
  }
}

const actions = {
  init ({ commit }) {
    axios.get('/cart?view=json')
      .then(response => {
        let cartData = parseDataForEditor(response.data)

        cartData.forEach(product => commit('ADD_PRODUCT', product))
        cartInitialized = true
        fetchNextProduct(commit)
      })
  },
  addProduct ({ state, commit }, handle) {
    if (queue.indexOf(handle) < 0 && !state.all.find(p => p.handle === handle)) {
      queueFetch(handle, commit)
    }
  }
}

export default { namespaced: true, state, mutations, actions }
