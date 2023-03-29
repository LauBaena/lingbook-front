<template>
  <div>
    <NavbarPublic/>
    <router-view/>
    <FooterPublic class="footer"/>
  </div>
</template>

<script>
import NavbarPublic from "@/components/NavbarPublic.vue";
import FooterPublic from "./components/FooterPublic.vue";

export default {
  name: "App",
  components: {
    NavbarPublic,
    FooterPublic,
  },
  setup() {
  },
};
</script>

<style>
  html, body {
    font-family: "HelveticaNeue", sans-serif;
  }
</style>
