/* eslint-disable vue/no-parsing-error */
<template>
  <v-app-bar hide-on-scroll elevate-on-scroll app color="secondary" dark>
    <v-app-bar-nav-icon @click="navDrawer = !navDrawer" />

    <v-toolbar-title class="pl-0"> <v-icon>{{getIconTitle}}</v-icon> {{ info.title }} {{ $route.name }}</v-toolbar-title>

    <v-spacer />

    <v-btn v-for="(item, i) in icons" :key="i" icon>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>

    <v-btn icon class="ml-1" aria-label="Theme Switch" @click="setDarkMode">
      <v-icon v-if="this.$vuetify.theme.dark"> mdi-brightness-7 </v-icon>
      <v-icon v-else> mdi-brightness-4 </v-icon>
    </v-btn>

    <!-- <v-switch
      v-model="darkMode"
      color="primary dark"
      class=""
      hide-details
    >
      v-slot:label 
      <v-icon
        right
        class="ml-1"
      >
        mdi-weather-night
      </v-icon>
    </v-switch> -->
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      darkMode: true,
      icons: [
        {
          icon: "mdi-magnify"
        },
        {
          icon: "mdi-heart"
        },
        {
          icon: "mdi-dots-vertical"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({ info: "getMenuInfo" }),
    getIconTitle() {
      let result;
      switch (this.$route.name) {
        case "Words":
          result = "mdi-file-eye";
          break;
        case "Todo":
        case "/":
          result = "mdi-briefcase-edit";
          break;
        case "About":
          result = "mdi-unicorn";
          break;
        default:
          result = "mdi-code-braces-box";
          break;
      }
      return result
    },

    navDrawer: {
      get() {
        return this.$store.state.menu.drawer;
      },
      set(val) {
        this.toggle(val);
      }
    }
  },
  watch: {
    darkMode() {
      this.darkMode ? (this.$vuetify.theme.dark = true) : (this.$vuetify.theme.dark = false);
    }
  },
  methods: {
    ...mapMutations(["toggle"]),
    setDarkMode() {
      let metaThemeColor = document.querySelector("meta[name=theme-color]");
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (localStorage) localStorage.setItem("darkMode", this.$vuetify.theme.dark);
      if (this.$vuetify.theme.dark) {
        metaThemeColor.setAttribute("content", "#212121");
      } else {
        metaThemeColor.setAttribute("content", "#0277bd");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.v-app-bar-title {
  &__placeholder,
  &__content {
    width: 150px !important;
  }
}
</style>
