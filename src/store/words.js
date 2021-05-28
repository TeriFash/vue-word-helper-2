const state = {
  textInClipboard: '',
  textInputName: '',
  data: JSON.parse(localStorage.getItem('data') || '[]'),
  sections: JSON.parse(localStorage.getItem('sections') || '{}'),
};

const mutations = {
  setTextInClipboard(state, payload) {
    state.textInClipboard = payload;
  },
  setTextInputName(state, payload) {
    state.textInputName = payload;
  },
  setData(state, payload) {
    state = Object.assign(state, payload);
  },
  LOAD_DATA(state, payload) {
    state.data = payload;
  },
  LOAD_SECTIONS(state, payload) {
    // const [{ simple, accompanying, rare }] = payload;
    // const iSsections = { simple, accompanying, rare };
    const iSsections = payload;

    if (!localStorage.getItem('sections')) {
      localStorage.setItem('sections', JSON.stringify(iSsections));
      state.sections = iSsections;
    }
  },
  LOAD_CLIPBOARD_DATA(state, payload) {
    const newData = payload.textInClipboard;
    const oldData = state.textInClipboard;

    if (newData !== oldData) {
      localStorage.setItem('textInClipboard', payload.textInClipboard);
      state = Object.assign(state, payload);
    } else {
      state = Object.assign(state, {
        textInClipboard: localStorage.getItem('textInClipboard'),
      });
    }
  },
};

const actions = {
  async GET_CLIPBOARD_DATA({ commit }) {
    try {
      const textData = await navigator.clipboard.readText();
      const textArr = textData.split(' ');
      const [textF, textS] = textArr;
      let result = '';

      if (textArr.length <= 2) {
        result = textF;
      } else {
        result = !textF ? textS : textF;
      }
      commit('LOAD_CLIPBOARD_DATA', { textInClipboard: result });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async FETCH_SECTIONS({ commit }) {
    // const result = [];
    try {
      // const db = firebase.firestore()
      // await db.collection('sections').get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     result.push(doc.data());
      //   });
      //   commit('LOAD_SECTIONS', result);
      // });

      const result = await this._vm.$db;

      commit('LOAD_SECTIONS', result);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
  // async SET_DATA({ commit }, payload) {
  //   const { collection } = payload;
  //   const result = [];
  //   try {
  //     const db = firebase.firestore()
  //     await db.collection(collection).get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         result.push(doc.data());
  //       });
  //       commit('LOAD_DATA', result);
  //     });
  //   } catch (error) {
  //     // console.log(error.message);
  //     // throw error;
  //   }
  // },
  async SET_CLIPBOARD_DATA({ commit, dispatch }, payload) {
    if (payload) {
      const { textData } = payload;
      // commit('LOAD_CLIPBOARD_DATA', payload === true ? '' : payload);
      commit('setData', { textInClipboard: textData });
    } else {
      await dispatch('GET_CLIPBOARD_DATA');
      // const textData = navigator.clipboard.readText();
      // const textArr = textData.split(' ');
      // let result = [];
      // console.log('---textData', textData);
      // console.log('---textArr', textData);

      // if (textArr.length <= 2) {
      //   result = [textArr];
      //   console.log('---result 1', result);
      // } else {
      //   result = textArr[0] ? textArr[1] : textArr[0];
      //   console.log('---result 2', result);
      // }

      // commit('setData', { textInClipboard: result });
      // commit('LOAD_CLIPBOARD_DATA', result);
    }
  },
};

const getters = {
  getDataList: state => state.data,
  getSectionsList: state => state.sections,
  getClipboardData: state => state.textInClipboard,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
