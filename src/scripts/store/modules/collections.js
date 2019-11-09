import { CollectionService } from '../../services/collection.service';

/**
 * Fields
 */
const collectionService = new CollectionService();

/**
 * Mutation Consts
 */
const SET_COLLECTION = 'SET_COLLECTION';

// STATE
const state = {
  currentCollection: [],
  currentPage:1,
  handle:String
}

const mutations = {
  SET_COLLECTION (state, collection) {
    // let index = state.all.find(c => c.id === c.id)
    // // fetching.splice(fetching.indexOf(collection.handle), 1)
    // if (index > -1) {
    //   state.all.splice(index, 1, collection)
    // } else {
    //   state.all.push(collection)
    // }
  }
}

const actions = {
  setCollection ({ commit }, handle) {
    // check if current collection already fetched
    if(state.handle != handle){
      collectionService.getCollectionData(handle).then((resp)=>{
        console.log('resp',resp);
        // commit(SET_COLLECTION, response.data)
      })

    }
  }
}

export default { namespaced: true, state, mutations, actions }
