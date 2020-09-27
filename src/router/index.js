import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "images",
    component: () => import("../views/Images.vue")
  },
  {
    path: "/images/:id",
    name: "image",
    component: () => import("../views/Image.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
