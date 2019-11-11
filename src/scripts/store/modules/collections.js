import { CollectionService } from '../../services/collection.service';

/**
 * Fields
 */
const collectionService = new CollectionService();

/**
 * Mutation Consts
 */
const SET_COLLECTION = 'SET_COLLECTION';
const SET_HANDLE = 'SET_HANDLE';

// STATE
const state = {
  currentCollection: [],
  currentPage:1,
  handle:String
}

const mutations = {
  SET_COLLECTION (state, collection) {
   state.currentCollection = collection
  },
  SET_HANDLE (state, handle) {
    state.handle = handle
   }
}

const actions = {
  setCollection ({ commit }, handle) {
    // check if current collection already fetched
    if(state.handle != handle){
      // set current handle
      commit(SET_HANDLE,handle);

      // set current collection
      collectionService.getCollectionData(handle).then((response)=>{
        commit(SET_COLLECTION, response.data)
      })


    }
  }
}

export default { namespaced: true, state, mutations, actions }
