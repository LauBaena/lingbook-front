<template>
  <div>
    <NavbarPublic v-if="!authStore.isAuth" />
    <NavbarPrivate v-else />
    <router-view/>
    <FooterPublic class="footer"/>
  </div>
</template>

<script>
import NavbarPublic from "@/components/NavbarPublic.vue";
import NavbarPrivate from "@/components/NavbarPrivate.vue";
import FooterPublic from "./components/FooterPublic.vue";
import { useAuthStore } from "@/store/auth";
import { onBeforeMount } from "@vue/runtime-core";

export default {
  name: "App",
  components: {
    NavbarPublic,
    NavbarPrivate,
    FooterPublic,
  },
  setup() {
    const authStore = useAuthStore();
    onBeforeMount(async () => await authStore.thereIsToken());
    
    return {
      authStore,
    };
  },
};
</script>

<style>
  html, body {
    font-family: "HelveticaNeue", sans-serif;
  }
</style>
