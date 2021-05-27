<template>
  <v-app-bar app prominent color="#E91E63" dark>
    <!-- <template v-slot:img="{ props }">
      <v-img v-bind="props"></v-img>
    </template>-->

    <v-app-bar-nav-icon @click="navDrawer = !navDrawer"></v-app-bar-nav-icon>

    <v-app-bar-title>{{ info.title }} {{ $route.name }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn :key="i" icon v-for="(item, i) in icons">
      <v-icon>{{item.icon}}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
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

    navDrawer: {
      get() {
        return this.$store.state.menu.drawer;
      },
      set(val) {
        this.toggle(val);
      }
    }
  },
  methods: {
    ...mapMutations(["toggle"])
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