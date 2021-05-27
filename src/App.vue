<template>
  <v-app id="app">
    <Header />
    <DrawerNav />

    <v-main id="main">
      <v-container fluid>
        <router-view></router-view>
      </v-container>

      <snack-bar />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
const SnackBar = () => import("@/components/Shared/SnackBar.vue");
import Header from "@/components/Main/Header.vue";
const DrawerNav = () => import("@/components/Main/DrawerNav.vue");
import Footer from "@/components/Main/Footer.vue";

export default {
  components: {
    SnackBar,
    Header,
    DrawerNav,
    Footer
  },
  created() {
    this.$store.dispatch("FETCH_SECTIONS");
    this.$store.dispatch("SET_CLIPBOARD_DATA");
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

#app {
  width: 100%;
  font-family: "Noto Sans JP", "Roboto", sans-serif;
  background-color: #fafafa;
}
</style>