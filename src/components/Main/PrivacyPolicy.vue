<template>
  <v-dialog v-model="dialog" max-width="1000">
    <template #activator="{ on, attrs }">
      <v-btn color="white" text rounded v-bind="attrs" v-on="on">Privacy Policy</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline" role="heading" aria-level="1">Lorem, ipsum dolor.</v-card-title>
      <v-card-text>
        <h2 class="heading--min">Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, voluptatum natus id nostrum quisquam,
          consequuntur nulla unde quidem necessitatibus eveniet quos laudantium doloribus eligendi optio ullam impedit
          consequatur est facere totam magni, laboriosam aliquid placeat ex. Quaerat repellat placeat hic.
        </p>

        <h2 class="heading--min">Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias fugit, exercitationem officiis quaerat
          unde a quis neque inventore et voluptatibus rerum aliquam quam ad ullam tempora totam magnam, ipsum minus.
          Deleniti libero pariatur dolores vel consequuntur eligendi accusamus iste labore?
        </p>

        <ul>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>

        <h2 class="heading--min">Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas voluptatibus sunt ea. Eos nam labore minus
          voluptatum doloribus qui dolor?
        </p>
        <h2 class="heading--min">Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas voluptatibus sunt ea. Eos nam labore minus
          voluptatum doloribus qui dolor?
        </p>
        <h2 class="heading--min">Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas voluptatibus sunt ea. Eos nam labore minus
          voluptatum doloribus qui dolor?
        </p>
        <h2 class="heading--min">Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas voluptatibus sunt ea. Eos nam labore minus
          voluptatum doloribus qui dolor?
        </p>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="dialog = false">Lorem</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
