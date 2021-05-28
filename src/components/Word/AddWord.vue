<template>
  <v-dialog v-model="dialog" max-width="500">
    <template #activator="{ on, attrs }">
      <v-btn color="secondary" v-bind="attrs" v-on="on" fab dark small absolute top right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline" role="heading" aria-level="1">Add New Word</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field v-model="text" hint="required text*" label="Word text" persistent-hint required></v-text-field>
            </v-col>
            <!-- <v-col cols="12" sm="12">
              <v-autocomplete :items="['Name']" label="Keys" multiple></v-autocomplete>
            </v-col> -->
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="addWordSubmit"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddWord",
  data() {
    return {
      dialog: false,
      text: ""
    };
  },
  methods: {
    ...mapActions({ addWord: "ADD_WORD" }),
    close() {
      this.text = "";
      this.dialog = false;
    },
    async addWordSubmit() {
      const tabActive = this.$store.state.words.tabActive;
      if (this.text && tabActive) {
        const tab = tabActive.split("-");
        await this.addWord({ text: this.text, section: tab[1] });
        this.$store.commit("showSnackbar", "Document successfully written!");
        this.close();
      } else {
        this.$store.commit("showSnackbar", "Document Error!");
      }
    }
  }
};
</script>
