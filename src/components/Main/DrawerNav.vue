<template>
  <v-navigation-drawer mobile-breakpoint="600" v-model="$store.state.menu.drawer" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{ info.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ info.desc }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link v-for="item in list" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DrawerNav",
  data: () => ({}),
  computed: {
    ...mapGetters({ list: "getMenuList", info: "getMenuInfo" })
  }
};
</script>
