import Vue from 'vue'
import firebaseConfig from './config'
import { firebase } from '@firebase/app'
import '@firebase/firestore'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: !0 })
  .catch(() => {
    console.warn('DB offline available')
  })

// const setData = []

// async function addText() {
//   const db = firebase.firestore()
//   try {
//     const sectionsDB = await db.collection('sections').doc('accompanying')
//     await sectionsDB.set({ ...setData })
//   } catch (error) {
//     console.log(error.message)
//     throw error
//   }
// }

// addText()

async function getSections() {
  let result = []
  try {
    const db = firebase.firestore()
    await db
      .collection('sections')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let dataMap = doc.data()
          let dataVal = Object.entries(dataMap).map(item => item[1])
          let data = { [doc.id]: dataVal }

          result.push(data)
        })
      })

    return result
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

const firebaseApi = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$sections', { value: getSections() })
    Object.defineProperty(Vue.prototype, '$firebase', { value: firebase })
    Object.defineProperty(Vue.prototype, '$firestore', {
      value: firebase.firestore(),
    })
  },
}

Vue.use(firebaseApi)

export default firebaseApi
