<template>
  <div>
    <v-list-item
      :class="{ 'blue lighten-5': task.done }"
      @click="$store.commit('doneTask', task.id)"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
            >{{ task.title }}</v-list-item-title
          >
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1" @click.stop="dialogs.delete = true"
              >mdi-delete</v-icon
            >
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>

    <DialogDelete v-if="dialogs.delete" />
  </div>
</template>

<script>
import DialogDelete from '@/components/Global/DialogDelete.vue'
export default {
  components: {
    DialogDelete,
  },
  props: ['task'],
  data() {
    return {
      dialogs: {
        delete: false,
      },
    }
  },
}
</script>
