import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import VueClipboard from "vue-clipboard2";

Vue.config.productionTip = false;
// const db = collection;
// Vue.prototype.$db = db;
Vue.use(VueClipboard);
// Vue.use(vuetify);

new Vue({
  router,
  store,
  vuetify,
  firebase,
  created() {
    this.$store.dispatch("FETCH_SECTIONS");
    this.$store.dispatch("SET_CLIPBOARD_DATA");
  },
  render: h => h(App)
}).$mount("#app");
