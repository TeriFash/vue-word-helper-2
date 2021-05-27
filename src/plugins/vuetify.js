import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vuetify.config.silent = true

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#364f6b',
        secondary: '#3fc1c9',
        accent: '#fc5185',
        bg: '#f5f5f5'
      }
    }
  }
});
