<template>
  <div>
    <div class="header">
      <img class="studentPic" src="../assets/student3.jpg" alt="Student's photography">
      <h1 class="profilePrivate">Espai personal de {{ authStore.authUserCompleteName }} ({{ authStore.authUser.type }})</h1>
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
        <h2>Usuaris eliminats</h2>
        <div class="usersContainer">
          <div class="user"> 
          <div v-for="user in computedUsers" :key="user.id_user" :user="user" class="userCard">
            <img src="../assets/student1.jpg" class="cardImage" :alt="user.name">
            <div class="userInfo">
                <h3>{{ user.name }} {{ user.surname }}</h3>
                <p>Data creació: {{ user.created_at }}</p>
                <p>Rol: {{ user.type }}</p>
                <div v-if=" user.status === '1'" class="button-delete" @click="modificaStatus(user.id_user)">Elimina perfil</div>
                <div v-if=" user.status === '0'" class="button-delete" @click="modificaStatus(user.id_user)">Restitueix perfil</div>
            </div>
          </div>
        </div>
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
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";

export default {
  name: "AllProfilesView",
  components: {
    StudentMenu,
    TeacherMenu,
    AdminMenu,
  },
  setup() {
    const usersStore = useUsersStore();
    const authStore = useAuthStore();
    onBeforeMount(async () => await usersStore.fetchAllUsers("1"));

    const authUser = computed(() => {
        return authStore.authUser;
    });
    const computedUsers = computed(() => {
      // Filtrem els users
        return usersStore.users.filter(user => user.status === '0');
    });

    async function modificaStatus(id_user) {
      await usersStore.flipStatus(id_user);
      await usersStore.fetchAllUsers("1");
    }

    return {
      computedUsers,
      usersStore,
      authStore,
      authUser,
      modificaStatus,
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
    margin: 10px;
    min-width: 100%;
  }
  .user{
    display:flex;
    flex-flow: row wrap;
  } 

  .userCard{
        min-width: 29%; 
        max-width: 29%; 
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
        background-color: #d9d9d9;
        border-radius: 10px;
    }

    .cardImage{
        width: 100px;
        margin: 40px;
        border-radius: 50%;
        border: #d9d9d9 6px solid;
    }

    
    h3{
        text-decoration: inherit;
        color: #05a5d4;
        margin-bottom: 10px;
    }
    .button-delete {
        width: min-content;
        min-width: 60%;
        font-weight: bold;
        margin-bottom: 10px;
        cursor: default;
        background-color: #55b1df;
        max-width: 20%; 
        color: white;
        padding: 13px 1%;
        border: 1px solid #ccc;
        border-radius: 15px;
        text-align: center;
        letter-spacing: .8px;
    }
    .button-delete:hover {
        cursor: pointer  !important;;
        background-color: #fff;
        border: 1px solid #55b1df;
        color: #55b1df;
        cursor: pointer;
    }

  @media screen and (max-width: 1369px) {
      .usersContainer{
        display:flex;
        flex-flow: row wrap;
      } 
      .header{
          width: 70%;
      }

      .studentPic {
          width: 30%;
          margin: 10px;
          border-radius: 50%;
          border: #d9d9d9 6px solid;
      }

      .profilePrivate {
          width: 20%;
          margin-right: 80px;
      }

      .user{
        display:flex;
        flex-flow: row wrap;
      } 
      .userCard{
        min-width: 50%; 
        max-width: 100%; 
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cardImage{
        width: 100px;
        border-radius: 50%;
        border: #d9d9d9 6px solid;
    }
  }

</style>