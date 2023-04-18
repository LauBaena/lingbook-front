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
          <h2>Selecciona una llengua disponible</h2>
          <div class="languagesContainer">
            <div class="language" v-for="language in languagesStore.languages" :key="language.id_language" :language="language">
              <img class="languagePic" :src="getImage(language.image)" :alt="`${language.name} flag`" @click="goToLanguage(language.id_language)">
              <p>{{ language.name }}</p>
            </div>
          </div>
        </template>
      </StudentMenu>
      <AdminMenu v-else >
        <template v-slot:firstContent>
          <h2>No pots accedir a aquesta vista</h2>
        </template>
      </AdminMenu>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/store/auth";
  import { useLanguagesStore } from "@/store/languages";
  import { onBeforeMount } from "@vue/runtime-core";
  import { computed } from "vue";
  import StudentMenu from "@/components/StudentMenu.vue";
  import TeacherMenu from "@/components/TeacherMenu.vue";
  import AdminMenu from "@/components/AdminMenu.vue";
  import {useRouter} from "vue-router";

  export default {
    name: "SelectLanguageView",
    components: {
      StudentMenu,
      TeacherMenu,
      AdminMenu,
    },
    setup() {
      const languagesStore = useLanguagesStore();
      const authStore = useAuthStore();
      const router = useRouter();

      onBeforeMount(async () => await languagesStore.fetchAllLanguages());
  
      const authUser = computed(() => {
          return authStore.authUser;
      });

      function getImage(path){
        console.log(`../assets/${path}`)
        return require(`../assets/${path}`)
      }

      const goToLanguage = (id) => {
        router.push({path: `/language/${id}`});
      };
  
      return {
        languagesStore,
        authStore,
        authUser,
        getImage,
        goToLanguage,
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
    .languagesContainer{
      display:flex;
      flex-flow: row wrap;
    }
    .language{
      width: 500px;
      display:flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
    .languagePic{
      width: 30%;
      margin-top: 30px;
      border-radius: 50%;
      border: #f4eeee 2px solid;
    }
  
  </style>