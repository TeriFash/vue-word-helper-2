<template>
  <v-footer color="primary" class="text-center pb-0">
    <v-container class="pb-0">
      <v-row justify="center" no-gutters class="mb-4">
        <TermsOfUse />
        <PrivacyPolicy />
      </v-row>

      <v-divider />

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>TERI FASH</strong> LAB.
      </v-card-text>
    </v-container>
  </v-footer>
</template>

<script>
import TermsOfUse from './TermsOfUse.vue'
import PrivacyPolicy from './PrivacyPolicy.vue'
export default {
  name: 'Footer',
  components: {
    TermsOfUse,
    PrivacyPolicy,
  },
}
</script>
