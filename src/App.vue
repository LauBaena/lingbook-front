<template>
  <router-view />
  <div>
    <NavbarPublic v-if="!userStore.isAuth" />
    <NavbarPrivate v-else />
  </div>
</template>

<script>
import NavbarPublic from "@/components/NavbarPublic.vue";
import NavbarPrivate from "@/components/NavbarPrivate.vue";
import { useUsersStore } from "@/store/user";
import { onBeforeMount } from "@vue/runtime-core";

export default {
  name: "App",
  components: {
    NavbarPublic,
    NavbarPrivate,
  },
  setup() {
    const userStore = useUsersStore();
    onBeforeMount(async () => await userStore.fetchAuthUser());
    return {
      userStore,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
