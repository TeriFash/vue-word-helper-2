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
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  // measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

  async function getSections() {
    const result = [];
    try {
      await db.collection('sections').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
      });
      const [data] = result
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  Vue.prototype.$db = getSections()

export default firebase;
