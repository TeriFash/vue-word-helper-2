import { firebase } from "@firebase/app";
import "@firebase/firestore";

const state = {
  tabActive: null,
  textInClipboard: "",
  textInputName: "",
  data: JSON.parse(localStorage.getItem("data") || "[]"),
  sections: JSON.parse(localStorage.getItem("sections") || "{}")
};

const mutations = {
  setTextInClipboard(state, payload) {
    state.textInClipboard = payload;
  },
  setTabActive(state, payload) {
    state.tabActive = payload;
  },
  setTextInputName(state, payload) {
    state.textInputName = payload;
  },
  setData(state, payload) {
    state = Object.assign(state, payload);
  },
  addWord(state, payload) {
    let newWord = {
      id: Date.now,
      text: payload.text
    };
    state.sections[payload.section].push(newWord);
  },
  deleteWord(state, payload) {
    const index = state.sections[payload.section].indexOf(payload.id);
    if (index > -1) {
      state.sections[payload.section].splice(index, 1);
    }
  },
  LOAD_DATA(state, payload) {
    state.data = payload;
  },
  LOAD_SECTIONS(state, payload) {
    const update = JSON.parse(localStorage.getItem("sections")) === payload;

    if (!update) {
      localStorage.setItem("sections", JSON.stringify(payload));
    }

    if (!localStorage.getItem("sections")) {
      localStorage.setItem("sections", JSON.stringify(payload));
      state.sections = payload;
    }
  },
  LOAD_CLIPBOARD_DATA(state, payload) {
    const newData = payload.textInClipboard;
    const oldData = state.textInClipboard;

    if (newData !== oldData) {
      localStorage.setItem("textInClipboard", payload.textInClipboard);
      state = Object.assign(state, payload);
    } else {
      state = Object.assign(state, {
        textInClipboard: localStorage.getItem("textInClipboard")
      });
    }
  }
};

const actions = {
  async ADD_WORD({ commit }, payload) {
    try {
      let createLength;

      const { section, text } = payload;
      const sectionsDB = await this._vm.$db.collection("sections").doc(section);
      const counter = await sectionsDB.get().then(querySnapshot => {
        createLength = querySnapshot.data();

        return Object.keys(createLength).length + 1;
      });
      // let counter2 = Object.keys(counter).length;
      await sectionsDB.set(Object.assign({}, { [counter]: { text: text } }), { merge: true });

      console.log("Document successfully written!");
    } catch (error) {
      console.log("Document error!", error);
    }

    commit("addWord", payload);
    // commit("showSnackbar", "New word added");
  },
  async DELETE_WORD({ commit }, payload) {
    try {
      const { section, id } = payload;
      const sectionsDB = this._vm.$db.collection("sections").doc(section);
      // console.log(' ---➜ id ', id)
      await sectionsDB.update({
        [id]: firebase.firestore.FieldValue.delete()
      });

      console.log("Document successfully written!");
    } catch (error) {
      console.log("Document error!", error);
    }

    commit("deleteWord", payload);
    // commit("showSnackbar", "New word added");
  },
  async GET_CLIPBOARD_DATA({ commit }) {
    try {
      const textData = await navigator.clipboard.readText();
      const textArr = textData.split(" ");
      const [textF, textS] = textArr;
      let result = "";

      if (textArr.length <= 2) {
        result = textF;
      } else {
        result = !textF ? textS : textF;
      }
      commit("LOAD_CLIPBOARD_DATA", { textInClipboard: result });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async FETCH_SECTIONS({ commit }) {
    // const result = [];
    try {
      const result = await this._vm.$sections;
      let resultVal = {};
      result.forEach(item => {
        const [data] = Object.values(item);
        resultVal[Object.keys(item)] = data;
      });

      const { simple, accompanying, rare } = resultVal;

      // let resultSorte = Object.fromEntries(Object.entries(result).sort((a, b) => b[1].length - a[1].length));

      commit("LOAD_SECTIONS", { simple, accompanying, rare });
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
      commit("setData", { textInClipboard: textData });
    } else {
      await dispatch("GET_CLIPBOARD_DATA");
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
  }
};

const getters = {
  getDataList: state => state.data,
  getSectionsList: state => state.sections,
  getClipboardData: state => state.textInClipboard
};

export default {
  state,
  mutations,
  actions,
  getters
};
