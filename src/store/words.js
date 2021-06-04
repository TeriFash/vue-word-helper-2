// import { firebase } from '@firebase/app'
import '@firebase/firestore'
import service from '@/services/appservices'

const state = {
  tabActive: null,
  textInClipboard: '',
  textInputName: '',
  data: JSON.parse(localStorage.getItem('data') || '[]'),
  sections: JSON.parse(localStorage.getItem('sections') || '{}'),
}

const mutations = {
  setTextInClipboard(state, payload) {
    state.textInClipboard = payload
  },
  setTabActive(state, payload) {
    state.tabActive = payload
  },
  setTextInputName(state, payload) {
    state.textInputName = payload
  },
  setData(state, payload) {
    state = Object.assign(state, payload)
  },
  addWord(state, payload) {
    const { section, position, text } = payload
    state.sections[section][position] = text
  },
  deleteWord(state, payload) {
    const { section, id } = payload
    if (state.sections[section][id]) {
      delete state.sections[section][id]
    }
  },
  setSections(state, payload) {
    const update = JSON.parse(localStorage.getItem('sections')) === payload

    if (!update) {
      localStorage.setItem('sections', JSON.stringify(payload))
    }

    if (!localStorage.getItem('sections')) {
      localStorage.setItem('sections', JSON.stringify(payload))
      state.sections = payload
    }
  },
  loadClipboardData(state, payload) {
    const newData = payload.textInClipboard
    const oldData = state.textInClipboard

    if (newData !== oldData) {
      localStorage.setItem('textInClipboard', payload.textInClipboard)
      state = Object.assign(state, payload)
    } else {
      state = Object.assign(state, {
        textInClipboard: localStorage.getItem('textInClipboard'),
      })
    }
  },
}

const actions = {
  async ADD_WORD({ commit, getters }, payload) {
    try {
      let listLength = getters.getWordListLength
      const { section, text } = payload

      const data = {
        position: listLength[section],
        text,
        section,
      }

      await service.addWordInSections(data)

      commit('addWord', data)
      commit('showSnackbar', 'New word successfully written!')
    } catch (error) {
      commit('showSnackbar', 'New word error!')
    }
  },
  async DELETE_WORD({ commit }, payload) {
    try {
      const { id, section } = payload
      await service.deleteWordInSections({ id, section })
      commit('deleteWord', payload)
      commit('showSnackbar', `Delete word ${id}`)
    } catch (error) {
      console.log('Document error!', error)
    }
  },
  async GET_CLIPBOARD_DATA({ commit }) {
    try {
      const textData = await navigator.clipboard.readText()
      const textArr = textData.split(' ')
      const [textF, textS] = textArr
      let result = ''

      if (textArr.length <= 2) {
        result = textF
      } else {
        result = !textF ? textS : textF
      }
      commit('loadClipboardData', { textInClipboard: result })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async FETCH_SECTIONS({ commit }) {
    try {
      let resultVal = {}
      const result = await service.getSections()

      if (result.success) {
        result.data.forEach(item => {
          const [el] = Object.values(item)
          resultVal[Object.keys(item)] = el
        })
      }
      commit('setSections', resultVal)
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  async SET_CLIPBOARD_DATA({ commit, dispatch }, payload) {
    if (payload) {
      const { textData } = payload
      commit('setData', { textInClipboard: textData })
    } else {
      await dispatch('GET_CLIPBOARD_DATA')
    }
  },
}

const getters = {
  getDataList: state => state.data,
  getSectionsList: state => {
    const { simple, accompanying, rare } = state.sections
    return { simple, accompanying, rare }
  },
  getWordListLength: (state, getters) => {
    const list = getters.getSectionsList
    let elements = {}
    for (const key in list) {
      elements[key] = Object.values(list[key]).length
    }

    return elements
  },
  getClipboardData: state => state.textInClipboard,
  getTabActive: state => state.tabActive,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
