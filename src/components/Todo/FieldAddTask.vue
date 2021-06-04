<template>
  <v-text-field
    v-model="newTaskTitle"
    class="pa-4"
    outlined
    label="Add Task"
    append-icon="mdi-plus"
    hide-details
    clearable
    @click:append="addTask"
    @keyup.enter="addTask"
  >
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: '',
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask', this.newTaskTitle)
      this.newTaskTitle = ''
    },
  },
}
</script>
