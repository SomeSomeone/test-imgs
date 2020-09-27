<template>
  <div>
    <div class="imgs">
      <router-link
        class="img-block"
        v-for="img in list"
        v-bind:key="img.id"
        :to="{ name: 'image', params: { id: img.id } }"
      >
        <img :src="img.cropped_picture" alt="" />
      </router-link>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :disabled="loading"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Images",
  components: {},
  data: () => ({
    page: 0,
    loading: false
  }),
  computed: {
    list() {
      return this.$store.getters["ImageStore/getList"];
    },
    pageCount() {
      return this.$store.getters["ImageStore/getPageCount"];
    }
  },
  methods: {
    getList() {
      this.loading = true;
      this.page !== 1 && this.$router.push({ query: { page: this.page } });
      this.$store
        .dispatch("ImageStore/getList", { page: this.page })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    page() {
      this.getList();
    }
  },
  mounted() {
    this.page = 1 || this.$route.params.page;
  }
};
</script>
<style lang="scss">
.imgs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  .img-block {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
    }
  }
}
</style>
