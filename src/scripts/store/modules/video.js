
const state = {
  current: ''
}

const mutations = {
  SET_VIDEO (state, videoId) {
    state.current = videoId
  }
}

const actions = {
  play ({ commit }, videoId) {
    commit('SET_VIDEO', videoId)
  },
  clear({ commit }) {
    commit('SET_VIDEO', '')
  }
}

export default { namespaced: true, state, mutations, actions }
