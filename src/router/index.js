import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "images",
    component: () => import("../views/Images.vue"),
    props: true
  },
  {
    path: "/images/:id",
    name: "image",
    component: () => import("../views/Images.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
