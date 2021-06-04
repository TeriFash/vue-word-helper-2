import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/locales'

Vue.use(VueI18n)

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || navigator.language.substr(0, 2),
  messages,
})
