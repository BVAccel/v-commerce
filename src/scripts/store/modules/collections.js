
import axios from 'axios'

import { parseDataForEditor } from 'scripts/lib/util.js'

var fetching = []

const state = {
  all: []
}

const mutations = {
  ADD_COLLECTION (state, collection) {
    let index = state.all.find(c => c.id === c.id)

    fetching.splice(fetching.indexOf(collection.handle), 1)
    if (index > -1) {
      state.all.splice(index, 1, collection)
    } else {
      state.all.push(collection)
    }
  }
}

const actions = {
  addCollection ({ commit }, handle) {
    if (fetching.indexOf(handle) < 0) {
      fetching.push(handle)
      axios.get(`/collections/${handle}?view=json`)
        .then(response => {
          commit('ADD_COLLECTION', parseDataForEditor(response.data))
        })
    }
  }
}

export default { namespaced: true, state, mutations, actions }
