<template>
  <v-card>
    <v-fab-transition>
      <AddWord />
    </v-fab-transition>
    <v-tabs active-class="tabs-active" fixed-tabs v-model="tab" background-color="purple" dark>
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab v-for="(item, i) in list" :key="i" :href="`#tab-${i}`">
        <v-badge color="deep-purple" :content="list[i].length" left offset-y="0" offset-x="-5"> </v-badge>
        {{ i }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in list" :key="i" :value="`tab-${i}`">
        <list-words :words="list[i]" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
const AddWord = () => import("@/components/Word/AddWord.vue");
const ListWords = () => import("@/components/Word/ListWords.vue");
export default {
  data: () => ({
    tab: null
  }),
  components: {
    ListWords,
    AddWord
  },
  watch: {
    tab: {
      immediate: true,
      handler(newValue) {
        this.setTabActive(newValue);
      }
    }
  },
  methods: {
    ...mapMutations(["setTabActive"])
    // tabActiveSwitcher() {}
  },
  computed: {
    ...mapState(["tabActive"]),
    ...mapGetters({ list: "getSectionsList" })
    // list() {
    //   return this.$store.state.words.sections;
    // }
  }
};
</script>

<style lang="scss">
.tabs-active {
}
</style>
