import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
    props: (route) => {
      const id = route.params.id;
      return id ? { id } : { id: "" };
    },
  },
  {
    path: "/allProfiles",
    name: "allProfiles",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/AllProfilesView.vue"),
  },
  {
    path: "/termsofuse",
    name: "termsOfUse",
    component: () =>
      import(/* webpackChunkName: "termsOfUse" */ "../views/TermsOfUseView.vue"),
  },
  {
    path: "/privacypolicy",
    name: "privacyPolicy",
    component: () =>
      import(/* webpackChunkName: "privacyPolicy" */ "../views/PrivacyPolicyView.vue"),
  },
  {
    path: "/cookiespolicy",
    name: "cookiesPolicy",
    component: () =>
      import(/* webpackChunkName: "cookiesPolicy" */ "../views/CookiesPolicyView.vue"),
  },
  {
    path: "/legalwarning",
    name: "legalWarning",
    component: () =>
      import(/* webpackChunkName: "legalWarning" */ "../views/LegalWarningView.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFoundView.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
