  
<template>
  <v-dialog v-model="dialog" max-width="1000">
    <template #activator="{ on, attrs }">
      <v-btn color="white" text rounded v-bind="attrs" v-on="on">Terms Of Use</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline" role="heading" aria-level="1">Lorem</v-card-title>
      <v-card-text>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quidem doloremque illo cumque explicabo ut officia velit ad ratione quo nam ducimus iure reprehenderit dolor dolorum esse placeat incidunt atque perspiciatis, voluptate quos provident enim quibusdam nulla! Dignissimos illo, quo quis repellendus magnam laborum minima inventore ut perspiciatis facilis, voluptatem nobis nesciunt assumenda. Aspernatur quaerat quod maxime, labore quis voluptas?</p>
        <h2 class="heading--min">Lorem ipsum dolor sit amet.</h2>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="dialog = false">Use</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TermsOfUse",
  data() {
    return {
      dialog: false
    };
  }
};
</script>