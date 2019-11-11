

/**
 * Mutation Consts
 */
const SET_LINKLIST = 'SET_LINKLIST';
const SET_HANDLE = 'SET_HANDLE';


/**
 * STATE
 */
const state = {
  linkLists: [],
  handles: []
}


/**
 * MUTATIONS
 */
const mutations = {
  SET_LINKLIST (state, dto) {
    state.linkLists.push(dto);
  },
  SET_HANDLE (state, handle) {
    state.handles.push(handle);
  }
}

/**
 * ACTIONS
 */
const actions = {
  init ({ commit }) {},
  setLinkLists ({ state, commit, dispatch }, { handle , dto } ) {
    //Check if link list already in the store
    if(checkIfHandleExists(handle)){
      return;
    }
    // commit handle
    commit(SET_HANDLE,handle);
    // commit linklist
    commit(SET_LINKLIST,dto)
  }
}



// Factory Methods
const checkIfHandleExists = (handle) => {
  let retValue;
  state.handles.forEach( element => {
    if(element == handle ){
      retValue = true;
    }
  })
  return retValue;
}


export default { namespaced: true, state, mutations, actions }
