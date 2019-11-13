
import { CartService } from '../../services/cart.service';


/**
 * Fields
 */
const cartService = new CartService();

/**
 * Mutation Consts
 */
const SET_DATA = 'SET_DATA';
const OPEN_SIDECART = 'OPEN_SIDECART';
const CLOSE_SIDECART = 'CLOSE_SIDECART';

// STATE
const state = {
  data: {},
  sidecartOpen: false
}

const mutations = {
  SET_DATA (state, data) {
    state.data = data
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
      commit(SET_DATA, resp);
    });
  },
  addItem ({ state, commit, dispatch }, { quantity,id,properties = {} }) {
    cartService.addItem(quantity, id, properties).then((data) => commit(SET_DATA, data));
  },
  updateItem ({ commit }, { id, quantity }) {
    cartService.updateItem(quantity, id).then((data) => commit(SET_DATA, data));
  },
  removeItem({ commit }, id) {
    const quantity = 0;
    cartService.changeItem(quantity, id).then((data) => commit(SET_DATA, data));
  },
  openSidecart({ commit }){
    commit(OPEN_SIDECART);
  },
  closeSidecart({ commit }){
    commit(CLOSE_SIDECART);
  }
}

export default { namespaced: true, state, mutations, actions }
