
import { CartService } from '../../services/cart.service';


/**
 * Fields
 */
const cartService = new CartService();

/**
 * Mutation Consts
 */
const SET_CHECKOUT = 'SET_CHECKOUT';
const OPEN_SIDECART = 'OPEN_SIDECART';
const CLOSE_SIDECART = 'CLOSE_SIDECART';

// STATE
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
    cartService.getCartData().then((resp) => {
      commit(SET_CHECKOUT, resp.data);
    });
  },
  addItem ({ state, commit, dispatch }, { quantity,id,properties = {} }) {
    cartService.addItem(quantity, id, properties).then((data) => commit(SET_CHECKOUT, data));
  },
  updateItem ({ commit }, { id, quantity }) {
    cartService.updateItem(quantity, id).then((data) => commit(SET_CHECKOUT, data));
  },
  removeItem({ commit }, id) {
    const quantity = 0;
    cartService.changeItem(quantity, id).then((data) => commit(SET_CHECKOUT, data));
  },
  openSidecart({ commit }){
    commit(OPEN_SIDECART);
  },
  closeSidecart({ commit }){
    commit(CLOSE_SIDECART);
  }
}

export default { namespaced: true, state, mutations, actions }
