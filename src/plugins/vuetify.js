import Vue from "vue";

import Vuetify from "vuetify/lib/framework";
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      variations: false,
      themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value)
      }
    },
    themes: {
      light: {
        primary: "#364f6b",
        secondary: "#3fc1c9",
        accent: "#fc5185",
        bg: "#f5f5f5"
      }
    },
    dark: false
  }
});
