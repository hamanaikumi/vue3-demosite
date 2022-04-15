import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import Menu from "../views/Menu.vue";
import Shop from "../views/Shop.vue";
import Recruit from "../views/Recruit.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/News",
    name: "News",
    component: News,
  },
  {
    path: "/Menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/Shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/Recruit",
    name: "Recruit",
    component: Recruit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
