/**
 * Mutation Consts
 */
const SET_LINKLIST = 'SET_LINKLIST';
const SET_HANDLE = 'SET_HANDLE';

const SET_SECTION = 'SET_SECTION';
const SET_SECTION_NAME = 'SET_SECTION_NAME';

/**
 * STATE
 */
const state = {
  linkLists: [],
  handles: [],
  sections: [],
  section_names: [],
};

/**
 * MUTATIONS
 */
const mutations = {
  SET_LINKLIST(state, dto) {
    state.linkLists.push(dto);
  },
  SET_HANDLE(state, handle) {
    state.handles.push(handle);
  },
  SET_SECTION(state, dto) {
    state.sections.push(dto);
  },
  SET_SECTION_NAME(state, name) {
    state.section_names.push(name);
  },
};

/**
 * ACTIONS
 */
const actions = {
  init({ commit }) {},
  setLinkLists({ state, commit, dispatch }, { handle, dto }) {
    //Check if link list already in the store
    if (checkIfHandleExists(handle)) {
      return;
    }
    // commit handle
    commit(SET_HANDLE, handle);
    // commit linklist
    commit(SET_LINKLIST, dto);
  },
  setSection({ state, commit, dispatch }, { name, dto }) {
    //Check if section already in the store
    if (checkIfNameExists(name)) {
      return;
    }
    // commit name
    commit(SET_SECTION_NAME, name);
    // commit section
    commit(SET_SECTION, dto);
  },
};

// Factory Methods
const checkIfHandleExists = (handle) => {
  let retValue;
  state.handles.forEach((element) => {
    if (element == handle) {
      retValue = true;
    }
  });
  return retValue;
};

const checkIfNameExists = (name) => {
  return state.section_names.indexOf(name) !== -1;
};

export default { namespaced: true, state, mutations, actions };
