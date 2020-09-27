<template>
  <div>
    <v-btn to="/"></v-btn>
    {{ item }}
    <!--    author: "Broken Match"-->
    <!--    camera: "Polaroid OneStep 2"-->
    <!--    cropped_picture: "http://interview.agileengine.com/pictures/cropped/0019.jpg"-->
    <!--    full_picture: "http://interview.agileengine.com/pictures/full_size/0019.jpg"-->
    <!--    id: "d0d3fb4d11aaee9accce"-->
    <!--    tags:-->
  </div>
</template>

<script>
export default {
  name: "Images",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data: () => ({}),
  computed: {
    item() {
      return this.$store.getters["ImageStore/getItem"];
    }
  },
  methods: {
    getItem() {
      this.loading = true;
      this.$store
        .dispatch("ImageStore/getItem", { id: this.id })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {},
  mounted() {
    this.getItem();
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
