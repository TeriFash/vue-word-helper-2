<template>
  <v-list class="pt-0" flat>
    <Task v-for="task in $store.state.todos.tasks" :key="task.id" :task="task" />
  </v-list>
</template>

<script>
import Task from "./Task.vue";
export default {
  components: {
    Task
  }
};
</script>