<template>
  <div class="words px-4">
    <field-add-word />
    <!-- <v-breadcrumbs divider="/"></v-breadcrumbs> -->
    <tabs-word v-if="!$store.state.words.sections.length" />
    <DataEmpty v-else text="No words this" class="no-words" />
  </div>
</template>

<script>
const FieldAddWord = () => import('@/components/Word/FieldAddWord.vue')
const TabsWord = () => import('@/components/Word/TabsWord.vue')
const DataEmpty = () => import('@/components/Global/DataEmpty')
export default {
  name: 'Words',
  components: {
    FieldAddWord,
    TabsWord,
    DataEmpty,
  },
}
</script>

<style scoped>
.no-words {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
