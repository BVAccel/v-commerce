
import axios from 'axios'

const state = {
  checkout: {},
  sidecartOpen: false
}

const mutations = {
  SET_CHECKOUT (state, checkout) {
    state.checkout = checkout
  },
  OPEN_SIDECART (state) {
    state.sidecartOpen = true
  },
  CLOSE_SIDECART (state) {
    state.sidecartOpen = false
  }
}

const actions = {
  init ({ commit }) {
    // forcing clean cart request for IE11
    let timestamp = new Date().getTime()

    axios.get(`/cart.js?q=${timestamp}`)
      .then(response => commit('SET_CHECKOUT', response.data))
  },
  addItem ({ state, commit, dispatch }, { id, quantity, properties = {} }) {
    return new Promise((resolve, reject) => {
      let index = state.checkout.items.findIndex(item => item.id === id);
      
      if (index > -1) {
        // update instead if the item is already in the cart
        let updatedQuantity = state.checkout.items[index].quantity + parseInt(quantity, 10);

        dispatch('updateItem', { line: index + 1, quantity: updatedQuantity })
          .then(() => resolve())
          .catch(err => reject(err))
      } else {
        // forcing clean cart request for IE11
        let timestamp = new Date().getTime()

        axios.post('/cart/add.js', { id, quantity, properties })
          .then(() => axios.get(`/cart.js?q=${timestamp}`))
          .then(response => {
            commit('SET_CHECKOUT', response.data)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(new Error('Unable to add the item to your cart.'))
          })
      }
    })
  },
  updateItem ({ commit }, { line, quantity }) {
    return new Promise((resolve, reject) => {
      axios.post('/cart/change.js', { line, quantity })
        .then(response => {
          let item = response.data.items[line - 1]
          
          if (item && item.quantity < parseInt(quantity, 10)) {
            this.dispatch('toast/send', {
              text: `Could not add more ${item.title}s. They're all in your cart!`,
              type: 'error'
            }, { root: true })
          }
          
          commit('SET_CHECKOUT', response.data)
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject(new Error('Unable to update the item in your cart.'))
        })
    })
  },
  removeItem ({ commit }, line) {
    return new Promise((resolve, reject) => {
      axios.post('/cart/change.js', { line, quantity: 0 })
        .then(response => {
          commit('SET_CHECKOUT', response.data)
          resolve();
        })
        .catch(err => {
          console.log(err)
          reject(new Error('Unable to remove the item from your cart.'))
        })
    })
  },
  openSidecart: ({ commit }) => commit('OPEN_SIDECART'),
  closeSidecart: ({ commit }) => commit('CLOSE_SIDECART')
}

export default { namespaced: true, state, mutations, actions }
