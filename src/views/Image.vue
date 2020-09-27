<template>
  <div class="img" v-on:click.stop="">
    <v-card class="mx-auto pb-8" max-width="650px" max-height="90vh">
      <v-zoomer
        ref="zoom"
        style="width: 650px; height: 500px; position: relative"
        :max-scale="10"
        :zoomed.sync="zoomed"
      >
        <img
          :src="item.full_picture"
          style="object-fit: contain; width: 100%; height: 100%;"
        />
      </v-zoomer>
      <div class="text-center">
        <v-btn fab dark v-on:click.stop="() => $refs.zoom.zoomIn(2)" small
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn fab dark v-on:click.stop="() => $refs.zoom.zoomOut(0.5)" small
          ><v-icon>mdi-minus</v-icon></v-btn
        >
      </div>
      <v-card-subtitle class="" v-if="tags">
        <v-chip class="mt-2 mr-2" v-for="tag in tags" v-bind:key="tag">{{
          tag
        }}</v-chip>
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
    dialShare: false,
    zoomed: false
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
  watch: {
    id() {
      this.getItem();
    }
  },
  mounted() {
    this.getItem();
  }
};
</script>
<style lang="scss">
.img::v-deep .v-ripple__container {
  display: none !important;
}
</style>
