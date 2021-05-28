import Vue from 'vue'
import Vuex from 'vuex'
import menu from "./menu";
import words from "./words";
import todos from "./todos";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar : {
      show: false,
      text: ''
    }
  },
  mutations: {
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

  modules: {menu, words, todos},
})
