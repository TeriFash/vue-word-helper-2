<template>
  <div class="home">
    <FieldAddTask />
    <ListTasks v-if="$store.state.todos.tasks.length" />
    <DataEmpty v-else text="No todos this" class="no-todo" />
  </div>
</template>

<script>
const FieldAddTask = () => import('@/components/Todo/FieldAddTask')
const ListTasks = () => import('@/components/Todo/ListTasks')
const DataEmpty = () => import('@/components/Global/DataEmpty')

export default {
  name: 'Home',
  components: {
    DataEmpty,
    ListTasks,
    FieldAddTask,
  },
}
</script>

<style scoped>
.no-todo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
