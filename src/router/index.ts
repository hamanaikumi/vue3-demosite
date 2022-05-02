import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Shop from "../views/Shop.vue";
import Recruit from "../views/Recruit.vue";
import Edit from "../views/Edit.vue";
import News from "../views/News.vue";
import Complete from "../views/Complete.vue";
import DeleteComplete from "../views/DeleteComplete.vue";

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
  {
    path: "/Complete",
    name: "Complete",
    component: Complete,
  },
  {
    path: "/DeleteComplete",
    name: "DeleteComplete",
    component: DeleteComplete,
  },
];

// ページ上部に戻る
const scrollBehavior = () => {
  return { el: "#app" };
};
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  //追加
  scrollBehavior,
});

export default router;
