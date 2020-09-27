<template>
  <div>
    <v-btn fab small to="/"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-card class="mx-auto pb-8" max-width="650px">
      <v-img class="white--text align-end" :src="item.full_picture"></v-img>
      <v-card-subtitle class="pb-0" v-if="tags">
        <v-chip-group>
          <v-chip v-for="tag in tags" v-bind:key="tag">{{ tag }}</v-chip>
        </v-chip-group>
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          <v-icon small class="mr-2">mdi-camera</v-icon>{{ item.camera }}
        </div>
        <div>
          <v-icon small class="mr-2">mdi-account</v-icon>{{ item.author }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-speed-dial
          v-model="dialShare"
          absolute
          right
          bottom
          direction="left"
          open-on-hover
        >
          <template v-slot:activator>
            <v-btn fab bottom small color="primary">
              <v-icon v-if="dialShare">mdi-close</v-icon>
              <v-icon v-else>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <v-btn
            dark
            fab
            bottom
            color="gray darken-7"
            small
            v-on:click="copy"
            target="_blank"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            dark
            fab
            bottom
            color="blue darken-7"
            small
            :href="
              `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`
            "
            target="_blank"
          >
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
          <v-btn
            dark
            fab
            bottom
            color="blue"
            small
            :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`"
            target="_blank"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            dark
            fab
            bottom
            color="green"
            small
            :href="`https://wa.me/?text=Checkout%20this%20page.%20${pageUrl}`"
            target="_blank"
          >
            <v-icon>mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn
            dark
            fab
            bottom
            color="tertiary"
            small
            :href="
              `mailto:?subject=Awesomeness!&amp;body=Checkout this page!<a href='${pageUrl}'>${pageUrl}</a>`
            "
            target="_blank"
          >
            <v-icon>mdi-email</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-card-actions>
    </v-card>

    <!--    full_picture: "http://interview.agileengine.com/pictures/full_size/0019.jpg"-->
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
  data: () => ({
    dialShare: false
  }),
  computed: {
    item() {
      return this.$store.getters["ImageStore/getItem"];
    },
    tags() {
      return ((this.item && this.item.tags) || "")
        .split(" ")
        .map(i => i.replace(/\s/g, ""))
        .filter(i => !!i);
    },
    pageUrl() {
      return this.item && this.item.full_picture;
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
    },
    copy() {
      navigator.clipboard.writeText(this.pageUrl).then(
        function() {
          alert("Async: Copying to clipboard was successful!");
        },
        function(err) {
          alert("Async: Could not copy text: ", err);
        }
      );
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
