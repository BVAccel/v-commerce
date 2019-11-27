import { ProductService } from '../../services/product.service';

/**

  PRODUCT STORE:

  The product store is used to set a current product to the store. The "current product"
  use case could be if you are in the product template and have a nested components that need
  to know what product the current product is and you do not think it best practice to prop down
  the handle sting all the way to the nested component.

**/

/**
 * Fields
 */
const productService = new ProductService();

/**
 * Mutation Consts
 */
const SET_PRODUCT = 'SET_PRODUCT';
const SET_HANDLE = 'SET_HANDLE';

// STATE
const state = {
  currentProduct: {},
  handle: String
}

const mutations = {
  SET_PRODUCT (state, product) {
    state.all = product;
    state.currentProduct = product;
  },
  SET_HANDLE (state, handle) {
    state.handle = handle;
  }
}

const actions = {
  setProduct ({ commit }, handle) {

    // Check if current collection already requsted
    if(state.handle != handle){

      // Set current handle
      commit(SET_HANDLE, handle)

      // Set current collection
      console.log('HANDLE2', handle.handle)
      productService.getProductData(handle.handle).then((resp)=>{
        console.log('product resp', resp);
        commit(SET_PRODUCT, resp.data)
      })

    }

  }
}

export default { namespaced: true, state, mutations, actions }
