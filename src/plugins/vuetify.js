import Vue from 'vue'

import Vuetify from 'vuetify/lib/framework'
// import colors from 'vuetify/lib/util/colors'
// import ru from '@/locales/ru'
// import en from '@/locales/en'

Vue.use(Vuetify)

// Vue.component('lang-switcher', {
//   methods: {
//     changeLocale() {
//       this.$vuetify.lang.current = 'en'
//     },
//   },
// })

export default new Vuetify({
  // lang: {
  //   t: (key, ...params) => i18n.t(key, params),
  // },
  theme: {
    options: {
      variations: false,
      themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
    themes: {
      light: {
        primary: '#364f6b',
        secondary: '#3fc1c9',
        accent: '#fc5185',
        bg: '#f5f5f5',
      },
    },
    dark: false,
  },
})
