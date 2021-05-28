import Vue from "vue";
import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
  // measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: !0 })
  .catch(() => {
    console.warn("DB offline support not available");
  });
const db = firebase.firestore();

async function getSections() {
  let result = [];
  try {
    await db
      .collection("sections")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let dataMap = doc.data();
          let dataVal = Object.entries(dataMap).map(item => item[1]);
          let data = { [doc.id]: dataVal };

          result.push(data);
        });
      });

    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

Vue.prototype.$db = db;
Vue.prototype.$sections = getSections();

export default firebase;
