import Vue from 'vue'
import firebaseConfig from './config'
import { firebase } from '@firebase/app'
import '@firebase/firestore'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

const firebaseApi = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', { value: firebase })
    Object.defineProperty(Vue.prototype, '$firestore', {
      value: firebase.firestore(),
    })
  },
}

Vue.use(firebaseApi)

export { db }
export default firebaseApi
