<template>
  <v-card>
    <v-tabs fixed-tabs v-model="tab" background-color="accent" dark>
      <v-tab v-for="(item, i) in list" :key="i" :href="`#tab-${i}`">{{i}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in list" :key="i" :value="`tab-${i}`">
        <list-words :words="list[i]" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
const ListWords = () => import("@/components/Word/ListWords.vue");
export default {
  data: () => ({
    tab: null,
  }),
  components: {
    ListWords,
  },
  computed: {
    list() {
      return this.$store.state.words.sections;
    },
  },
};
</script>