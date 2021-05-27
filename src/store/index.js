import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "@/main";
import menu from "./menu";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    textInClipboard: '',
    textInputName: '',
    data: JSON.parse(localStorage.getItem('data') || '[]'),
    sections: JSON.parse(localStorage.getItem('sections') || '{}'),
    tasks: [
      {
        id: 1,
        title: 'Wake Up',
        done: false
      },
      {
        id: 2,
        title: 'Brush Teeth',
        done: false
      },
      {
        id: 3,
        title: 'Have Breakfast',
        done: false
      },
      {
        id: 4,
        title: 'Take Shower',
        done: false
      } ],
    snackbar : {
      show: false,
      text: ''
    }
  },
  mutations: {
    setData(state, payload) {
      state = Object.assign(state, payload);
    },
    setTextInClipboard(state, payload) {
      state.textInClipboard = payload
    },
    setTextInputName(state, payload) {
      state.textInputName = payload
    },
    LOAD_SECTIONS(state, payload) {
      const [{ simple, accompanying, rare }] = payload;
      const iSsections = { simple, accompanying, rare };

      if (!localStorage.getItem('sections')) {
        localStorage.setItem('sections', JSON.stringify(iSsections));
        state.sections = iSsections;
      }
    },
    LOAD_DATA(state, payload) {
      state.data = payload;
    },
    LOAD_CLIPBOARD_DATA(state, payload) {
      const newData = payload.textInClipboard;
      const oldData = state.textInClipboard;

      if (newData !== oldData) {
        localStorage.setItem('textInClipboard', payload.textInClipboard);
        state = Object.assign(state, payload);
      } else {
        state = Object.assign(state, { textInClipboard: localStorage.getItem('textInClipboard') });
      }
    },
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now,
        title: newTaskTitle,
        done: false
      }
      state.tasks.push(newTask)  
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },

    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    showSnackbar(state, text) {

      let timeout = 0
      if(state.snackbar.show){
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
        
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    } 
  },
  actions: {
    async GET_CLIPBOARD_DATA({ commit }) {
      try {
        const textData = await navigator.clipboard.readText();
        const textArr = textData.split(' ');
        const [textF, textS, ...textT] = textArr;
        let result = '';

        if (textArr.length <= 2) {
          result = textF;
        } else {
          result = !textF ? textS : textF;
          console.log(' ---➜ ', result, textF, textS, textT);
        }
        commit('LOAD_CLIPBOARD_DATA', { textInClipboard: result });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async FETCH_SECTIONS({ commit }) {
      const result = [];
      try {
        await db.collection('sections').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          commit('LOAD_SECTIONS', result);
        });
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    async SET_DATA({ commit }, payload) {
      const { collection } = payload;
      const result = [];
      try {
        await db.collection(collection).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          commit('LOAD_DATA', result);
        });
      } catch (error) {
        // console.log(error.message);
        // throw error;
      }
    },
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
    addTask( { commit }, newTaskTitle ) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'New task added')
    },
    deleteTask( { commit }, id ) {
      commit('deleteTask', id)
      commit('showSnackbar', 'A task has been deleted')
    }
  },
  getters: {
    getDataList: (state) => state.data,
    getSectionsList: (state) => state.sections,
    getClipboardData: (state) => state.textInClipboard,
  },
  modules: {menu},

})
