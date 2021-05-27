import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { firebaseConfig } from "./config";
import {firebase} from '@firebase/app';
import 'firebase/firestore';
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

firebase.initializeApp(
  firebaseConfig
)
export const db = firebase.firestore();

Vue.use(VueClipboard);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
