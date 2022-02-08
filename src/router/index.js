import { createWebHistory, createRouter } from "vue-router";
import Index from "../components/Index.vue";
import Searches from "../components/Searches.vue";
// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
  },
  {
    path: "/searches",
    name: "Searches",
    component: Searches,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;