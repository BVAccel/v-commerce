
import Vue from 'vue'
import Vuex from 'vuex'

// modules
import products from './modules/products'
import collections from './modules/collections'
import cart from './modules/cart'
import toast from './modules/toast'
import scroll from './modules/scroll'
import video from './modules/video'

Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
  state,
  modules: {
    products,
    collections,
    cart,
    toast,
    scroll,
    video
  }
})
