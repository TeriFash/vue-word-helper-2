<template>
  <v-snackbar v-model="$store.state.snackbar.show" light>
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn @click="$store.commit('hideSnackbar')" color="blue" text v-bind="attrs"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {};
</script>

<style></style>
