<template>
  <div>
    <div class="header">
      <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
      <h1>Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
    </div>
    <TeacherMenu v-if="authStore.authUser.type === 'Professor/a'" />
    <StudentMenu v-else-if="authStore.authUser.type === 'Alumne'" />
    <AdminMenu v-else />
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";

export default {
  name: "ProfileView",
  components: {
    StudentMenu,
    TeacherMenu,
    AdminMenu,
  },
  setup() {
    const authStore = useAuthStore();
    const authUser = computed(() => {
        return authStore.authUser;
    });

    return {
      authStore,
      authUser,
    };
  },
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
</style>
