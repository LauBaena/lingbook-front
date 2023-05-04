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
                <div class="languageTitle">
                    <!-- <h2>{{ languagesStore.language.name }}</h2> -->
                    <!-- <img class="languagePic" :src="getImage()" :alt="`${languagesStore.language.name} flag`"> -->
                </div>
            </template>
            <template v-slot:secondContent>
                <h4>Llistat de professors</h4>
                <div class="teachersContainer">
                  <TeacherCard class="teacher" v-for="teacher in teachers" :key="teacher.id_user" :teacher="teacher" @click="goToTeacherView(teacher.id_user)"/>
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
import { useUsersStore } from "@/store/users";
import { computed } from "vue";
import { onBeforeMount } from "@vue/runtime-core";
import StudentMenu from "@/components/StudentMenu.vue";
import TeacherMenu from "@/components/TeacherMenu.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import TeacherCard from '../components/TeacherCard.vue';
import {useRouter} from "vue-router";

export default {
  name: "LanguageView",
  components: {
    StudentMenu,
    TeacherMenu,
    AdminMenu,
    TeacherCard,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const languagesStore = useLanguagesStore();
    const authStore = useAuthStore();
    const usersStore = useUsersStore();
    const authUser = computed(() => {
        return authStore.authUser;
    });

    // onBeforeMount(async () => await languagesStore.fetchLanguage(props.id));
    onBeforeMount(async () => await usersStore.fetchTeachersByLanguage(props.id));

    const teachers = computed(() => {
            return usersStore.teachersByLanguage;
    });

    const goToTeacherView = (id) => {
            router.push({path: `/teacher/${id}`});
    };

    // const getImage = computed(() => {
    //     console.log(`../assets/${languagesStore.language.image}`)
    //     return require(`../assets/${languagesStore.language.image}`)
    // });

    // function getImage(){
    //   console.log(`../assets/${languagesStore.language.image}`)
    //   return require(`../assets/${languagesStore.language.image}`)
    // }

    return {
      languagesStore,
      authStore,
      authUser,
      teachers,
      goToTeacherView,
    //   getImage,
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
  .languageTitle{
    display:flex;
    flex-direction: row;
    align-items: center;
  }

  .languagePic{
    margin-left: 20px;
    width: 5%;
    border-radius: 50%;
    border: #f4eeee 2px solid;
  }
  .teachersContainer{
    display:flex;
    flex-flow: row wrap;
  }

  .teacher{
    width: 30%;
  }
</style>