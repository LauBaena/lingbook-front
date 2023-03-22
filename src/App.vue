<template>
  <div>
    <NavbarPublic/>
    <!-- <NavbarPublic v-if="!userStore.isAuth" />
    <NavbarPrivate v-else /> -->
    <router-view/>
    <FooterPublic class="footer"/>
  </div>
</template>

<script>
import NavbarPublic from "@/components/NavbarPublic.vue";
import FooterPublic from "./components/FooterPublic.vue";
// import NavbarPrivate from "@/components/NavbarPrivate.vue";
// import { useUsersStore } from "@/store/user";
// import { onBeforeMount } from "@vue/runtime-core";

export default {
  name: "App",
  components: {
    NavbarPublic,
    // NavbarPrivate,
    FooterPublic,
  },
  setup() {
    // const userStore = useUsersStore();
    // onBeforeMount(async () => await userStore.fetchAuthUser());
    // return {
    //   userStore,
    // };
  },
};
</script>

<style>
  html, body {
    font-family: "HelveticaNeue", sans-serif;
  }

  /* html{
    height: 100%;
  }
  body{
    display:flex;
    min-height: 100%;
    flex-direction: column;
  }
  .footer{
    margin-top: auto;
  } */

</style>
