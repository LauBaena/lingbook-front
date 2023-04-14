<template>
  <UserCard v-for="user in usersStore.users" :key="user.id_user" :user="user"/>

</template>

<script>
import { useUsersStore } from "@/store/users";
import { onBeforeMount } from "@vue/runtime-core";
import UserCard from '../components/UserCard.vue';

export default {
  name: "AllProfilesView",
  components: {
    UserCard
  },
  setup() {
    const usersStore = useUsersStore();
    onBeforeMount(async () => await usersStore.fetchAllUsers());

    return {
      usersStore,
    };
  },
};
</script>

<style scoped>

</style>