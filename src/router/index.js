import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserShow from "../views/UserShow.vue";
import UserEdit from "../views/UserEdit.vue";
import GamesIndex from "../views/GamesIndex.vue";
import GamesShow from "../views/GamesShow.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/user/:id", name: "user-show", component: UserShow },
  { path: "/user/:id/edit", name: "user-edit", component: UserEdit },
  { path: "/games", name: "games-index", component: GamesIndex },
  { path: "/games/:id", name: "games-show", component: GamesShow },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
