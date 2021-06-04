<template>
  <v-card>
    <v-fab-transition>
      <AddWord />
    </v-fab-transition>
    <v-tabs
      v-model="tab"
      active-class="tabs-active"
      fixed-tabs
      background-color="purple"
      dark
    >
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab v-for="(item, i) in list" :key="i" :href="`#${i}`">
        <v-badge
          color="deep-purple"
          :content="listLength[i]"
          left
          offset-y="0"
          offset-x="-5"
        >
        </v-badge>
        {{ i }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in list" :key="i" :value="`${i}`">
        <list-words :words="list[i]" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
const AddWord = () => import('@/components/Word/AddWord.vue')
const ListWords = () => import('@/components/Word/ListWords.vue')
export default {
  components: {
    ListWords,
    AddWord,
  },
  data: () => ({
    tab: null,
  }),
  watch: {
    tab: {
      immediate: true,
      handler(newValue) {
        this.setTabActive(newValue)
      },
    },
  },
  methods: {
    ...mapMutations(['setTabActive']),
    // tabActiveSwitcher() {}
  },
  computed: {
    ...mapState(['tabActive']),
    ...mapGetters({ list: 'getSectionsList', listLength: 'getWordListLength' }),
  },
}
</script>

<style lang="scss">
.tabs-active {
}
</style>
