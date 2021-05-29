<template>
  <div class="text-center">
    <v-snackbar :timeout="timeout" v-model="show" :multi-line="multiLine">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="typeColor" text v-bind="attrs" @click="close">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    timeout: 4000,
    multiLine: true,
    show: false
    // text: `I'm a multi-line snackbar.`
  }),
  props: {
    type: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    snackbar: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("snackbar:close", this.show);
    }
  },

  watch: {
    snackbar: {
      handler(val) {
        this.show = val;
      }
    }
  },
  computed: {
    typeColor() {
      let color = "";

      switch (this.type) {
        case "error":
          color = "red";
          break;
        case "success":
          color = "success";
          break;

        default:
          color = "primary";
          break;
      }

      return color;
    }
  }
};
</script>