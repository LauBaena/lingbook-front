import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "@/store/auth";

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
    meta: {requiresAuth: true}
  },
  {
    path: "/allProfiles",
    name: "allProfiles",
    component: () =>
      import(/* webpackChunkName: "allProfiles" */ "../views/AllProfilesView.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/allLanguages",
    name: "allLanguages",
    component: () =>
      import(/* webpackChunkName: "allLanguages" */ "../views/SelectLanguageView.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/language/:id",
    name: "language",
    component: () =>
      import(/* webpackChunkName: "language" */ "../views/LanguageView.vue"),
    props: (route) => {
      const id = route.params.id;
      return id ? { id } : { id: "" };
    },
    meta: {requiresAuth: true}
  },
  {
    path: "/allVideos",
    name: "allVideos",
    component: () =>
      import(/* webpackChunkName: "allVideos" */ "../views/AllVideosView.vue"),
    meta: {requiresAuth: true}
  },
  // {
  //   path: "/teacher/:id/userVideos",
  //   name: "userVideos",
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ "../views/UserVideosView.vue"),
  //     props: (route) => {
  //       const id = route.params.id;
  //       return id ? { id } : { id: "" };
  //     },
  //     meta: {requiresAuth: true}
  // },

  {
    path: "/userClasses",
    name: "userClasses",
    component: () =>
        import(/* webpackChunkName: "userClasses" */ "../views/UserClassView.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/userMessages",
    name: "userMessages",
    component: () =>
      import(/* webpackChunkName: "userMessages" */ "../views/MessagesView.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/teacher/:id",
    name: "teacherView",
    component: () =>
      import(/* webpackChunkName: "teacherView" */ "../views/TeacherView.vue"),
    props: (route) => {
      const id = route.params.id;
      return id ? { id } : { id: "" };
    },
    meta: {requiresAuth: true}
  },
  // {
  //   path: "/video/:id_video",
  //   name: "videoView",
  //   component: () =>
  //     import(/* webpackChunkName: "teacherView" */ "../views/VideoView.vue"),
  //   props: (route) => {
  //     const id_video = route.params.id_video;
  //     return id_video ? { id_video } : { id_video: "" };
  //     /* const id = route.params.id;
  //     const id_video = route.params.id_video;
  //     return id && id_video ? { id, id_video } : { id: "", id_video: "" };*/
  //   },
  //   meta: {requiresAuth: true}
  // },

  {
    path: "/teacher/:id/video/:id_video",
    name: "videoView",
    component: () =>
      import(/* webpackChunkName: "teacherView" */ "../views/VideoView.vue"),
    props: (route) => {
      const id_video = route.params.id_video;
      const id = route.params.id;
      return id && id_video ? { id, id_video } : { id: "", id_video: "" };
    },
    meta: {requiresAuth: true}
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

router.beforeEach((to, from, next) =>{
  if(to.matched.some(route => route.meta.requiresAuth)){
    //Si l'usuari ja està autenticat, podrem accedir a la vista. Si no, mostrem alerta i tornem al login
    const authStore = useAuthStore();
    if(authStore.isAuth){
      next();
    }else{
      alert('Necessites logejarte per accedir');
      next({name: 'login'});
    }
  }else{
    next();
  }
})

export default router
