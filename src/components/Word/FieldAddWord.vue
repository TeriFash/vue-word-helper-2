<template>
  <v-text-field
    v-model="title"
    class="pa-6 px-0"
    outlined
    @click:clear="clearWord"
    @change="addWord"
    @keydown="addWord"
    @keyup="addWord"
    label="Add Word"
    hide-details
    clearable
  ></v-text-field>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapMutations(["setTextInputName", "setTextInClipboard"]),
    addWord() {
      this.setTextInputName(this.title);
    },
    clearWord() {
      this.title = "";
      this.setTextInputName(this.title);
      this.setTextInClipboard(this.title);
    }
  }
};
</script>