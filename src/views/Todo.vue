<template>
  <div class="home">
    <field-add-task />
    <list-tasks v-if="$store.state.todos.tasks.length" />
    <no-task v-else class="no-task" />
  </div>
</template>

<script>
const FieldAddTask = () => import('@/components/Todo/FieldAddTask.vue');
const ListTasks = () => import('@/components/Todo/ListTasks.vue');
const NoTask = () => import('@/components/Todo/NoTask.vue');

export default {
  name: 'Home',
  components: {
    NoTask,
    ListTasks,
    FieldAddTask,
  },
};
</script>
