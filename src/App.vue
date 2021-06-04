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
      <SnackBar />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
const SnackBar = () => import('@/components/Global/SnackBar.vue')
import Header from '@/components/Main/Header.vue'
const DrawerNav = () => import('@/components/Main/DrawerNav.vue')
import Footer from '@/components/Main/Footer.vue'

export default {
  components: {
    SnackBar,
    Header,
    DrawerNav,
    Footer,
  },
  data() {
    return {
      refreshing: false,
    }
  },
  beforeCreate() {
    localStorage.getItem('darkMode') == 'true'
      ? (this.$vuetify.theme.dark = true)
      : (this.$vuetify.theme.dark = false)
  },
  created() {
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
}
</script>

<style lang="scss"></style>
