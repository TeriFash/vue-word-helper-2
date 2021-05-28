<template>
  <v-app id="app">
    <Header />
    <DrawerNav />
    <v-main id="main">
      <v-container fluid>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
  data() {
    return {
      refreshing: false
    };
  },
  beforeCreate() {
    localStorage.getItem("darkMode") == "true" ? (this.$vuetify.theme.dark = true) : (this.$vuetify.theme.dark = false);
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  components: {
    SnackBar,
    Header,
    DrawerNav,
    Footer
  }
};
</script>

<style lang="scss"></style>
