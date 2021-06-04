<template>
  <div class="text-center">
    <v-snackbar v-model="show" :timeout="timeout" :multi-line="multiLine">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="typeColor" text v-bind="attrs" @click="close"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    snackbar: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    timeout: 4000,
    multiLine: true,
    show: false,
    // text: `I'm a multi-line snackbar.`
  }),
  computed: {
    typeColor() {
      let color = ''

      switch (this.type) {
        case 'error':
          color = 'red'
          break
        case 'success':
          color = 'success'
          break

        default:
          color = 'primary'
          break
      }

      return color
    },
  },

  watch: {
    snackbar: {
      handler(val) {
        this.show = val
      },
    },
  },
  methods: {
    close() {
      this.show = false
      this.$emit('snackbar:close', this.show)
    },
  },
}
</script>
