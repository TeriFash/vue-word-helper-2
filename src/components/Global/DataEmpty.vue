<template>
  <div class="no-data">
    <v-icon size="100px" color="primary"> mdi-check </v-icon>
    <div class="text-h5 primary--text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataEmpty',
  props: {
    hendler: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
