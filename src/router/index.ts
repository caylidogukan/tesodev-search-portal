import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue";
import AddRecord from "../views/AddRecord.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/search-results",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/add-record",
    name: "AddRecord",
    component: AddRecord,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
