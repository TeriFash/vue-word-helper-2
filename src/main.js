import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import plugins from './plugins'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
})

// const ignoreWarnMessage = "The .native modifier for v-on is only valid on components but it was used on <div>.";
// Vue.config.warnHandler = function (msg, vm, trace) {
//   // `trace` is the component hierarchy trace
//   if (msg === ignoreWarnMessage) {
//     msg = null;
//     vm = null;
//     trace = null;
//   }
// };

new Vue({
  router,
  store,
  ...plugins,
  created() {
    this.$store.dispatch('FETCH_SECTIONS')
    this.$store.dispatch('SET_CLIPBOARD_DATA')
  },
  render: h => h(App),
}).$mount('#app')
