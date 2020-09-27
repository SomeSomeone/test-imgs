<template>
  <div>
    <v-overlay
      v-if="id"
      :dark="false"
      hidden
      v-on:click.native="
        $router.push({ name: 'images', query: { page: page } })
      "
    >
      <v-btn fab class="arrow arrow-left" v-on:click.stop="prevImage">
        <v-icon x-large>mdi-arrow-left</v-icon></v-btn
      >
      <image-item :id="id"></image-item>
      <v-btn fab class="arrow arrow-right" v-on:click.stop="nextImage">
        <v-icon x-large>mdi-arrow-right</v-icon></v-btn
      >
    </v-overlay>
    <div class="imgs">
      <div
        class="img-block"
        v-for="img in list"
        v-bind:key="img.id"
        v-on:click="() => setActiveItem(img.id)"
      >
        <img :src="img.cropped_picture" alt="" />
      </div>
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
import Image from "@/views/Image";
export default {
  name: "Images",
  components: {
    "image-item": Image
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
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
      return this.$store
        .dispatch("ImageStore/getList", { page: this.page })
        .finally(() => {
          this.loading = false;
        });
    },
    nextImage() {
      let index = this.list.findIndex(i => i.id === this.id);
      if (index < this.list.length - 1) {
        this.setActiveItem(this.list[index + 1].id);
      }
    },
    prevImage() {
      let index = this.list.findIndex(i => i.id === this.id);
      if (index > 0) {
        this.setActiveItem(this.list[index - 1].id);
      }
    },
    setActiveItem(id) {
      this.$router.push({
        name: "image",
        params: { id },
        query: { page: this.page }
      });
    }
  },
  watch: {
    page() {
      this.getList();
    }
  },
  mounted() {
    this.page = +(this.$route.query.page || 1);
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
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &-left {
    left: -100px;
  }
  &-right {
    right: -100px;
  }
}
</style>
