<template>
  <div class="words px-4">
    <field-add-word />
    <!-- <v-breadcrumbs divider="/"></v-breadcrumbs> -->
    <tabs-word v-if="!$store.state.words.sections.length" />
    <no-words v-else class="no-task" />
  </div>
</template>

<script>
const FieldAddWord = () => import("@/components/Word/FieldAddWord.vue");
const TabsWord = () => import("@/components/Word/TabsWord.vue");
const NoWords = () => import("@/components/Word/NoWords.vue");
export default {
  name: "Words",
  components: {
    FieldAddWord,
    TabsWord,
    NoWords
  },
  mounted() {
    // console.log(" ---➜ l ", this.$router.options.routes);
  }
};
</script>
