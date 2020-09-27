<template>
  <v-app>
    <v-app-bar app color="primary"> </v-app-bar>

    <v-main>
      <v-overlay v-if="this.loader">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <router-view v-else></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    loader: true
  }),
  methods: {
    authorize() {
      this.loader = true;
      this.$store
        .dispatch("AuthStore/authorize")
        .finally(() => (this.loader = false));
    }
  },
  mounted() {
    this.authorize();
  }
};
</script>
