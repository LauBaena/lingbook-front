<template>
  <div>
    <div class="header">
      <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
      <h1>Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
    </div>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'">
      <template v-slot:firstContent>
        <h2>No pots accedir a aquesta vista</h2>
      </template>
    </TeacherMenu>
    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'" >
      <template v-slot:firstContent>
        <h2>No pots accedir a aquesta vista</h2>
      </template>
    </StudentMenu>
    <AdminMenu v-else >
      <template v-slot:firstContent>
        <h2>Tots els perfils</h2>
        <div class="usersContainer">
          <UserCard class="user" v-for="user in usersStore.users" :key="user.id_user" :user="user"/>
        </div>
      </template>
    </AdminMenu>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useUsersStore } from "@/store/users";
import { onBeforeMount } from "@vue/runtime-core";
import { computed } from "vue";
import UserCard from '../components/UserCard.vue';
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";

export default {
  name: "AllProfilesView",
  components: {
    UserCard,
    StudentMenu,
    TeacherMenu,
    AdminMenu,
  },
  setup() {
    const usersStore = useUsersStore();
    const authStore = useAuthStore();
    onBeforeMount(async () => await usersStore.fetchAllUsers());

    const authUser = computed(() => {
        return authStore.authUser;
    });

    return {
      usersStore,
      authStore,
      authUser,
    };
  }
};
</script>

<style scoped>
  .studentPic {
    width: 10%;
    margin: 40px;
    border-radius: 50%;
    border: #d9d9d9 6px solid;
  }
  .header{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .usersContainer{
    display:flex;
    flex-flow: row wrap;
  }

  .user{
    width: 500px;
  }

</style>