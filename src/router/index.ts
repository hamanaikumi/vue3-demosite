import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Shop from "../views/Shop.vue";
import Recruit from "../views/Recruit.vue";
import Edit from "../views/Edit.vue";
import News from "../views/News.vue";

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
  {
    path: "/Edit",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/News/:id",
    name: "News",
    component: News,
  },
];

const scrollBehavior = () => {
  return { el: "#app" };
};
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior, //追加
});

export default router;
