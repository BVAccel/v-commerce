
const state = {
  scrollTop: 0
}

const mutations = {
  UPDATE_TOP (state, top) {
    state.scrollTop = top
  }
}

const actions = {
  init ({ commit }) {
    window.addEventListener('scroll', () => 
      commit('UPDATE_TOP', window.scrollY))
  }
}

export default { namespaced: true, state, mutations, actions }
